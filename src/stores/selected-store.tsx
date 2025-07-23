import { create } from "zustand";

type State = { selected: string[] };
type Action = {
  setSelected: (val: string) => void;
  setArray: (val: string[]) => void;
};
// enum SectionType {
//   Highlight = "Highlight",
//   TopPick = "TopPick",
//   Popular = "Popular",
// }

export const useSelectedData = create<State & Action>((set) => ({
  selected: [],
  setArray(val) {
    set({ selected: val });
  },
  setSelected(val) {
    set((prev) => {
      const isExist = prev.selected.includes(val);
      return {
        selected: isExist
          ? prev.selected.filter((id) => id !== val)
          : [...prev.selected, val],
      };
    });
  },
}));
