

// import { NextRequest, NextResponse } from "next/server";
// import { connectDB } from "../../connectDB";
// import Book from "../../models/Book";
// import { writeFile, unlink, mkdir, access } from "fs/promises";
// import path from "path";

// // Helper function to extract filename from URL
// function getFilenameFromUrl(url: string): string {
//   if (!url) return "";
//   const parts = url.split("/");
//   return parts[parts.length - 1];
// }

// // Proper file existence check
// async function fileExists(filePath: string): Promise<boolean> {
//   try {
//     await access(filePath);
//     return true;
//   } catch {
//     return false;
//   }
// }

// // ==========================
// // GET single book
// // ==========================
// export async function GET(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const { id } = params;

//     await connectDB();
//     const book = await Book.findById(id);

//     if (!book) {
//       return NextResponse.json({ error: "Book not found" }, { status: 404 });
//     }

//     return NextResponse.json({
//       _id: book._id.toString(),
//       bookName: book.bookName,
//       authorName: book.authorName,
//       description: book.description,
//       mrpPrice: book.mrpPrice,
//       salePrice: book.salePrice,
//       status: book.status,
//       image1: book.image1,
//       image2: book.image2,
//       createdAt: book.createdAt,
//       updatedAt: book.updatedAt,
//     });
//   } catch (error) {
//     console.error("GET Book Error:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch book" },
//       { status: 500 }
//     );
//   }
// }

// // ==========================
// // UPDATE book
// // ==========================
// export async function PUT(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const { id } = params;
//     await connectDB();

//     const book = await Book.findById(id);
//     if (!book) {
//       return NextResponse.json({ error: "Book not found" }, { status: 404 });
//     }

//     const formData = await request.formData();

//     const bookName = formData.get("bookName") as string;
//     const authorName = formData.get("authorName") as string;
//     const description = formData.get("description") as string;
//     const mrpPrice = Number(formData.get("mrpPrice"));
//     const salePrice = Number(formData.get("salePrice"));
//     const status = formData.get("status") as string;

//     if (!bookName || !authorName || !description || isNaN(mrpPrice) || isNaN(salePrice)) {
//       return NextResponse.json(
//         { error: "All fields are required" },
//         { status: 400 }
//       );
//     }

//     if (salePrice > mrpPrice) {
//       return NextResponse.json(
//         { error: "Sale price cannot be greater than MRP" },
//         { status: 400 }
//       );
//     }

//     const updateData: any = {
//       bookName,
//       authorName,
//       description,
//       mrpPrice,
//       salePrice,
//       status,
//     };

//     const uploadsDir = path.join(process.cwd(), "public", "uploads");
//     await mkdir(uploadsDir, { recursive: true });

//     // Handle images
//     for (const key of ["image1", "image2"] as const) {
//       const file = formData.get(key) as File | null;
//       if (file && file.size > 0) {
//         if (!file.type.startsWith("image/")) {
//           return NextResponse.json(
//             { error: "Only image files allowed" },
//             { status: 400 }
//           );
//         }

//         if (file.size > 5 * 1024 * 1024) {
//           return NextResponse.json(
//             { error: "Image must be under 5MB" },
//             { status: 400 }
//           );
//         }

//         const ext = file.name.split(".").pop() || "jpg";
//         const filename = `book_${Date.now()}_${Math.random()
//           .toString(36)
//           .slice(2)}_${key}.${ext}`;

//         const buffer = Buffer.from(await file.arrayBuffer());
//         const filepath = path.join(uploadsDir, filename);
//         await writeFile(filepath, buffer);

//         updateData[key] = `/uploads/${filename}`;

//         // delete old image
//         const oldImage = book[key];
//         if (oldImage?.startsWith("/uploads/")) {
//           const oldPath = path.join(uploadsDir, getFilenameFromUrl(oldImage));
//           if (await fileExists(oldPath)) {
//             await unlink(oldPath);
//           }
//         }
//       }
//     }

//     const updatedBook = await Book.findByIdAndUpdate(id, updateData, {
//       new: true,
//     });

//     return NextResponse.json(updatedBook);
//   } catch (error) {
//     console.error("PUT Book Error:", error);
//     return NextResponse.json(
//       { error: "Failed to update book" },
//       { status: 500 }
//     );
//   }
// }

// // ==========================
// // DELETE book
// // ==========================
// export async function DELETE(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const { id } = params;
//     await connectDB();

//     const book = await Book.findById(id);
//     if (!book) {
//       return NextResponse.json({ error: "Book not found" }, { status: 404 });
//     }

//     const uploadsDir = path.join(process.cwd(), "public", "uploads");

//     for (const key of ["image1", "image2"] as const) {
//       const image = book[key];
//       if (image?.startsWith("/uploads/")) {
//         const imgPath = path.join(uploadsDir, getFilenameFromUrl(image));
//         if (await fileExists(imgPath)) {
//           await unlink(imgPath);
//         }
//       }
//     }

