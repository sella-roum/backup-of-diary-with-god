import fs from "fs";
import path from "path";
import { Article } from "../articles";

export function getArticles(): Article[] {
  const filePath = path.join(process.cwd(), "public", "articles.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const articles: Article[] = JSON.parse(fileContents);
  return articles;
}

export function getArticle(id: number): Article | undefined {
  const articles = getArticles();
  return articles.find((article) => article.id === id);
}
