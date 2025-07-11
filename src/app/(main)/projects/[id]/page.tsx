import { getArticles } from "@/api/article";
import { getProject } from "@/api/project";
import { ArticleListItem } from "@/components/article-list-item";
import { Badge } from "@/components/ui/badge";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProject(id);
  const articles = await getArticles(id);
  return (
    <div className="space-y-8">
      <div className="border rounded-md p-5">
        <table>
          <tbody>
            <tr>
              <td className="font-semibold text-gray-500">Website Name</td>
              <td className="px-4">:</td>
              <td>{project.name}</td>
            </tr>
            <tr>
              <td className="font-semibold text-gray-500">Description</td>
              <td className="px-4">:</td>
              <td>{project.description}</td>
            </tr>
            <tr>
              <td className="font-semibold text-gray-500">Port</td>
              <td className="px-4">:</td>
              <td>{project.port}</td>
            </tr>
            <tr>
              <td className="font-semibold text-gray-500">Tags</td>
              <td className="px-4">:</td>
              <td>
                {project.projectTag.map((t, idx) => (
                  <Badge key={idx}>{t}</Badge>
                ))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="space-y-4">
        {articles.map((ar) => (
          <ArticleListItem article={ar} key={ar.id} />
        ))}
      </div>
    </div>
  );
}
