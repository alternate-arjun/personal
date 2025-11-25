import { NextResponse } from "next/server";
import prisma from "@/prisma/db";

export async function GET(request: Request) {
  try {
    const data = await prisma.codeToLink.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    let { code, categoryName } = body;

    if (!categoryName) {
      categoryName = "default";
    }

    const category = await prisma.category.upsert({
      where: { name: categoryName },
      update: {},
      create: {
        name: categoryName,
      },
    });

    if (!category) {
      return NextResponse.json(
        { error: "Failed to create or find category" },
        { status: 500 }
      );
    }

    if (!code) {
      return NextResponse.json({ error: "Code is required" }, { status: 400 });
    }

    const existingEntry = await prisma.codeToLink.findUnique({
      where: { code },
    });

    if (existingEntry) {
      return NextResponse.json(
        { error: "Code already exists" },
        { status: 409 }
      );
    }

    const newEntry = await prisma.codeToLink.create({
      data: {
        code,
        categoryId: category.id,
      },
    });

    return NextResponse.json(newEntry);
  } catch (error) {
    console.error("Error creating data:", error);
    return NextResponse.json(
      { error: "Failed to create data" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json({ error: "Code is required" }, { status: 400 });
    }

    const existingEntry = await prisma.codeToLink.findUnique({
      where: { code },
    });

    if (!existingEntry) {
      return NextResponse.json({ error: "Code not found" }, { status: 404 });
    }

    await prisma.codeToLink.delete({
      where: { code },
    });

    return NextResponse.json({ message: "Code deleted successfully" });
  } catch (error) {
    console.error("Error deleting data:", error);
    return NextResponse.json(
      { error: "Failed to delete data" },
      { status: 500 }
    );
  }
}
