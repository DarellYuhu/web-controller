"use client";

import { ArticleListItem } from "@/components/article-list-item";
import { GenerateWebButton } from "@/components/generate-web-button";
import { SetSectionDropdown } from "@/components/set-section-dropdown";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useInfiniteArticles } from "@/hooks/use-infinite-articles";
import { useProject } from "@/hooks/use-project";
import { useStopDeployment } from "@/hooks/use-stop-deployment";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

export default function ProjectPage() {
  const searchParams = useSearchParams();
  const sectionType = searchParams.get("section_type");
  const { id }: { id?: string } = useParams();
  const { data: project } = useProject(id);
  const { data: articles, fetchNextPage } = useInfiniteArticles();
  const { mutate: handleStop, isPending: isStoping } = useStopDeployment();
  return (
    <div className="space-y-8">
      <div className="border rounded-md p-5 flex justify-between">
        <table>
          <tbody>
            <tr>
              <td className="font-semibold text-gray-500">Website Name</td>
              <td className="px-4">:</td>
              <td>{project?.name}</td>
            </tr>
            <tr>
              <td className="font-semibold text-gray-500">Description</td>
              <td className="px-4">:</td>
              <td>{project?.description}</td>
            </tr>
            <tr>
              <td className="font-semibold text-gray-500">Port</td>
              <td className="px-4">:</td>
              <td>{project?.port}</td>
            </tr>
            <tr>
              <td className="font-semibold text-gray-500">Status</td>
              <td className="px-4">:</td>
              <td>{project?.status}</td>
            </tr>
            <tr>
              <td className="font-semibold text-gray-500">Tags</td>
              <td className="px-4">:</td>
              <td className="space-x-1">
                {project?.projectTag.map((t, idx) => (
                  <Badge key={idx}>{t}</Badge>
                ))}
              </td>
            </tr>
            <tr>
              <td className="font-semibold text-gray-500">Authors</td>
              <td className="px-4">:</td>
              <td className="space-x-1">
                {project?.projectAuthor.map((a, idx) => (
                  <Badge key={idx} variant={"outline"}>
                    {a}
                  </Badge>
                ))}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="flex flex-col gap-2">
          {id && (
            <>
              <GenerateWebButton projectId={id} />
              <Button
                variant={"destructive"}
                size={"sm"}
                onClick={() => handleStop({ id })}
                disabled={isStoping}
              >
                Stop deployment
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-between">
        <SetSectionDropdown />
        <ToggleGroup
          type="single"
          variant={"outline"}
          value={sectionType as unknown as string}
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
        {articles?.pages
          .flatMap((ar) => ar.data)
          .map((ar) => <ArticleListItem article={ar} key={ar.id} />)}
      </div>
      <Button onClick={() => fetchNextPage()} className="flex place-self-end">
        More
      </Button>
    </div>
  );
}
