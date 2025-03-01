"use client"

import { useDispatch, useSelector } from "react-redux"
import SearchBar from "../components/SerchBar.tsx"
import { useEffect, useState } from "react"
import type { Item } from "../models/Item.ts"
import AddItemModal from "../components/AddItem.tsx"
import UpdateItemModal from "../components/UpdateItem.tsx"
import type { Appdispatch } from "../store/store.tsx"
import { getAllItem } from "../reducer/ItemSlice.ts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Package, Loader2, AlertTriangle } from "lucide-react"
import { Badge } from "../components/ui/badge"

export function ItemDash() {
    const items = useSelector((state) => state.item.items)
    const dispatch = useDispatch<Appdispatch>()
    const [isAddModalOpen, setAddModalOpen] = useState<boolean>(false)
    const [isUpdateModalOpen, setUpdateModalOpen] = useState<boolean>(false)
    const [selectedItem, setSelectedItem] = useState<Item | null>(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getAllItem())
            setIsLoading(false)
        }
        fetchData()
    }, [dispatch])

    const handleSearch = () => {
        if (searchTerm && searchTerm.length > 0) {
            setSearchTerm(searchTerm)
        }
    }

    const showAddItem = () => {
        setAddModalOpen(true)
    }

    const showUpdateItem = (item: Item) => {
        setSelectedItem(item)
        setUpdateModalOpen(true)
    }

    const filteredItems = items.filter((item: Item) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase()
        return (
            item.desc?.toLowerCase().includes(lowerCaseSearchTerm) ||
            item.author?.toLowerCase().includes(lowerCaseSearchTerm) ||
            item.price === Number(lowerCaseSearchTerm)
        )
    })

    return (
        <div className="container mx-auto p-6 space-y-6">
            <div className="flex flex-col space-y-2">
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <Package className="h-8 w-8 text-primary" />
                    Inventory
                </h1>
                <p className="text-muted-foreground">Manage your book inventory and stock levels</p>
            </div>

            <div className="mb-6">
                <SearchBar handleSearch={handleSearch} setSearchTerm={setSearchTerm} handleModal1={showAddItem} />
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center min-h-[300px]">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : filteredItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[300px] space-y-4 text-center">
                    <Package className="h-12 w-12 text-muted-foreground" />
                    <div className="space-y-2">
                        <h3 className="text-lg font-medium">No items found</h3>
                        <p className="text-sm text-muted-foreground">
                            {searchTerm ? "Try adjusting your search" : "Add items to get started"}
                        </p>
                    </div>
                </div>
            ) : (
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Book Name</TableHead>
                                <TableHead>Author</TableHead>
                                <TableHead>Stock</TableHead>
                                <TableHead>Price</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredItems.map((item: Item) => (
                                <TableRow
                                    key={item.itemCode}
                                    onClick={() => showUpdateItem(item)}
                                    className="cursor-pointer hover:bg-muted/50"
                                >
                                    <TableCell className="font-medium">{item.desc}</TableCell>
                                    <TableCell>{item.author}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            {item.qto}
                                            {item.qto === 0 && (
                                                <Badge variant="destructive" className="flex items-center gap-1">
                                                    <AlertTriangle className="h-3 w-3" />
                                                    Out of Stock
                                                </Badge>
                                            )}
                                            {item.qto <= 5 && item.qto > 0 && (
                                                <Badge variant="warning" className="flex items-center gap-1">
                                                    Low Stock
                                                </Badge>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>${item.price.toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}

            <AddItemModal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)} />
            <UpdateItemModal
                isOpen={isUpdateModalOpen}
                onClose={() => setUpdateModalOpen(false)}
                selectedItem={selectedItem}
            />
        </div>
    )
}

