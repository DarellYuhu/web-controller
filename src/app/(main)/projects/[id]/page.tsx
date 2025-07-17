import { getArticles } from "@/api/article";
import { getProject } from "@/api/project";
import { ArticleListItem } from "@/components/article-list-item";
import { GenerateWebButton } from "@/components/generate-web-button";
import { SetSectionDropdown } from "@/components/set-section-dropdown";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import Link from "next/link";

export default async function ProjectPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ section_type: SectionType }>;
}) {
  const { id } = await params;
  const { section_type } = await searchParams;
  const project = await getProject(id);
  const articles = await getArticles({
    projectId: id,
    sectionType: section_type,
  });
  return (
    <div className="space-y-8">
      <div className="border rounded-md p-5 flex justify-between">
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
              <td className="space-x-1">
                {project.projectTag.map((t, idx) => (
                  <Badge key={idx}>{t}</Badge>
                ))}
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <GenerateWebButton projectId={id} />
        </div>
      </div>
      <div className="flex justify-between">
        <SetSectionDropdown />
        <ToggleGroup
          type="single"
          variant={"outline"}
          value={section_type as unknown as string}
        >
          <ToggleGroupItem className="flex-1" value="all">
            <Link href={`/projects/${id}`}>All</Link>
          </ToggleGroupItem>
          <ToggleGroupItem className="flex-1" value="Highlight">
            <Link href={"?section_type=Highlight"}>Highlight</Link>
          </ToggleGroupItem>
          <ToggleGroupItem className="flex-1" value="TopPick">
            <Link href={"?section_type=TopPick"}>Top pick</Link>
          </ToggleGroupItem>
          <ToggleGroupItem className="flex-1" value="Popular">
            <Link href={"?section_type=Popular"}>Popular</Link>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="space-y-4">
        {articles.map((ar) => (
          <ArticleListItem article={ar} key={ar.id} />
        ))}
      </div>
    </div>
  );
}
