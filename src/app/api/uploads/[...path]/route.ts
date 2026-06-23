import fs from "fs/promises";
import path from "path";

const MIME_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".avif": "image/avif",
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path: parts } = await params;

    // Build the absolute path to the file on disk
    const filePath = path.join(process.cwd(), "uploads", ...parts);

    // Prevent path traversal (e.g. ../../etc/passwd)
    const uploadsRoot = path.join(process.cwd(), "uploads");
    if (!filePath.startsWith(uploadsRoot)) {
      return new Response("Forbidden", { status: 403 });
    }

    const file = await fs.readFile(filePath);

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";

    return new Response(file, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Length": file.length.toString(),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Image serve error:", error);
    return new Response("Not Found", { status: 404 });
  }
}