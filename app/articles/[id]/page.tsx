import { getArticle } from '../../../lib/articles'
import ArticleDetail from '../../../components/ArticleDetail'

export default function ArticlePage({ params }: { params: { id: string } }) {
  const article = getArticle(parseInt(params.id))

  if (!article) {
    return <div className="container mx-auto px-4 py-8">記事が見つかりません</div>
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <ArticleDetail 
        title={article.title} 
        content={article.content} 
        date={article.date} 
        labels={article.labels} 
      />
    </main>
  )
}

