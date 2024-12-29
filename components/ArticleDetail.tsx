import Link from 'next/link'

interface ArticleDetailProps {
  title: string
  content: string
  date: string
  labels: string[]
}

export default function ArticleDetail({ title, content, date, labels }: ArticleDetailProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-sm text-gray-600 mb-4">{date}</p>
      <div className="mb-4">
        {labels.map(label => (
          <Link key={label} href={`/?label=${encodeURIComponent(label)}`}>
            <span className="inline-block bg-[#ffc49b] hover:bg-[#ffe6bd] rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 cursor-pointer">
              {label}
            </span>
          </Link>
        ))}
      </div>
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

