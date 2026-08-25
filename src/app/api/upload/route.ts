import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { promises as fs } from 'fs';
import path from 'path';

// Supported MIME types and their extensions
const ALLOWED_TYPES: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/gif': '.gif',
  'image/webp': '.webp',
};

export async function POST(request: NextRequest) {
  const payload = requireAdmin(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const contentType = request.headers.get('content-type') || '';

    let fileBuffer: Buffer;
    let mimeType: string;
    let originalName: string;

    if (contentType.includes('application/json')) {
      // JSON Base64 upload (works through CDN/proxies)
      const body = await request.json() as { data?: string; name?: string; type?: string };
      if (!body.data) {
        return NextResponse.json({ error: 'No file data provided' }, { status: 400 });
      }

      // Strip data URL prefix if present (e.g. "data:image/png;base64,...")
      const base64Data = body.data.includes(',') ? body.data.split(',')[1] : body.data;
      mimeType = body.type || 'image/png';
      originalName = body.name || 'upload.png';
      fileBuffer = Buffer.from(base64Data, 'base64');
    } else {
      // Multipart form-data upload (fallback for direct requests)
      const formData = await request.formData();
      const file = formData.get('file') as File | null;
      if (!file) {
        return NextResponse.json({ error: 'No file provided' }, { status: 400 });
      }
      mimeType = file.type;
      originalName = file.name;
      const bytes = await file.arrayBuffer();
      fileBuffer = Buffer.from(bytes);
    }

    // Validate MIME type
    if (!ALLOWED_TYPES[mimeType]) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, GIF, and WEBP are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    const maxSizeBytes = 5 * 1024 * 1024;
    if (fileBuffer.length > maxSizeBytes) {
      return NextResponse.json({ error: 'File size exceeds 5MB limit' }, { status: 400 });
    }

    // Ensure uploads directory exists and is writable
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    try {
      await fs.mkdir(uploadsDir, { recursive: true });
      const testFile = path.join(uploadsDir, '.write-test');
      await fs.writeFile(testFile, 'test');
      await fs.unlink(testFile);
    } catch (dirErr) {
      const error = dirErr as Error;
      console.error('[ERROR] Uploads directory write test failed:', error);
      return NextResponse.json(
        { error: 'Upload directory is not writable: ' + error.message },
        { status: 500 }
      );
    }

    // Generate unique sanitized filename
    const ext = ALLOWED_TYPES[mimeType];
    const baseName = path.basename(originalName, path.extname(originalName))
      .replace(/[^a-zA-Z0-9_-]/g, '_');
    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}-${baseName}${ext}`;
    const filePath = path.join(uploadsDir, filename);

    // Write to disk
    await fs.writeFile(filePath, fileBuffer);

    console.log(`[INFO] Image uploaded: /api/uploads/${filename} (${fileBuffer.length} bytes)`);
    return NextResponse.json({ url: `/api/uploads/${filename}` });
  } catch (e) {
    const error = e as Error;
    console.error('[ERROR] Upload error:', error);
    return NextResponse.json({ error: error.message || 'Upload failed' }, { status: 500 });
  }
}
