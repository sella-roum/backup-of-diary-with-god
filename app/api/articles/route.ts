import { NextResponse } from "next/server";
import articlesData from "@/data/articles.json";

export async function GET(request: Request) {
  // URLからクエリパラメータを取得
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const search = searchParams.get("search");
  const label = searchParams.get("label");

  // 記事データをコピー
  let articles = [...articlesData];

  // IDが指定されている場合は、該当する記事のみを返す
  if (id) {
    const article = articles.find(
      (article) => article.id === Number.parseInt(id)
    );
    if (!article) {
      return NextResponse.json(
        { error: "記事が見つかりません" },
        { status: 404 }
      );
    }
    return NextResponse.json(article);
  }

  // 検索キーワードが指定されている場合
  if (search) {
    const searchLower = search.toLowerCase();
    articles = articles.filter(
      (article) =>
        article.title.toLowerCase().includes(searchLower) ||
        article.content.toLowerCase().includes(searchLower)
    );
  }

  // ラベルが指定されている場合
  if (label) {
    articles = articles.filter((article) =>
      article.labels.some(
        (l: string) => l.toLowerCase() === label.toLowerCase()
      )
    );
  }

  // 日付の降順でソート
  articles.sort((a, b) => {
    const dateA = new Date(a.date.split(".").join("-"));
    const dateB = new Date(b.date.split(".").join("-"));
    return dateB.getTime() - dateA.getTime();
  });

  // 記事リストを返す（コンテンツは省略）
  const articlesWithoutContent = articles.map(
    ({ id, date, labels, title }) => ({
      id,
      date,
      labels,
      title,
      // contentは含めない
    })
  );

  return NextResponse.json(articlesWithoutContent);
}

