import { NextResponse } from "next/server";
import prisma from "@/prisma/db";

export async function GET(request: Request) {
  try {
    const data = await prisma.actorToLink.findMany({
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
    const { actorName } = body;

    if (!actorName) {
      return NextResponse.json(
        { error: "actorName is required" },
        { status: 400 }
      );
    }

    const existingEntry = await prisma.actorToLink.findUnique({
      where: { actorName },
    });

    if (existingEntry) {
      return NextResponse.json(
        { error: "actorName already exists" },
        { status: 409 }
      );
    }

    const newEntry = await prisma.actorToLink.create({
      data: {
        actorName,
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
    const { actorName } = body;

    if (!actorName) {
      return NextResponse.json(
        { error: "actorName is required" },
        { status: 400 }
      );
    }
    const existingEntry = await prisma.actorToLink.findUnique({
      where: { actorName },
    });

    if (!existingEntry) {
      return NextResponse.json(
        { error: "actorName does not exist" },
        { status: 404 }
      );
    }

    await prisma.actorToLink.delete({
      where: { actorName },
    });

    return NextResponse.json({ message: "Entry deleted successfully" });
  } catch (error) {
    console.error("Error deleting data:", error);
    return NextResponse.json(
      { error: "Failed to delete data" },
      { status: 500 }
    );
  }
}
