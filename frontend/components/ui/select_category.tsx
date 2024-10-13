import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
// import { categories } from "@/api/category";
import useCategory from "@/hooks/useCategory"
type CategoryProps = {
    selectedCategory: string;
    setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}


const SelectCategory: React.FC<CategoryProps> = ({ selectedCategory, setSelectedCategory }) => {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");
    const categories = useCategory()
    return ( 
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="cat__select w-[250px] justify-between"
                >
                    {value
                        ? categories.find(category => category.name === value)?.name 
                        : "Выберите категорию..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[280px] p-0">
                <Command className="cat__search">
                    <CommandInput placeholder="Поиск категории..." />
                    <CommandList>
                        <CommandEmpty>Категория не найдена.</CommandEmpty>
                        <CommandGroup className="cat__search__text">
                            {categories.map(category => (
                                <CommandItem
                                    key={category.id}
                                    value={category.name} 
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue);
                                        setSelectedCategory(currentValue === value ? "" : currentValue); 
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={`mr-2 h-4 w-4 ${value === category.name ? "opacity-100" : "opacity-0"}`}
                                    />
                                    {category.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default SelectCategory;
