"use client";

import { useState } from "react";
import Link from "next/link";
import { Article, sortArticles, filterArticlesByLabel } from "../lib/articles";

interface ArticleListProps {
  articles: Article[];
}

export default function ArticleList({
  articles: initialArticles,
}: ArticleListProps) {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [sortBy, setSortBy] = useState<"date" | "title">("date");
  const [articles, setArticles] = useState<Article[]>(
    sortArticles(initialArticles, sortBy, sortOrder)
  );

  const handleSort = (newSortBy: "date" | "title") => {
    const newSortOrder =
      newSortBy === sortBy ? (sortOrder === "asc" ? "desc" : "asc") : "desc";
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    setArticles(sortArticles(articles, newSortBy, newSortOrder));
  };

  const handleFilter = (label: string) => {
    setArticles(
      label ? filterArticlesByLabel(initialArticles, label) : initialArticles
    );
  };

  const allLabels = Array.from(
    new Set(initialArticles.flatMap((article) => article.labels))
  );

  return (
    <div>
      <div className="mb-4">
        <button
          onClick={() => handleSort("date")}
          className="mr-2 px-2 py-1 bg-blue-500 text-white rounded"
        >
          日付で{sortBy === "date" && sortOrder === "asc" ? "降順" : "昇順"}
          ソート
        </button>
        <button
          onClick={() => handleSort("title")}
          className="mr-2 px-2 py-1 bg-blue-500 text-white rounded"
        >
          タイトルで
          {sortBy === "title" && sortOrder === "asc" ? "降順" : "昇順"}ソート
        </button>
        <select
          onChange={(e) => handleFilter(e.target.value)}
          className="px-2 py-1 border rounded"
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
            className="bg-white shadow rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <Link
              href={`/articles/${article.id}`}
              className="text-lg text-blue-600 hover:underline"
            >
              {article.title}
            </Link>
            <p className="text-sm text-gray-600 mt-1">{article.date}</p>
            <div className="mt-2">
              {article.labels.map((label) => (
                <span
                  key={label}
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
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
