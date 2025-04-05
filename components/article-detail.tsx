"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar } from "lucide-react";

type Article = {
  id: string;
  title: string;
  content: string;
  date?: string;
  labels?: string[];
  tags?: { name: string }[];
  publishedAt?: string;
};

export default function ArticleDetail({ id }: { id: string }) {
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      setIsLoading(true);
      try {
        // APIから記事データを取得 (contentにはHTML文字列が含まれる)
        const response = await fetch(`/api/articles?id=${id}`);
        if (!response.ok) {
          throw new Error("記事の取得に失敗しました");
        }
        const data = await response.json();
        setArticle(data);
      } catch (error) {
        console.error("記事の取得に失敗しました:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  const handleBack = () => {
    router.push("/");
  };

  // formatContent 関数は不要なので削除

  if (isLoading) {
    // ローディング表示
    return (
      <div className="max-w-3xl mx-auto animate-pulse">
        <div className="h-8 bg-muted rounded mb-6 w-1/4"></div>
        <div className="h-10 bg-muted rounded mb-4 w-3/4"></div>
        <div className="flex gap-2 mb-6">
          <div className="h-6 bg-muted rounded w-20"></div>
          <div className="h-6 bg-muted rounded w-20"></div>
        </div>
        <div className="space-y-4">
          <div className="h-4 bg-muted rounded w-full"></div>
          <div className="h-4 bg-muted rounded w-full"></div>
          <div className="h-4 bg-muted rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (!article) {
    // 記事が見つからない場合の表示
    return (
      <div className="max-w-3xl mx-auto text-center py-12">
        <h2 className="text-2xl font-medium mb-4">
          記事が見つかりませんでした
        </h2>
        <Button onClick={handleBack} className="bg-primary hover:bg-primary/10">
          記事一覧に戻る
        </Button>
      </div>
    );
  }

  // 日付の整形
  const formattedDate =
    article.date ||
    (article.publishedAt
      ? new Date(article.publishedAt)
          .toISOString()
          .split("T")[0]
          .replace(/-/g, ".")
      : "");

  // タグの取得
  const labels =
    article.labels || (article.tags ? article.tags.map((tag) => tag.name) : []);

  return (
    <div className="max-w-3xl mx-auto">
      <Button
        variant="link"
        className="mb-6 pl-0 flex items-center group hover:text-primary"
        onClick={handleBack}
      >
        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
        記事一覧に戻る
      </Button>

      <h1 className="text-3xl md:text-4xl font-medium mb-4 text-primary/90">
        {article.title}
      </h1>

      <div className="flex flex-wrap items-center gap-3 mb-8">
        <p className="text-sm text-muted-foreground flex items-center gap-1">
          <Calendar className="h-3.5 w-3.5" />
          {formattedDate}
        </p>
        <div className="flex flex-wrap gap-2">
          {labels.map((label, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-secondary/80 dark:bg-secondary/50"
            >
              {label}
            </Badge>
          ))}
        </div>
      </div>

      {/* 記事本文をHTMLとしてレンダリング */}
      <div
        className="prose prose-lg dark:prose-invert max-w-none bg-card p-6 md:p-8 rounded-xl border shadow-sm"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </div>
  );
}
