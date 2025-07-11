import { getAuthors } from "@/api/author";
import { getCategories } from "@/api/category";
import { getTags } from "@/api/tag";
import { getWhitelist } from "@/api/whitelist";
import { CreateMetadataForm } from "@/components/forms/create-metadata-form";
import { ScrollArea } from "@/components/ui/scroll-area";

export const dynamic = "force-dynamic";
export default async function ConfigurationPage() {
  const authors = await getAuthors();
  const tags = await getTags();
  const whitelist = await getWhitelist();
  const categories = await getCategories();
  return (
    <div className="space-y-4">
      <CreateMetadataForm />
      <div className="grid grid-cols-2 gap-3">
        <ScrollArea className="h-[400px] rounded-md border p-5">
          <p className="font-semibold text-xl">Author</p>
          <div className="space-y-2 mt-4">
            {authors.map((item) => (
              <div key={item.id} className="rounded-md p-3 border">
                {item.name}
              </div>
            ))}
          </div>
        </ScrollArea>

        <ScrollArea className="h-[400px] rounded-md border p-5">
          <p className="font-semibold text-xl">Category</p>
          <div className="space-y-2 mt-4">
            {categories.map((item) => (
              <div key={item.id} className="rounded-md p-3 border">
                {item.name}
              </div>
            ))}
          </div>
        </ScrollArea>

        <ScrollArea className="h-[400px] rounded-md border p-5">
          <p className="font-semibold text-xl">Tag</p>
          <div className="space-y-2 mt-4">
            {tags.map((item) => (
              <div key={item.id} className="rounded-md p-3 border">
                {item.name}
              </div>
            ))}
          </div>
        </ScrollArea>

        <ScrollArea className="h-[400px] rounded-md border p-5">
          <p className="font-semibold text-xl">Whitelist</p>
          <div className="space-y-2 mt-4">
            {whitelist.map((item) => (
              <div key={item.id} className="rounded-md p-3 border">
                {item.name}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
