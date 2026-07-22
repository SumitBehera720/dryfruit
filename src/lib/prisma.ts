/**
 * Prisma is disabled on this hosting environment because the native Rust
 * binary engine crashes due to thread creation limits (ulimit).
 * All database access goes through mysql2 directly (src/lib/db.ts).
 *
 * This stub prevents the native engine from ever loading while keeping
 * TypeScript happy. Any code that still calls prisma.* will throw and
 * be caught by existing try/catch blocks.
 */
import type { PrismaClient } from '@prisma/client';

const stub = new Proxy(
  {},
  {
    get(_target, prop) {
      if (prop === 'then') return undefined; // not a Promise
      return new Proxy(
        () => { throw new Error(`prisma.${String(prop)} is not available (use mysql2 via db.ts)`); },
        {
          get(_t, method) {
            return () => { throw new Error(`prisma.${String(prop)}.${String(method)} is not available (use mysql2 via db.ts)`); };
          },
          apply() {
            throw new Error(`prisma.${String(prop)}() is not available (use mysql2 via db.ts)`);
          },
        }
      );
    },
  }
) as unknown as PrismaClient;

export const prisma = stub;
