import { NextResponse } from "next/server";
import {
  getAllBlogs,
  getBlogById,
  getAllTags,
  getBlogsByTagId,
} from "@/lib/api";

export async function GET(request: Request) {
  // URLからクエリパラメータを取得
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const search = searchParams.get("search");
  const label = searchParams.get("label");
  const page = searchParams.get("page")
    ? Number.parseInt(searchParams.get("page") as string)
    : 1;
  const limit = searchParams.get("limit")
    ? Number.parseInt(searchParams.get("limit") as string)
    : 10;
  const offset = (page - 1) * limit;

  try {
    // IDが指定されている場合は、該当する記事のみを返す
    if (id) {
      const article = await getBlogById(id);
      if (!article) {
        return NextResponse.json(
          { error: "記事が見つかりません" },
          { status: 404 }
        );
      }
      return NextResponse.json(article);
    }

    // 検索クエリの構築
    const queries: any = {
      limit,
      offset,
    };

    // 検索キーワードが指定されている場合
    if (search) {
      queries.q = search;
    }

    // ラベル（タグ）が指定されている場合
    if (label) {
      // まずタグのスラッグからタグIDを取得
      const tags = await getAllTags({
        filters: `name[equals]${label}`,
      });

      if (tags.contents.length > 0) {
        const tagId = tags.contents[0].id;
        // タグIDを使って記事を取得
        const taggedArticles = await getBlogsByTagId(tagId, queries);

        // 記事リストを返す（コンテンツは省略）
        const articlesWithoutContent = taggedArticles.contents.map(
          ({ id, title, tags, publishedAt }) => ({
            id,
            date: publishedAt
              ? new Date(publishedAt)
                  .toISOString()
                  .split("T")[0]
                  .replace(/-/g, ".")
              : "",
            labels: tags ? tags.map((tag) => tag.name) : [],
            title,
          })
        );

        return NextResponse.json(articlesWithoutContent);
      }

      // タグが見つからない場合は空の配列を返す
      return NextResponse.json([]);
    }

    // 通常の記事一覧取得
    const articles = await getAllBlogs(queries);

    // 記事リストを返す（コンテンツは省略）
    const articlesWithoutContent = articles.contents.map(
      ({ id, title, tags, publishedAt }) => ({
        id,
        date: publishedAt
          ? new Date(publishedAt).toISOString().split("T")[0].replace(/-/g, ".")
          : "",
        labels: tags ? tags.map((tag) => tag.name) : [],
        title,
      })
    );

    return NextResponse.json(articlesWithoutContent);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
}
