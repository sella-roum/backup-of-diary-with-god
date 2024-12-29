import ArticleList from "../components/ArticleList";
import { getArticles } from "../lib/server/articles";

export default async function Home() {
  const articles = await getArticles();
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">DIARY WITH GOD 記事一覧</h1>
      <p className="text-1xl mb-6">
        2016年より約3年+それ以降は不定期更新していた
        <br />
        聖書の神様との日々の語らいの過去記事一覧です。
      </p>
      <ArticleList articles={articles} />
    </main>
  );
}
