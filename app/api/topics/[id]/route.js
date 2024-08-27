import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const { newTitle, newDescription } = await request.json();

  await connectMongoDB();

  await Topic.findByIdAndUpdate(id, {
    title: newTitle,
    description: newDescription,
  });

  return NextResponse.json({ message: "Topic updated" });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const topic = await Topic.findOne({ _id: id });
  return NextResponse.json({ topic }, { status: 200 });
}
