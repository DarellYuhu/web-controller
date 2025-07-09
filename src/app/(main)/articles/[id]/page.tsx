import { getArticle } from "@/api/article";
import { getAuthors } from "@/api/author";
import { getCategories } from "@/api/category";
import { getProjects } from "@/api/project";
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
  const projects = await getProjects();
  console.log(article);
  return (
    <div>
      <EditArticleForm
        article={article}
        projects={projects}
        authors={authores}
        categories={categories}
        tags={tags}
      />
    </div>
  );
}
