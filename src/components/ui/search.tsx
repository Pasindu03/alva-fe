"use client"

import { Search as SearchIcon } from "lucide-react"
import { Input } from "./input"

export function Search() {
  return (
    <div className="relative w-full max-w-xl">
      <Input
        type="search"
        placeholder="Search product or brand"
        className="w-full pl-4 pr-10 py-2 rounded-md border border-gray-200"
      />
      <SearchIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
    </div>
  )
}