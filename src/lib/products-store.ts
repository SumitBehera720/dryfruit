import { fallbackProducts } from '@/lib/fallback-data';

type Product = typeof fallbackProducts[number];

const memoryCache: { products: Product[] | null } = { products: null };

export function getCachedProducts(): Product[] {
  if (memoryCache.products) return memoryCache.products;
  memoryCache.products = [...fallbackProducts];
  return memoryCache.products;
}

export function getCachedProduct(id: number): Product | undefined {
  return getCachedProducts().find(p => p.id === id);
}

export function updateCachedProduct(id: number, data: Partial<Product>): Product | undefined {
  const products = getCachedProducts();
  const idx = products.findIndex(p => p.id === id);
  if (idx === -1) return undefined;
  products[idx] = { ...products[idx], ...data };
  memoryCache.products = products;
  return products[idx];
}
