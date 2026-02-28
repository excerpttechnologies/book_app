// import { NextRequest, NextResponse } from "next/server";
// import  { connectDB } from "@/src/app/lib/connectDB"; // Ensure the module '@/app/api/connectDB' exists and is correctly exported. If the issue persists, verify the path and module resolution settings in your TypeScript configuration (tsconfig.json).
// import Book from "../models/Book";
// import { writeFile, mkdir } from "fs/promises";
// import path from "path";

// // ✅ GET all books
// export async function GET() {
//   try {
//     await connectDB();
//     const books = await Book.find({});
//     return NextResponse.json(books);
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to fetch books" }, { status: 500 });
//   }
// }

// // ✅ POST - Create new book WITH IMAGES
// export async function POST(request: NextRequest) {
//   try {
//     await connectDB();

//     const formData = await request.formData();

//     const bookName = formData.get("bookName") as string;
//     const authorName = formData.get("authorName") as string;
//     const description = formData.get("description") as string;
//     const mrpPrice = Number(formData.get("mrpPrice"));
//     const salePrice = Number(formData.get("salePrice"));
//     const status = formData.get("status") as "draft" | "active";

//     const image1 = formData.get("image1") as File;
//     const image2 = formData.get("image2") as File;

//     if (!image1 || !image2) {
//       return NextResponse.json(
//         { error: "Both images are required" },
//         { status: 400 }
//       );
//     }

//     // 📂 Upload directory
//     const uploadDir = path.join(process.cwd(), "public/uploads/books");
//     await mkdir(uploadDir, { recursive: true });

//     // 🖼 Save images
//     const image1Name = `${Date.now()}-${image1.name}`;
//     const image2Name = `${Date.now()}-${image2.name}`;

//     await writeFile(
//       path.join(uploadDir, image1Name),
//       Buffer.from(await image1.arrayBuffer())
//     );

//     await writeFile(
//       path.join(uploadDir, image2Name),
//       Buffer.from(await image2.arrayBuffer())
//     );

//     // 💾 Save to DB
//     const newBook = await Book.create({
//       bookName,
//       authorName,
//       description,
//       mrpPrice,
//       salePrice,
//       status,
//       image1: `/uploads/books/${image1Name}`,
//       image2: `/uploads/books/${image2Name}`,
//     });

//     return NextResponse.json(
//       { success: true, book: newBook },
//       { status: 201 }
//     );

//   } catch (error) {
//     console.error("POST /api/books error:", error);
//     return NextResponse.json(
//       { error: "Failed to create book" },
//       { status: 500 }
//     );
//   }
// }

// // ✅ PUT - Update book
// export async function PUT(request: Request) {
//   try {
//     await connectDB();
//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get("id");

//     if (!id) {
//       return NextResponse.json({ error: "Book ID required" }, { status: 400 });
//     }

//     const updateData = await request.json();
//     const updatedBook = await Book.findByIdAndUpdate(id, updateData, { new: true });

//     if (!updatedBook) {
//       return NextResponse.json({ error: "Book not found" }, { status: 404 });
//     }

//     return NextResponse.json(updatedBook);
//   } catch {
//     return NextResponse.json({ error: "Update failed" }, { status: 500 });
//   }
// }

// // ✅ DELETE book
// export async function DELETE(request: Request) {
//   try {
//     await connectDB();
//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get("id");

//     if (!id) {
//       return NextResponse.json({ error: "Book ID required" }, { status: 400 });
//     }

//     await Book.findByIdAndDelete(id);
//     return NextResponse.json({ success: true });
//   } catch {
//     return NextResponse.json({ error: "Delete failed" }, { status: 500 });
//   }
// }





import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/connectDB";
import Book from "@/app/api/models/Book";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

// ✅ GET all books
export async function GET() {
  try {
    await connectDB();
    const books = await Book.find({}).sort({ createdAt: -1 });
    return NextResponse.json(books);
  } catch (error) {
    console.error("GET /api/books error:", error);
    return NextResponse.json(
      { error: "Failed to fetch books" },
      { status: 500 }
    );
  }
}

