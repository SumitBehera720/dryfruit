import { NextRequest, NextResponse } from 'next/server';
import { query, withTransaction } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { getCachedProduct, getCachedProducts } from '@/lib/products-store';

interface ProductRow { id: number; slug: string; name: string; price: number; salePrice: number | null; label: string | null; category: string; gender: string; active: number; description: string; createdAt: string; }
interface VariantRow { id: number; productId: number; colorName: string; hex: string; image: string; images: string; stock: number; }
interface DetailRow { id: number; productId: number; text: string; sortOrder: number; }
interface ReviewRow { id: number; productId: number; author: string; rating: number; date: string; title: string; comment: string; verified: number; approved: number; }
interface QuestionRow { id: number; productId: number; question: string; answer: string | null; date: string; }

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const slug = id;
  const numId = parseInt(id);

  try {
    let products: ProductRow[] = [];
    if (!isNaN(numId)) {
      products = await query<ProductRow>('SELECT * FROM Product WHERE id = ? OR slug = ? LIMIT 1', [numId, slug]);
    } else {
      products = await query<ProductRow>('SELECT * FROM Product WHERE slug = ? LIMIT 1', [slug]);
    }

    const product = products[0];
    if (!product) {
      const found = getCachedProduct(numId) || getCachedProducts().find(p => p.slug === slug);
      if (!found) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
      return NextResponse.json(found);
    }

    const pid = product.id;
    const [variants, details, reviews, questions] = await Promise.all([
      query<VariantRow>('SELECT * FROM ProductVariant WHERE productId = ?', [pid]),
      query<DetailRow>('SELECT * FROM ProductDetail WHERE productId = ? ORDER BY sortOrder ASC', [pid]),
      query<ReviewRow>('SELECT * FROM Review WHERE productId = ? ORDER BY date DESC', [pid]),
      query<QuestionRow>('SELECT * FROM Question WHERE productId = ? ORDER BY date DESC', [pid]),
    ]);

    return NextResponse.json({ ...product, active: Boolean(product.active), variants, details, reviews, questions });
  } catch {
    const found = getCachedProduct(numId) || getCachedProducts().find(p => p.slug === slug);
    if (!found) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    return NextResponse.json(found);
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const payload = requireAdmin(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const productId = parseInt(id);
  if (isNaN(productId)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  const data = await request.json();

  // Input validation
  if (!data.name || typeof data.name !== 'string' || data.name.trim() === '') {
    return NextResponse.json({ error: 'Product name is required' }, { status: 400 });
  }

  try {
    const result = await withTransaction(async (conn) => {
      await conn.execute(
        'UPDATE Product SET name=?, slug=?, price=?, salePrice=?, label=?, category=?, gender=?, description=?, active=?, updatedAt=NOW() WHERE id=?',
        [
          data.name.trim(),
          data.slug ? data.slug.trim() : data.name.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '-'),
          parseFloat(data.price),
          data.salePrice ? parseFloat(data.salePrice) : null,
          data.label || null,
          data.category,
          data.gender || 'unisex',
          data.description || '',
          data.active !== undefined ? (data.active ? 1 : 0) : 1,
          productId
        ]
      );

      if (data.variants && Array.isArray(data.variants)) {
        await conn.execute('DELETE FROM ProductVariant WHERE productId = ?', [productId]);
        for (const v of data.variants) {
          await conn.execute(
            'INSERT INTO ProductVariant (productId, colorName, hex, image, images, stock) VALUES (?, ?, ?, ?, ?, ?)',
            [productId, v.colorName || 'Default', v.hex || '#000000', v.image || '', v.images ? JSON.stringify(v.images) : JSON.stringify(v.image ? [v.image] : []), v.stock ?? 10]
          );
        }
      } else if (data.image) {
        const [existing] = await conn.execute('SELECT id FROM ProductVariant WHERE productId = ? ORDER BY id ASC LIMIT 1', [productId]);
        const existingRows = existing as VariantRow[];
        if (existingRows.length > 0) {
          await conn.execute('UPDATE ProductVariant SET image=?, images=? WHERE id=?', [data.image, JSON.stringify([data.image]), existingRows[0].id]);
        } else {
          await conn.execute('INSERT INTO ProductVariant (productId, colorName, hex, image, images, stock) VALUES (?, ?, ?, ?, ?, ?)',
            [productId, 'Default', '#000000', data.image, JSON.stringify([data.image]), 10]);
        }
      }

      const [updated] = await conn.execute('SELECT * FROM Product WHERE id = ? LIMIT 1', [productId]);
      const [variants] = await conn.execute('SELECT * FROM ProductVariant WHERE productId = ?', [productId]);
      const productRows = updated as ProductRow[];
      if (!productRows[0]) {
        throw new Error('Product not found after update');
      }
      return { ...productRows[0], variants: variants as VariantRow[] };
    });

    return NextResponse.json(result);
  } catch (err) {
    const error = err as Error;
    console.error(`[ERROR] Products PUT error for ID ${productId}:`, error);
    return NextResponse.json({ error: error.message || 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const payload = requireAdmin(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const productId = parseInt(id);
  if (isNaN(productId)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  try {
    await withTransaction(async (conn) => {
      await conn.execute('DELETE FROM ProductVariant WHERE productId = ?', [productId]);
      await conn.execute('DELETE FROM ProductDetail WHERE productId = ?', [productId]);
      await conn.execute('DELETE FROM Review WHERE productId = ?', [productId]);
      await conn.execute('DELETE FROM Question WHERE productId = ?', [productId]);
      await conn.execute('DELETE FROM Product WHERE id = ?', [productId]);
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    const error = err as Error;
    console.error(`[ERROR] Products DELETE error for ID ${productId}:`, error);
    return NextResponse.json({ error: error.message || 'Failed to delete product' }, { status: 500 });
  }
}
