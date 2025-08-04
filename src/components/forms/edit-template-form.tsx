import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { Pencil } from "lucide-react";
import { z } from "zod/v4";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { SingleSelect } from "../single-select";
import { TemplateSelector } from "../template-selector";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { useMutation } from "@tanstack/react-query";
import { http } from "@/lib/api";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useProject } from "@/hooks/use-project";

const formSchema = z.object({
  header: z.number().max(4),
  highlight: z.number().max(4),
  topPicks: z.number().max(4),
  articleHeader: z.number().max(3),
});
type FormSchema = z.infer<typeof formSchema>;

export const EditTemplateForm = ({ projectId }: { projectId: string }) => {
  const { data: project } = useProject(projectId);
  const [selectedKey, setSelectedKey] = useState<string | undefined>();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      highlight: project?.template?.highlight ?? 1,
      topPicks: project?.template?.topPicks ?? 1,
      header: project?.template?.header ?? 1,
      articleHeader: project?.template?.articleHeader ?? 1,
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: FormSchema) => {
      await http.patch(`/projects/${projectId}`, { template: payload });
    },
    onSuccess: () => {
      toast.success("Data updated successfully 🎊");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Pencil /> Edit template
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="min-w-3/4">
        <DialogHeader>
          <DialogTitle>Edit website template</DialogTitle>
          <DialogDescription>
            Please fill all the field bellow to customize the website looks
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2 ">
          <Form {...form}>
            <form
              id="edit-template-form"
              onSubmit={form.handleSubmit((val) => mutate(val))}
              className="grid grid-cols-2 gap-4"
            >
              <FormField
                control={form.control}
                name="header"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Header</FormLabel>
                    <FormControl>
                      <SingleSelect
                        options={Array.from({ length: 4 }).map((_, idx) => ({
                          label: (idx + 1).toString(),
                          value: (idx + 1).toString(),
                        }))}
                        onValueChange={(val) => field.onChange(parseInt(val))}
                        value={field.value.toString()}
                        onOpenChange={() => setSelectedKey(field.name)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="highlight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Highlight</FormLabel>
                    <FormControl>
                      <SingleSelect
                        options={Array.from({ length: 4 }).map((_, idx) => ({
                          label: (idx + 1).toString(),
                          value: (idx + 1).toString(),
                        }))}
                        onValueChange={(val) => field.onChange(parseInt(val))}
                        value={field.value.toString()}
                        onOpenChange={() => setSelectedKey(field.name)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="topPicks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Top Picks</FormLabel>
                    <FormControl>
                      <SingleSelect
                        options={Array.from({ length: 4 }).map((_, idx) => ({
                          label: (idx + 1).toString(),
                          value: (idx + 1).toString(),
                        }))}
                        onValueChange={(val) => field.onChange(parseInt(val))}
                        value={field.value.toString()}
                        onOpenChange={() => setSelectedKey(field.name)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="articleHeader"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Article Header</FormLabel>
                    <FormControl>
                      <SingleSelect
                        options={Array.from({ length: 3 }).map((_, idx) => ({
                          label: (idx + 1).toString(),
                          value: (idx + 1).toString(),
                        }))}
                        onValueChange={(val) => field.onChange(parseInt(val))}
                        value={field.value.toString()}
                        onOpenChange={() => setSelectedKey(field.name)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
          {selectedKey && (
            <Card>
              <CardHeader>
                <CardTitle>Template preview</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <TemplateSelector
                    type={selectedKey}
                    model={form.watch(selectedKey as keyof FormSchema)}
                  />
                </ScrollArea>
              </CardContent>
            </Card>
          )}
        </div>
        <DialogFooter>
          <Button type="submit" form="edit-template-form" disabled={isPending}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
