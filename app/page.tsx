import ArticleList from "../components/ArticleList";
import { getArticles } from "../lib/server/articles";

export default async function Home() {
  const articles = await getArticles();
  return (
    <main className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6 text-[#051113]">
          DIARY WITH GOD 記事一覧
        </h1>
        <p className="text-xl mb-6 text-[#051113]">
          2016年より約3年+それ以降は不定期更新していた
          <br />
          聖書の神様との日々の語らいの過去記事一覧です。
          <br />
          ※プレーンテキストのみ。リンクは全て削除されています。
        </p>
        <ArticleList articles={articles} />
      </div>
    </main>
  );
}
