import { Search, Plus } from "lucide-react"
import {Input} from "./ui/input.tsx";
import {Button} from "./ui/button.tsx";

const SearchBar = (props, children) => {
    return (
        <div className="container mx-auto mt-5">
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-3">
                <div className="w-full sm:w-1/2">
                    <form className="flex gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                className="pl-9 h-10 w-full"
                                type="search"
                                placeholder="Search customer"
                                aria-label="Search"
                                id="searchBar"
                                onChange={(e) => props.setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Button
                            variant="outline"
                            type="button"
                            id="searchButton"
                            onClick={props.handleSearch}
                            className="h-10 px-4 shrink-0"
                        >
                            Search
                        </Button>
                    </form>
                    {/*<ul id="suggestions" className="mt-2 bg-background border rounded-md shadow-sm max-h-60 overflow-auto">*/}
                    {/*  {props.suggestions.map((suggestion, index) => (*/}
                    {/*    <li key={index} className="px-3 py-2 hover:bg-muted cursor-pointer text-sm">{suggestion}</li>*/}
                    {/*  ))}*/}
                    {/*</ul>*/}
                </div>
                <div className="flex justify-end sm:w-1/2">
                    <Button variant="outline" onClick={props.handleModal1} className="h-10 gap-2">
                        <Plus className="h-4 w-4" />
                        <span>Add</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default SearchBar

