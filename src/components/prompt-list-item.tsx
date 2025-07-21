import { useSelectedData } from "@/stores/selected-store";
import { Checkbox } from "./ui/checkbox";

export const PromptListItem = ({ item }: { item: Prompt }) => {
  const { selected, setSelected } = useSelectedData();
  return (
    <div className="rounded-md p-3 border flex items-center gap-2">
      <Checkbox
        checked={selected.includes(item.id)}
        onCheckedChange={() => setSelected(item.id)}
      />
      <p>{item.text}</p>
    </div>
  );
};
