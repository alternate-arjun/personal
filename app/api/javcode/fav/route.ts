import prisma from "@/prisma/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
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

    await prisma.codeToLink.update({
      where: { code },
      data: {
        favorite: !existingEntry.favorite, // Toggle favorite status
      },
    });

    return NextResponse.json({ message: "Code marked as favorite" });
  } catch (error) {
    return NextResponse.json({
      error: "Failed to update favorite status",
      status: 500,
    });
  }
}
