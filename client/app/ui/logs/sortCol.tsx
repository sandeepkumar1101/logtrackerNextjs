"use client";

import { ArrowDown, ArrowUp } from "lucide-react";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function SortColumn({ filterKey }: { filterKey: string }) {
  const [sort, setSort] = useState("asc");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (term) {
      params.set("sortedBy", filterKey);
      params.set("order", sort);
    } else {
      params.delete("sortedBy", filterKey);
      params.delete("order", sort);
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);
  return (
    <button
      onClick={() => {
        setSort(sort === "asc" ? "desc" : "asc");
        handleSearch(filterKey);
      }}
      className="flex flex-row gap-1 items-center"
    >
      <span>{filterKey}</span>
      {sort === "asc" ? <ArrowUp /> : <ArrowDown />}
    </button>
  );
}
