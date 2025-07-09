import { http } from "@/lib/api";

export const getTags = async () => {
  return (await http.get<BaseMetadata[]>("/tags")).data;
};
