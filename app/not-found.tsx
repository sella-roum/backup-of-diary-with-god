import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileQuestion } from "lucide-react"

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-md mx-auto">
        <FileQuestion className="h-24 w-24 mx-auto mb-6 text-muted-foreground" />
        <h2 className="text-3xl font-bold mb-4 text-primary">ページが見つかりません</h2>
        <p className="text-muted-foreground mb-8">お探しのページは存在しないか、移動した可能性があります。</p>
        <Button asChild className="bg-primary hover:bg-primary/90">
          <Link href="/">ホームに戻る</Link>
        </Button>
      </div>
    </div>
  )
}

