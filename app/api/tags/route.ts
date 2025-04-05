import { NextResponse } from "next/server";
import { getAllTags } from "@/lib/api";

export async function GET() {
  try {
    const allTags = await getAllTags();
    const tagNames = allTags.map((tag) => tag.name).sort();
    return NextResponse.json(tagNames);
  } catch (error) {
    console.error("API Error fetching tags:", error);
    return NextResponse.json(
      { error: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
}
