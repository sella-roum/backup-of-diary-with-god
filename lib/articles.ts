export interface Article {
  id: number;
  date: string;
  labels: string[];
  title: string;
  content: string;
}

export function sortArticles(
  articles: Article[],
  sortBy: "date" | "title",
  sortOrder: "asc" | "desc"
): Article[] {
  return [...articles].sort((a, b) => {
    let comparison = 0;
    if (sortBy === "date") {
      comparison = new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      comparison = a.title.localeCompare(b.title);
    }
    return sortOrder === "asc" ? comparison : -comparison;
  });
}

export function filterArticlesByLabel(
  articles: Article[],
  label: string
): Article[] {
  return articles.filter((article) => article.labels.includes(label));
}
