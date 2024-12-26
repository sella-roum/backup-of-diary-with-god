import ArticleList from '../components/ArticleList'

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">記事一覧</h1>
      <ArticleList />
    </main>
  )
}

