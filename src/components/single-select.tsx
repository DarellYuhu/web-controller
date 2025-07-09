import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  options: { label: string; value: string }[];
  onValueChange: (value: string) => void;
  placeholder?: string;
};

export const SingleSelect = ({
  options,
  onValueChange,
  placeholder,
}: Props) => {
  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((op, idx) => (
          <SelectItem value={op.value} key={idx}>
            {op.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
