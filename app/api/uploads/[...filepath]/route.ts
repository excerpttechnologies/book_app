import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ filepath: string[] }> }  // ✅ Promise in Next.js 15
) {
  try {
    const { filepath } = await context.params; // ✅ await params

    const filePath = path.join(
      process.cwd(),
      "uploads",
      ...filepath
    );

    console.log("Looking for file at:", filePath); // ✅ debug log

    if (!fs.existsSync(filePath)) {
      console.log("File not found:", filePath);
      return new NextResponse("Image not found", { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);
    const ext = path.extname(filePath).toLowerCase();

    const mimeTypes: Record<string, string> = {
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png": "image/png",
      ".jfif": "image/jpeg",
      ".webp": "image/webp",
      ".gif": "image/gif",
    };

    const contentType = mimeTypes[ext] || "application/octet-stream";

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000",
      },
    });
  } catch (error) {
    console.error("Image serve error:", error); // ✅ will show real error
    return new NextResponse("Error serving image", { status: 500 });
  }
}