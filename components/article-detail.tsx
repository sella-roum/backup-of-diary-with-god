"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar } from "lucide-react"

type Article = {
  id: number
  date: string
  labels: string[]
  title: string
  content: string
}

export default function ArticleDetail({ id }: { id: number }) {
  const router = useRouter()
  const [article, setArticle] = useState<Article | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchArticle = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/articles?id=${id}`)
        if (!response.ok) {
          throw new Error("記事の取得に失敗しました")
        }
        const data = await response.json()
        setArticle(data)
      } catch (error) {
        console.error("記事の取得に失敗しました:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchArticle()
  }, [id])

  const handleBack = () => {
    router.push("/")
  }

  // 改行をHTMLの改行タグに変換
  const formatContent = (content: string) => {
    return content.split("\n").map((line, index) => (
      <p key={index} className={line.trim() === "" ? "h-4" : "mb-4"}>
        {line}
      </p>
    ))
  }

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto animate-pulse">
        <div className="h-8 bg-muted rounded mb-6 w-1/4"></div>
        <div className="h-10 bg-muted rounded mb-4 w-3/4"></div>
        <div className="flex gap-2 mb-6">
          <div className="h-6 bg-muted rounded w-20"></div>
          <div className="h-6 bg-muted rounded w-20"></div>
        </div>
        <div className="space-y-4">
          <div className="h-4 bg-muted rounded w-full"></div>
          <div className="h-4 bg-muted rounded w-full"></div>
          <div className="h-4 bg-muted rounded w-3/4"></div>
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto text-center py-12">
        <h2 className="text-2xl font-medium mb-4">記事が見つかりませんでした</h2>
        <Button onClick={handleBack} className="bg-primary hover:bg-primary/90">
          記事一覧に戻る
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Button variant="ghost" className="mb-6 pl-0 flex items-center group hover:text-primary" onClick={handleBack}>
        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
        記事一覧に戻る
      </Button>

      <h1 className="text-3xl md:text-4xl font-medium mb-4 text-primary/90">{article.title}</h1>

      <div className="flex flex-wrap items-center gap-3 mb-8">
        <p className="text-sm text-muted-foreground flex items-center gap-1">
          <Calendar className="h-3.5 w-3.5" />
          {article.date}
        </p>
        <div className="flex flex-wrap gap-2">
          {article.labels.map((label, index) => (
            <Badge key={index} variant="secondary" className="bg-secondary/80 dark:bg-secondary/50">
              {label}
            </Badge>
          ))}
        </div>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none bg-card p-6 md:p-8 rounded-xl border shadow-sm">
        {formatContent(article.content)}
      </div>
    </div>
  )
}

