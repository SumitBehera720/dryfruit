// In-memory store for pages and menu items (fallback when DB is unavailable)

export interface PageData {
  id: number;
  title: string;
  slug: string;
  content: string;
  active: boolean;
  createdAt: string;
}

export interface MenuItemData {
  id: number;
  label: string;
  url: string | null;
  pageSlug: string | null;
  parentId: number | null;
  sortOrder: number;
  location: string;
  megaMenu: boolean;
  children?: MenuItemData[];
}

let nextPageId = 1;
let nextMenuId = 100;
const pages: PageData[] = [];
const menuItems: MenuItemData[] = [
  { id: 1, label: 'Women', url: '/shop?gender=women', pageSlug: null, parentId: null, sortOrder: 0, location: 'main', megaMenu: false },
  { id: 2, label: 'All Women', url: '/shop?gender=women', pageSlug: null, parentId: 1, sortOrder: 0, location: 'main', megaMenu: false },
  { id: 3, label: 'Sculpting Line', url: '/shop?gender=women&category=leggings', pageSlug: null, parentId: 1, sortOrder: 1, location: 'main', megaMenu: false },
  { id: 4, label: 'Summer Drop', url: '/shop?gender=women&category=shorts', pageSlug: null, parentId: 1, sortOrder: 2, location: 'main', megaMenu: false },
  { id: 5, label: 'Sports Bras', url: '/shop?gender=women&category=bras', pageSlug: null, parentId: 1, sortOrder: 3, location: 'main', megaMenu: false },
  { id: 6, label: 'Men', url: '/shop?gender=men', pageSlug: null, parentId: null, sortOrder: 1, location: 'main', megaMenu: false },
  { id: 7, label: 'All Men', url: '/shop?gender=men', pageSlug: null, parentId: 6, sortOrder: 0, location: 'main', megaMenu: false },
  { id: 8, label: 'Training Tees', url: '/shop?gender=men&category=tops', pageSlug: null, parentId: 6, sortOrder: 1, location: 'main', megaMenu: false },
  { id: 9, label: 'Apex Shorts', url: '/shop?gender=men&category=shorts', pageSlug: null, parentId: 6, sortOrder: 2, location: 'main', megaMenu: false },
  { id: 10, label: 'Track Jackets', url: '/shop?gender=men&category=jackets', pageSlug: null, parentId: 6, sortOrder: 3, location: 'main', megaMenu: false },
  { id: 11, label: 'About', url: '/about', pageSlug: null, parentId: null, sortOrder: 2, location: 'main', megaMenu: false },
  { id: 12, label: 'Journal', url: '/#journal', pageSlug: null, parentId: null, sortOrder: 3, location: 'main', megaMenu: false },
];

export function getPages(): PageData[] {
  return [...pages].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getPageById(id: number): PageData | undefined {
  return pages.find((p) => p.id === id);
}

export function getPageBySlug(slug: string): PageData | undefined {
  return pages.find((p) => p.slug === slug);
}

export function createPage(data: { title: string; slug: string; content: string; active: boolean }): PageData {
  const page: PageData = { id: nextPageId++, ...data, createdAt: new Date().toISOString() };
  pages.push(page);
  return page;
}

export function updatePage(id: number, data: { title: string; slug: string; content: string; active: boolean }): PageData | null {
  const idx = pages.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  pages[idx] = { ...pages[idx], ...data };
  return pages[idx];
}

export function deletePage(id: number): boolean {
  const idx = pages.findIndex((p) => p.id === id);
  if (idx === -1) return false;
  pages.splice(idx, 1);
  return true;
}

export function getMenuItems(location: string): MenuItemData[] {
  return menuItems
    .filter((m) => m.location === location && m.parentId === null)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((m) => ({
      ...m,
      children: menuItems
        .filter((c) => c.parentId === m.id)
        .sort((a, b) => a.sortOrder - b.sortOrder),
    }));
}

export function createMenuItem(data: { label: string; url?: string; pageSlug?: string; parentId?: number | null; sortOrder?: number; location?: string; megaMenu?: boolean }): MenuItemData {
  const item: MenuItemData = {
    id: nextMenuId++,
    label: data.label,
    url: data.url || null,
    pageSlug: data.pageSlug || null,
    parentId: data.parentId || null,
    sortOrder: data.sortOrder || 0,
    location: data.location || 'main',
    megaMenu: data.megaMenu || false,
  };
  menuItems.push(item);
  return item;
}

export function updateMenuItem(id: number, data: Partial<MenuItemData>): MenuItemData | null {
  const idx = menuItems.findIndex((m) => m.id === id);
  if (idx === -1) return null;
  menuItems[idx] = { ...menuItems[idx], ...data };
  return menuItems[idx];
}

export function deleteMenuItem(id: number): boolean {
  const idx = menuItems.findIndex((m) => m.id === id);
  if (idx === -1) return false;
  // Also delete children
  for (let i = menuItems.length - 1; i >= 0; i--) {
    if (menuItems[i].parentId === id || menuItems[i].id === id) {
      menuItems.splice(i, 1);
    }
  }
  return true;
}
