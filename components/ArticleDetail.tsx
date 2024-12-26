import Link from 'next/link'

interface ArticleDetailProps {
  title: string
  content: string
}

export default function ArticleDetail({ title, content }: ArticleDetailProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <div className="prose">
        {content.split('\n').map((paragraph, index) => (
          <p key={index} className="mb-4">{paragraph}</p>
        ))}
      </div>
      <Link href="/" className="text-blue-600 hover:underline mt-6 inline-block">
        記事一覧へ戻る
      </Link>
    </div>
  )
}

