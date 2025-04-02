"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Article, sortArticles, filterArticlesByLabel } from "../lib/articles";

interface ArticleListProps {
  articles: Article[];
  initialFilterLabel?: string;
}

export default function ArticleList({
  articles: initialArticles,
  initialFilterLabel = '',
}: ArticleListProps) {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [sortBy, setSortBy] = useState<"date" | "title">("date");
  const [filterLabel, setFilterLabel] = useState(initialFilterLabel);
  const [articles, setArticles] = useState<Article[]>(
    sortArticles(
      initialFilterLabel
        ? filterArticlesByLabel(initialArticles, initialFilterLabel)
        : initialArticles,
      sortBy,
      sortOrder
    )
  );

  useEffect(() => {
    setArticles(
      sortArticles(
        filterLabel
          ? filterArticlesByLabel(initialArticles, filterLabel)
          : initialArticles,
        sortBy,
        sortOrder
      )
    );
  }, [filterLabel, sortBy, sortOrder, initialArticles]);

  const handleSort = (newSortBy: "date" | "title") => {
    const newSortOrder =
      newSortBy === sortBy ? (sortOrder === "asc" ? "desc" : "asc") : "desc";
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  const handleFilter = (label: string) => {
    setFilterLabel(label);
  };

  const allLabels = Array.from(
    new Set(initialArticles.flatMap((article) => article.labels))
  );

  return (
    <div>
      <div className="bg-white mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => handleSort("date")}
          className="px-4 py-2 bg-[#53b8fd] text-white rounded hover:bg-[#5499f3] transition-colors"
        >
          日付で{sortBy === "date" && sortOrder === "asc" ? "降順" : "昇順"}
          ソート
        </button>
        <button
          onClick={() => handleSort("title")}
          className="px-4 py-2 bg-[#53b8fd] text-white rounded hover:bg-[#5499f3] transition-colors"
        >
          タイトルで
          {sortBy === "title" && sortOrder === "asc" ? "降順" : "昇順"}ソート
        </button>
        <select
          value={filterLabel}
          onChange={(e) => handleFilter(e.target.value)}
          className="px-4 py-2 bg-white border border-[#905128] rounded text-[#905128]"
        >
          <option value="">カテゴリで絞り込み</option>
          {allLabels.map((label) => (
            <option key={label} value={label}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <ul className="space-y-4">
        {articles.map((article) => (
          <li
            key={article.id}
            className="bg-[#ffc49b] p-4 rounded-lg shadow hover:bg-[#ffe6bd] hover:shadow-md transition-shadow"
          >
            <Link
              href={`/articles/${article.id}`}
              className="text-lg text-[#051113] hover:underline"
            >
              {article.title}
            </Link>
            <p className="text-sm text-gray-600 mt-1">{article.date}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {article.labels.map((label) => (
                <span
                  key={label}
                  className="inline-block bg-[#ffffff] text-[#905128] rounded-full px-3 py-1 text-sm font-semibold"
                >
                  {label}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

