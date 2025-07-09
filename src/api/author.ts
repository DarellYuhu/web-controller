import { http } from "@/lib/api";

export const getAuthors = async () => {
  return (await http.get<BaseMetadata[]>("/authors")).data;
};
