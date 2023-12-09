"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CheckSquare, Filter, Tag } from "lucide-react";
import { filterTags } from "@/config";

import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export function FilterDialog() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams().get("tags")?.split(",") ?? [];
  const [selectedTags, setSelectedTags] = useState<string[]>(searchParams);

  function handleTagClick(tag: string) {
    if (selectedTags.includes(tag)) {
      setSelectedTags(
        selectedTags.filter((selectedTag) => selectedTag !== tag)
      );
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  }

  function handleSearch() {
    router.push(
      selectedTags.length > 0
        ? `${pathname}?tags=${selectedTags.join(",")}`
        : pathname
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Filter />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Select Filters</DialogTitle>
        </DialogHeader>
        <div className="flex flex-wrap gap-2">
          {filterTags.map((tag, idx) => (
            <Button
              onClick={() => handleTagClick(tag)}
              className="flex gap-2 items-center grow"
              key={idx}
            >
              {selectedTags.includes(tag) ? (
                <CheckSquare className="w-5 h-5" />
              ) : (
                <Tag className="w-5 h-5" />
              )}
              <span className="capitalize">{tag}</span>
            </Button>
          ))}
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => {
              setSelectedTags([]);
              router.push(pathname);
            }}
          >
            Clear Filter
          </Button>
          <Button type="submit" onClick={handleSearch}>
            Search
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
