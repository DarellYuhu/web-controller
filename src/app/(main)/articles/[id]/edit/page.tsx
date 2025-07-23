import { getArticle } from "@/api/article";
import { getAuthors } from "@/api/author";
import { getCategories } from "@/api/category";
import { getTags } from "@/api/tag";
import { EditArticleForm } from "@/components/forms/edit-article-form";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditArticlePage({ params }: Props) {
  const { id } = await params;
  const article = await getArticle(id);
  const tags = await getTags();
  const categories = await getCategories();
  const authores = await getAuthors();
  return (
    <div>
      <EditArticleForm
        article={article}
        authors={authores}
        categories={categories}
        tags={tags}
      />
    </div>
  );
}
