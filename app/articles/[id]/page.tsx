import ArticleDetail from "@/components/article-detail";
import { getAllBlogs } from "@/lib/api";

interface ArticlePageProps {
  params: { id: string };
}

// export async function generateStaticParams() {
//   // microCMSからすべての記事IDを取得
//   try {
//     const { contents } = await getAllBlogs({ fields: "id", limit: 100 });
//     return contents.map((blog) => ({
//       id: blog.id,
//     }));
//   } catch (error) {
//     console.error("Error in generateStaticParams:", error);
//     return [];
//   }
// }

export default async function ArticlePage({ params }: ArticlePageProps) {
  try {
    const id = params.id;

    return (
      <div className="container mx-auto px-4 py-8">
        <ArticleDetail id={id} />
      </div>
    );
  } catch (e) {
    return null;
  }
}
