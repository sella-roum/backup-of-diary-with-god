import Link from 'next/link'
import { getArticles } from '../lib/articles'

export default function ArticleList() {
  const articles = getArticles()

  return (
    <ul className="space-y-4">
      {articles.map((article) => (
        <li key={article.id} className="bg-white shadow rounded-lg p-4 hover:shadow-md transition-shadow">
          <Link href={`/articles/${article.id}`} className="text-lg text-blue-600 hover:underline">
            {article.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}

