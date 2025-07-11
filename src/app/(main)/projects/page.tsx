import { getProjects } from "@/api/project";
import { getTags } from "@/api/tag";
import { CreateProjectForm } from "@/components/forms/create-project-form";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export const dynamic = "force-dynamic";
export default async function ProjectsPage() {
  const projects = await getProjects();
  const tags = await getTags();
  return (
    <div className="space-y-5">
      <CreateProjectForm tags={tags} />
      <div className="flex flex-col gap-3">
        {projects.map((item) => (
          <Link href={`/projects/${item.id}`} key={item.id}>
            <div className="border rounded-md p-2 hover:border-green-400 hover:scale-[101%] transition">
              <p className="font-semibold text-sm">{item.name}</p>
              <p className="text-sm">
                Port: <span className="italic">{item.port}</span>
              </p>
              <div className="space-x-1">
                {item.projectTag.map((tag, idx) => (
                  <Badge key={idx} variant={"outline"}>
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
