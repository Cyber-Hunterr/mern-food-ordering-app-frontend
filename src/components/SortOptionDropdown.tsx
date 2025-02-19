import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

type Props = {
  sortOption: string;
  onChange: (value: string) => void;
}

const SORT_OPTIONS = [
  {
    label: "Best Match",
    value: "bestMatch",
  },
  {
    label: "Delivery Price",
    value: "deliveryPrice",
  },
  {
    label: "Estimated Delivery Time",
    value: "estimatedDeliveryTime",
  },
];

const SortOptionDropdown = ({sortOption, onChange}: Props) => {
  const selectedSortLabel = SORT_OPTIONS.find((option) => option.value === sortOption)?.label || SORT_OPTIONS[0].label;
  
  return <DropdownMenu>
    <DropdownMenuTrigger>
      <Button variant="outline" className="w-full">
        Sort By: {selectedSortLabel}
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      {SORT_OPTIONS.map((option) => (
        <DropdownMenuItem className="curser-pointer" onClick={() => onChange(option.value)}>
          {option.label}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
}

export default SortOptionDropdown;