// ✅ POST - Create new book WITH IMAGES
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const formData = await request.formData();

    // Get form data - matching your frontend field names
    const bookName = formData.get("bookName") as string;
    const mrpPrice = Number(formData.get("mrpPrice"));
    const status = formData.get("status") as "draft" | "active";
    const pageNumber = Number(formData.get("pageNumber"));

    const frontImage = formData.get("image1") as File;
    const backImage = formData.get("image2") as File;

    // Validate required fields
    if (!bookName || !mrpPrice || !pageNumber) {
      return NextResponse.json(
        { error: "Book name, MRP price, and page number are required" },
        { status: 400 }
      );
    }

    if (!frontImage || !backImage) {
      return NextResponse.json(
        { error: "Both front and back images are required" },
        { status: 400 }
      );
    }

    // 📂 Create upload directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), "public/uploads/books");
    await mkdir(uploadDir, { recursive: true });

    // 🖼 Save images with unique names
    const timestamp = Date.now();
    const frontImageName = `${timestamp}-front-${frontImage.name.replace(/\s+/g, '-')}`;
    const backImageName = `${timestamp}-back-${backImage.name.replace(/\s+/g, '-')}`;

    const frontImagePath = path.join(uploadDir, frontImageName);
    const backImagePath = path.join(uploadDir, backImageName);

    // Save files
    await writeFile(frontImagePath, Buffer.from(await frontImage.arrayBuffer()));
    await writeFile(backImagePath, Buffer.from(await backImage.arrayBuffer()));

    // 💾 Save to MongoDB
    const newBook = await Book.create({
      bookName,
      mrpPrice,
      status: status || 'draft',
      pageNumber,
      frontImage: `/uploads/books/${frontImageName}`,
      backImage: `/uploads/books/${backImageName}`,
    });

    return NextResponse.json(
      { 
        success: true, 
        message: "Book created successfully",
        book: newBook 
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("POST /api/books error:", error);
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      return NextResponse.json(
        { error: "A book with this name already exists" },
        { status: 400 }
      );
    }
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { error: errors.join(', ') },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create book. Please try again." },
      { status: 500 }
    );
  }
}

// ✅ PUT - Update book
export async function PUT(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Book ID is required" },
        { status: 400 }
      );
    }

    // Check if it's a form data request (with images) or JSON request
    const contentType = request.headers.get("content-type");
    
    if (contentType?.includes("multipart/form-data")) {
      // Handle form data with images
      const formData = await request.formData();
      
      const updateData: any = {};
      const fields = ["bookName", "mrpPrice", "status", "pageNumber"];
      
      fields.forEach(field => {
        const value = formData.get(field);
        if (value) {
          if (field === "mrpPrice" || field === "pageNumber") {
            updateData[field] = Number(value);
          } else {
            updateData[field] = value;
          }
        }
      });

      // Handle image updates if provided
      const frontImage = formData.get("frontImage") as File;
      const backImage = formData.get("backImage") as File;

      if (frontImage) {
        const uploadDir = path.join(process.cwd(), "public/uploads/books");
        await mkdir(uploadDir, { recursive: true });
        
        const frontImageName = `${Date.now()}-front-${frontImage.name.replace(/\s+/g, '-')}`;
        const frontImagePath = path.join(uploadDir, frontImageName);
        
        await writeFile(frontImagePath, Buffer.from(await frontImage.arrayBuffer()));
        updateData.frontImage = `/uploads/books/${frontImageName}`;
      }

      if (backImage) {
        const uploadDir = path.join(process.cwd(), "public/uploads/books");
        await mkdir(uploadDir, { recursive: true });
        
        const backImageName = `${Date.now()}-back-${backImage.name.replace(/\s+/g, '-')}`;
        const backImagePath = path.join(uploadDir, backImageName);
        
        await writeFile(backImagePath, Buffer.from(await backImage.arrayBuffer()));
        updateData.backImage = `/uploads/books/${backImageName}`;
      }

      const updatedBook = await Book.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );

      if (!updatedBook) {
        return NextResponse.json(
          { error: "Book not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Book updated successfully",
        book: updatedBook
      });

    } else {
      // Handle JSON request
      const updateData = await request.json();
      
      const updatedBook = await Book.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );

      if (!updatedBook) {
        return NextResponse.json(
          { error: "Book not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Book updated successfully",
        book: updatedBook
      });
    }

  } catch (error: any) {
    console.error("PUT /api/books error:", error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { error: errors.join(', ') },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to update book" },
      { status: 500 }
    );
  }
}

// ✅ DELETE book
export async function DELETE(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Book ID is required" },
        { status: 400 }
      );
    }

    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return NextResponse.json(
        { error: "Book not found" },
        { status: 404 }
      );
    }

    // Optional: Delete the image files from server
    // You might want to add this if you want to clean up files

    return NextResponse.json({
      success: true,
      message: "Book deleted successfully"
    });

  } catch (error) {
    console.error("DELETE /api/books error:", error);
    return NextResponse.json(
      { error: "Failed to delete book" },
      { status: 500 }
    );
  }
}