//     await Book.findByIdAndDelete(id);

//     return NextResponse.json({
//       success: true,
//       message: "Book deleted successfully",
//     });
//   } catch (error) {
//     console.error("DELETE Book Error:", error);
//     return NextResponse.json(
//       { error: "Failed to delete book" },
//       { status: 500 }
//     );
//   }
// }


//before build

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/connectDB";
import Book from "@/app/api/models/Book";
import { writeFile, unlink, mkdir, access } from "fs/promises";
import path from "path";

// ==========================
// Helper: extract filename from URL
// ==========================
function getFilenameFromUrl(url: string): string {
  if (!url) return "";
  const parts = url.split("/");
  return parts[parts.length - 1];
}

// ==========================
// Helper: check file exists
// ==========================
async function fileExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

// ==========================
// GET single book
// ==========================
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await connectDB();
    const book = await Book.findById(id);

    if (!book) {
      return NextResponse.json(
        { error: "Book not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      _id: book._id.toString(),
      bookName: book.bookName,
      authorName: book.authorName,
      description: book.description,
      mrpPrice: book.mrpPrice,
      salePrice: book.salePrice,
      status: book.status,
      image1: book.image1,
      image2: book.image2,
      createdAt: book.createdAt,
      updatedAt: book.updatedAt,
    });
  } catch (error) {
    console.error("GET Book Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch book" },
      { status: 500 }
    );
  }
}

// ==========================
// UPDATE book
// ==========================
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await connectDB();

    const book = await Book.findById(id);
    if (!book) {
      return NextResponse.json(
        { error: "Book not found" },
        { status: 404 }
      );
    }

    const formData = await request.formData();

    const bookName = formData.get("bookName") as string;
    const authorName = formData.get("authorName") as string;
    const description = formData.get("description") as string;
    const mrpPrice = Number(formData.get("mrpPrice"));
    const salePrice = Number(formData.get("salePrice"));
    const status = formData.get("status") as string;

    if (
      !bookName ||
      !authorName ||
      !description ||
      isNaN(mrpPrice) ||
      isNaN(salePrice)
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (salePrice > mrpPrice) {
      return NextResponse.json(
        { error: "Sale price cannot be greater than MRP" },
        { status: 400 }
      );
    }

    const updateData: any = {
      bookName,
      authorName,
      description,
      mrpPrice,
      salePrice,
      status,
    };

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadsDir, { recursive: true });

    // ==========================
    // Handle image uploads
    // ==========================
    for (const key of ["image1", "image2"] as const) {
      const file = formData.get(key) as File | null;

      if (file && file.size > 0) {
        if (!file.type.startsWith("image/")) {
          return NextResponse.json(
            { error: "Only image files are allowed" },
            { status: 400 }
          );
        }

        if (file.size > 5 * 1024 * 1024) {
          return NextResponse.json(
            { error: "Image must be under 5MB" },
            { status: 400 }
          );
        }

        const ext = file.name.split(".").pop() || "jpg";
        const filename = `book_${Date.now()}_${Math.random()
          .toString(36)
          .slice(2)}_${key}.${ext}`;

        const buffer = Buffer.from(await file.arrayBuffer());
        const filepath = path.join(uploadsDir, filename);

        await writeFile(filepath, buffer);
        updateData[key] = `/uploads/${filename}`;

        // Delete old image if exists
        const oldImage = book[key];
        if (oldImage?.startsWith("/uploads/")) {
          const oldPath = path.join(
            uploadsDir,
            getFilenameFromUrl(oldImage)
          );

          if (await fileExists(oldPath)) {
            await unlink(oldPath);
          }
        }
      }
    }

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    return NextResponse.json(updatedBook);
  } catch (error) {
    console.error("PUT Book Error:", error);
    return NextResponse.json(
      { error: "Failed to update book" },
      { status: 500 }
    );
  }
}

// ==========================
// DELETE book
// ==========================
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await connectDB();

    const book = await Book.findById(id);
    if (!book) {
      return NextResponse.json(
        { error: "Book not found" },
        { status: 404 }
      );
    }

    const uploadsDir = path.join(process.cwd(), "public", "uploads");

    for (const key of ["image1", "image2"] as const) {
      const image = book[key];

      if (image?.startsWith("/uploads/")) {
        const imgPath = path.join(
          uploadsDir,
          getFilenameFromUrl(image)
        );

        if (await fileExists(imgPath)) {
          await unlink(imgPath);
        }
      }
    }

    await Book.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    console.error("DELETE Book Error:", error);
    return NextResponse.json(
      { error: "Failed to delete book" },
      { status: 500 }
    );
  }
}
