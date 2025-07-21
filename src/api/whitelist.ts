import { http } from "@/lib/api";

export const getWhitelist = async () => {
  return (
    await http.get<(BaseMetadata & { prompts: Prompt[] })[]>("/whitelist")
  ).data;
};
