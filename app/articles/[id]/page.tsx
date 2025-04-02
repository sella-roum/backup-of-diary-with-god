import { notFound } from "next/navigation";
import ArticleDetail from "@/components/article-detail";

interface ArticlePageProps {
  params: { id: string };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  // paramsをawaitする必要がある場合は以下のようにする
  // const resolvedParams = await params;
  // const id = Number.parseInt(resolvedParams.id);

  // 現在のケースでは単純に型を修正
  const id = Number.parseInt(params.id);

  if (isNaN(id)) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ArticleDetail id={id} />
    </div>
  );
}
