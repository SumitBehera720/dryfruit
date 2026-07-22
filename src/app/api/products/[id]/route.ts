import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { getCachedProduct, getCachedProducts, updateCachedProduct } from '@/lib/products-store';

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

  try {
    await query(
      'UPDATE Product SET name=?, slug=?, price=?, salePrice=?, label=?, category=?, gender=?, description=?, active=? WHERE id=?',
      [data.name, data.slug, parseFloat(data.price), data.salePrice ? parseFloat(data.salePrice) : null, data.label || null, data.category, data.gender, data.description, data.active !== undefined ? (data.active ? 1 : 0) : 1, productId]
    );

    if (data.variants && Array.isArray(data.variants)) {
      await query('DELETE FROM ProductVariant WHERE productId = ?', [productId]);
      for (const v of data.variants) {
        await query(
          'INSERT INTO ProductVariant (productId, colorName, hex, image, images, stock) VALUES (?, ?, ?, ?, ?, ?)',
          [productId, v.colorName, v.hex, v.image, v.images ? JSON.stringify(v.images) : JSON.stringify(v.image ? [v.image] : []), v.stock ?? 10]
        );
      }
    } else if (data.image) {
      const existing = await query<VariantRow>('SELECT id FROM ProductVariant WHERE productId = ? ORDER BY id ASC LIMIT 1', [productId]);
      if (existing.length > 0) {
        await query('UPDATE ProductVariant SET image=?, images=? WHERE id=?', [data.image, JSON.stringify([data.image]), existing[0].id]);
      } else {
        await query('INSERT INTO ProductVariant (productId, colorName, hex, image, images, stock) VALUES (?, ?, ?, ?, ?, ?)',
          [productId, 'Default', '#000000', data.image, JSON.stringify([data.image]), 10]);
      }
    }

    const updated = await query<ProductRow>('SELECT * FROM Product WHERE id = ? LIMIT 1', [productId]);
    const variants = await query<VariantRow>('SELECT * FROM ProductVariant WHERE productId = ?', [productId]);
    if (!updated[0]) {
      updateCachedProduct(productId, data);
      return NextResponse.json(getCachedProduct(productId));
    }
    return NextResponse.json({ ...updated[0], variants });
  } catch {
    updateCachedProduct(productId, data);
    return NextResponse.json(getCachedProduct(productId));
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const payload = requireAdmin(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const productId = parseInt(id);
  if (isNaN(productId)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  try {
    await query('DELETE FROM ProductVariant WHERE productId = ?', [productId]);
    await query('DELETE FROM ProductDetail WHERE productId = ?', [productId]);
    await query('DELETE FROM Review WHERE productId = ?', [productId]);
    await query('DELETE FROM Question WHERE productId = ?', [productId]);
    await query('DELETE FROM Product WHERE id = ?', [productId]);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: true });
  }
}
