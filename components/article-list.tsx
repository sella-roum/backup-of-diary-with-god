"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Search, Tag, X, ArrowRight, Calendar } from "lucide-react";

type Article = {
  id: string;
  date: string;
  labels: string[];
  title: string;
};

export default function ArticleList() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [allLabels, setAllLabels] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [articlesPerPage] = useState(100);

  // タグ一覧を取得（マウント時に一度だけ実行）
  useEffect(() => {
    const fetchAllTags = async () => {
      try {
        const response = await fetch("/api/tags");
        if (!response.ok) {
          throw new Error("Failed to fetch tags");
        }
        const tagData = await response.json();
        setAllLabels(tagData);
      } catch (error) {
        console.error("タグの取得に失敗しました:", error);
      }
    };
    fetchAllTags();
  }, []);

  // 記事一覧を取得
  const fetchArticles = async (search?: string, label?: string) => {
    setIsLoading(true);
    try {
      let url = "/api/articles";
      const params = new URLSearchParams();

      if (search) params.append("search", search);
      if (label) params.append("label", label);
      params.append("page", currentPage.toString());
      params.append("limit", articlesPerPage.toString());

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      setArticles(data.articles || []);
      setTotalCount(data.totalCount || 0);
    } catch (error) {
      console.error("記事の取得に失敗しました:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles(searchKeyword, selectedLabel || undefined);
  }, [searchKeyword, selectedLabel, currentPage]);

  // 検索処理
  const handleSearch = () => {
    setCurrentPage(1); // 検索時はページを1に戻す
    fetchArticles(searchKeyword, selectedLabel || undefined);
  };

  // ラベル選択処理
  const handleLabelSelect = (label: string) => {
    const newLabel = selectedLabel === label ? null : label;
    setSelectedLabel(newLabel);
    setCurrentPage(1); // ラベル変更時はページを1に戻す
    fetchArticles(searchKeyword, newLabel || undefined);
  };

  // 記事詳細ページへ遷移
  const handleArticleClick = (id: string) => {
    router.push(`/articles/${id}`);
  };

  // 総ページ数を計算
  const totalPages = Math.ceil(totalCount / articlesPerPage);

  return (
    <div className="space-y-8">
      <div className="space-y-4 max-w-3xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="記事を検索..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="pl-10 h-12 rounded-full border-primary/20 focus-visible:ring-primary"
          />
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full hover:bg-primary/10 hover:text-primary"
            onClick={handleSearch}
          >
            検索
          </Button>
        </div>

        {allLabels.length > 0 && (
          <div className="flex flex-wrap gap-2 items-center justify-center">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground mr-1">
              カテゴリー:
            </span>
            {allLabels.map((label) => (
              <Badge
                key={label}
                variant={selectedLabel === label ? "default" : "outline"}
                className={`cursor-pointer transition-colors ${
                  selectedLabel === label
                    ? "bg-primary hover:bg-primary/90"
                    : "hover:bg-secondary hover:text-secondary-foreground"
                }`}
                onClick={() => handleLabelSelect(label)}
              >
                {label}
                {selectedLabel === label && (
                  <X
                    className="ml-1 h-3 w-3 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedLabel(null);
                      fetchArticles(searchKeyword);
                    }}
                  />
                )}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-6 bg-muted rounded mb-4 w-3/4"></div>
                <div className="flex gap-2 mb-4">
                  <div className="h-5 bg-muted rounded w-16"></div>
                  <div className="h-5 bg-muted rounded w-16"></div>
                </div>
                <div className="h-4 bg-muted rounded mb-6 w-1/4"></div>
                <div className="h-4 bg-muted rounded mb-2 w-full"></div>
                <div className="h-4 bg-muted rounded mb-2 w-full"></div>
                <div className="h-4 bg-muted rounded w-2/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Card
              key={article.id}
              className="article-card rounded-xl overflow-hidden"
              onClick={() => handleArticleClick(article.id)}
            >
              <CardContent className="p-6">
                <h3 className="text-xl font-medium mb-3 transition-colors duration-200">
                  {article.title}
                </h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {article.labels.slice(0, 3).map((label, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="article-card-badge text-xs"
                    >
                      {label}
                    </Badge>
                  ))}
                  {article.labels.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{article.labels.length - 3}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-4 flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {article.date}
                </p>
              </CardContent>
              <CardFooter className="px-6 pb-6 pt-0">
                <Button
                  variant="link"
                  size="sm"
                  className="ml-auto flex items-center gap-1 text-sm group hover:text-primary"
                >
                  続きを読む
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border rounded-lg bg-muted/20">
          <p className="text-xl font-medium mb-2">記事が見つかりませんでした</p>
          <p className="text-sm text-muted-foreground">
            検索条件を変更するか、フィルターを解除してください
          </p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center items-center gap-4">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            variant="outline"
          >
            前へ
          </Button>
          <span>
            {currentPage} / {totalPages} ページ
          </span>
          <Button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            variant="outline"
          >
            次へ
          </Button>
        </div>
      )}
    </div>
  );
}
