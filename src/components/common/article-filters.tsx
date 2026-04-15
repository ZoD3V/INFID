import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

import { useTranslations } from "next-intl";

export interface FilterOption {
  label: string;
  value: string;
}

interface ArticleFiltersProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (value: string) => void;

  authors?: FilterOption[];
  selectedAuthor?: string;
  onAuthorChange?: (value: string) => void;

  years: string[];
  selectedYear: string;
  onYearChange: (value: string) => void;

  className?: string;
}

export function ArticleFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  authors,
  selectedAuthor,
  onAuthorChange,
  years,
  selectedYear,
  onYearChange,
  className,
}: ArticleFiltersProps) {
  const t = useTranslations("news");

  return (
    <div
      className={cn(
        "ml-4 flex flex-col gap-4 md:justify-between lg:container lg:flex-row lg:items-center",
        className,
      )}
    >
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {categories.map((item) => (
          <Button
            key={item}
            size="sm"
            className={cn(
              "rounded-full transition-all",
              selectedCategory !== item &&
                "border-none bg-slate-100 shadow-none",
            )}
            variant={selectedCategory === item ? "default" : "outline"}
            onClick={() => onCategoryChange(item)}
          >
            {item}
          </Button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {/* Select Tahun */}
        <Select value={selectedYear} onValueChange={onYearChange}>
          <SelectTrigger className="w-37.5">
            <SelectValue placeholder={t("content.year")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("content.all_year")}</SelectItem>
            {years.map((y) => (
              <SelectItem key={y} value={y}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Select Penulis */}
        {authors !== undefined && authors.length > 0 && (
          <Select value={selectedAuthor} onValueChange={onAuthorChange}>
            <SelectTrigger className="w-37.5">
              <SelectValue placeholder={t("content.writer")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("content.all_writer")}</SelectItem>
              {authors.map((author) => (
                <SelectItem key={author.value} value={author.value}>
                  {author.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
    </div>
  );
}
