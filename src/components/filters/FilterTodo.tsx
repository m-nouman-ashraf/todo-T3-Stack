import {
  Search,
  Calendar,
  Filter,
  CheckCircle2,
  ListTodo,
  XCircle,
} from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
export type FilterType =
  | "Search By Name"
  | "Search By Date"
  | "All"
  | "Completed"
  | "Pending"
  | null;

interface DropdownMenuDemoProps {
  onFilterSelect: (filterType: FilterType) => void;
}
export function DropdownMenuDemo({ onFilterSelect }: DropdownMenuDemoProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex w-28 gap-2 md:w-44" variant="outline">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => onFilterSelect("Search By Name")}>
            <Search className="mr-2 h-4 w-4" />
            <span>Search By Name</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onFilterSelect("Search By Date")}>
            <Calendar className="mr-2 h-4 w-4" />
            <span>Search By Date</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Filter className="mr-2 h-4 w-4" />
              <span>Filter by Todo</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => onFilterSelect("All")}>
                  <ListTodo className="mr-2 h-4 w-4" />
                  <span>All</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onFilterSelect("Completed")}>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  <span>Completed</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onFilterSelect("Pending")}>
                  <XCircle className="mr-2 h-4 w-4" />
                  <span>Pending</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
