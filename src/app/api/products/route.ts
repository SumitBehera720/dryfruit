import { NextRequest, NextResponse } from 'next/server';
import { query, withTransaction } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { getCachedProducts } from '@/lib/products-store';

interface ProductRow { id: number; slug: string; name: string; price: number; salePrice: number | null; label: string | null; category: string; gender: string; active: number; description: string; createdAt: string; }
interface VariantRow { id: number; productId: number; colorName: string; hex: string; image: string; images: string; stock: number; }
interface DetailRow { id: number; productId: number; text: string; sortOrder: number; }
interface ReviewRow { id: number; productId: number; author: string; rating: number; date: string; title: string; comment: string; verified: number; approved: number; }

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const gender = searchParams.get('gender');
  const category = searchParams.get('category');
  const search = searchParams.get('search') || searchParams.get('q');
  const limit = parseInt(searchParams.get('limit') || '50');

  try {
    // Build WHERE clause
    const conditions: string[] = ['p.active = 1'];
    const params: (string | number | null)[] = [];
    if (gender && gender !== 'all') { conditions.push('p.gender = ?'); params.push(gender); }
    if (category && category !== 'all') { conditions.push('p.category = ?'); params.push(category); }
    if (search && search.trim() !== '') {
      conditions.push('(p.name LIKE ? OR p.description LIKE ? OR p.category LIKE ?)');
      const match = `%${search.trim()}%`;
      params.push(match, match, match);
    }
    params.push(limit);

    const where = conditions.join(' AND ');
    const products = await query<ProductRow>(
      `SELECT id, slug, name, price, salePrice, label, category, gender, active, description, createdAt FROM Product p WHERE ${where} ORDER BY createdAt DESC LIMIT ?`,
      params
    );

    if (products.length === 0) {
      const res = NextResponse.json([]);
      res.headers.set('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=60');
      return res;
    }

    const ids = products.map(p => p.id);
    const placeholders = ids.map(() => '?').join(',');
    const idParams = ids as (string | number | null)[];

    const [variants, details, reviews] = await Promise.all([
      query<VariantRow>(`SELECT * FROM ProductVariant WHERE productId IN (${placeholders})`, idParams),
      query<DetailRow>(`SELECT * FROM ProductDetail WHERE productId IN (${placeholders}) ORDER BY sortOrder ASC`, idParams),
      query<ReviewRow>(`SELECT * FROM Review WHERE productId IN (${placeholders}) AND approved = 1 ORDER BY date DESC`, idParams),
    ]);

    const variantsMap = new Map<number, VariantRow[]>();
    const detailsMap = new Map<number, DetailRow[]>();
    const reviewsMap = new Map<number, ReviewRow[]>();
    for (const v of variants) variantsMap.set(v.productId, [...(variantsMap.get(v.productId) || []), v]);
    for (const d of details) detailsMap.set(d.productId, [...(detailsMap.get(d.productId) || []), d]);
    for (const r of reviews) reviewsMap.set(r.productId, [...(reviewsMap.get(r.productId) || []), r]);

    const result = products.map(p => ({
      ...p,
      active: Boolean(p.active),
      variants: variantsMap.get(p.id) || [],
      details: detailsMap.get(p.id) || [],
      reviews: (reviewsMap.get(p.id) || []).slice(0, 5),
    }));

    const res = NextResponse.json(result);
    res.headers.set('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=60');
    return res;
  } catch (err) {
    console.error('Products GET error:', err);
    let result = getCachedProducts();
    if (gender && gender !== 'all') result = result.filter(p => p.gender === gender);
    if (category && category !== 'all') result = result.filter(p => p.category === category);
    if (search && search.trim() !== '') {
      const q = search.trim().toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q)
      );
    }
    const res = NextResponse.json(result.slice(0, limit));
    res.headers.set('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=60');
    return res;
  }
}

export async function POST(request: NextRequest) {
  const payload = requireAdmin(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const data = await request.json();

  // Input validation
  if (!data.name || typeof data.name !== 'string' || data.name.trim() === '') {
    return NextResponse.json({ error: 'Product name is required' }, { status: 400 });
  }
  if (!data.category || typeof data.category !== 'string' || data.category.trim() === '') {
    return NextResponse.json({ error: 'Product category is required' }, { status: 400 });
  }
  const priceNum = parseFloat(data.price);
  if (isNaN(priceNum) || priceNum < 0) {
    return NextResponse.json({ error: 'Valid positive price is required' }, { status: 400 });
  }

  const slug = (data.slug && typeof data.slug === 'string' && data.slug.trim() !== '')
    ? data.slug.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '-')
    : data.name.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '-');

  try {
    const resultProduct = await withTransaction(async (conn) => {
      const [insertRes] = await conn.execute(
        'INSERT INTO Product (slug, name, price, salePrice, label, category, gender, description, active, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, NOW(), NOW())',
        [
          slug,
          data.name.trim(),
          priceNum,
          data.salePrice ? parseFloat(data.salePrice) : null,
          data.label || null,
          data.category.trim(),
          data.gender || 'unisex',
          data.description || '',
        ]
      );
      const productId = (insertRes as { insertId: number }).insertId;

      const variants = data.variants && data.variants.length > 0 ? data.variants : [{
        colorName: 'Default', hex: '#000000', image: data.image || '', images: data.image ? [data.image] : [], stock: 10,
      }];

      for (const v of variants) {
        await conn.execute(
          'INSERT INTO ProductVariant (productId, colorName, hex, image, images, stock) VALUES (?, ?, ?, ?, ?, ?)',
          [
            productId,
            v.colorName || 'Default',
            v.hex || '#000000',
            v.image || '',
            v.images ? JSON.stringify(v.images) : JSON.stringify(v.image ? [v.image] : []),
            v.stock ?? 10
          ]
        );
      }

      const [productRows] = await conn.execute('SELECT * FROM Product WHERE id = ?', [productId]);
      const product = (productRows as ProductRow[])[0];
      const [variantRows] = await conn.execute('SELECT * FROM ProductVariant WHERE productId = ?', [productId]);
      return { ...product, variants: variantRows as VariantRow[] };
    });

    return NextResponse.json(resultProduct, { status: 201 });
  } catch (err) {
    const error = err as Error;
    console.error('[ERROR] Products POST error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create product' }, { status: 500 });
  }
}
