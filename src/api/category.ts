import { http } from "@/lib/api";

export const getCategories = async () => {
  return (await http.get<Category[]>("/categories")).data;
};
