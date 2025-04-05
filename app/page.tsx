import ArticleList from "@/components/article-list";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
          DIARY WITH GOD
        </h1>
        <div className="w-16 h-1 bg-primary mx-auto mb-6 rounded-full"></div>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
          日々の生活の中で神様との対話を記録したブログです。信仰、祈り、聖書の学びなど、
          霊的な旅路での気づきや経験を共有しています。
        </p>
      </div>
      <ArticleList />
    </div>
  );
}
