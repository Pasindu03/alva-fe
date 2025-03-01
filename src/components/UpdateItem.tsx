"use client"

import type { Item } from "../models/Item.ts"
import { useDispatch } from "react-redux"
import type React from "react"
import { useEffect, useState } from "react"
import { deleteItem, getAllItem, updateItem } from "../reducer/ItemSlice.ts"
import type { Appdispatch } from "../store/store.tsx"
import { Button } from "./ui/button.tsx"
import { Label } from "./ui/label.tsx"
import { Input } from "./ui/input.tsx"
import { X, Save, Trash2, BookOpen } from "lucide-react"

interface UpdateItemModalProps {
    isOpen: boolean
    onClose: () => void
    selectedItem: Item | null
}

const UpdateItemModal: React.FC<UpdateItemModalProps> = ({ isOpen, onClose, selectedItem }) => {
    const dispatch = useDispatch<Appdispatch>()

    const [itemCode, setItemCode] = useState("")
    const [desc, setDesc] = useState("")
    const [author, setAuthor] = useState("")
    const [qto, setQto] = useState(0)
    const [price, setPrice] = useState(0)

    useEffect(() => {
        if (selectedItem) {
            setItemCode(selectedItem.itemCode)
            setDesc(selectedItem.desc)
            setAuthor(selectedItem.author)
            setQto(selectedItem.qto)
            setPrice(selectedItem.price)
        }
    }, [selectedItem])

    if (!isOpen) return null

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const item = {
            itemCode,
            desc,
            author,
            qto: Number(qto),
            price: Number(price),
        }
        await dispatch(updateItem(item))
        onClose()
        await dispatch(getAllItem())
    }

    const handleDelete = async () => {
        if (selectedItem) {
            await dispatch(deleteItem(selectedItem.itemCode))
        }
        onClose()
        await dispatch(getAllItem())
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm animate-in fade-in">
            <div className="bg-card w-full max-w-md rounded-lg shadow-lg border border-border p-6 animate-in zoom-in-95">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-primary" />
                        <h2 className="text-2xl font-semibold text-foreground">Update Book</h2>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="book-name">Book Name</Label>
                        <Input
                            id="book-name"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            placeholder="Book title"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="book-author">Author</Label>
                        <Input
                            id="book-author"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            placeholder="Author name"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="book-quantity">Quantity</Label>
                            <Input
                                id="book-quantity"
                                type="number"
                                value={qto}
                                onChange={(e) => setQto(Number(e.target.value))}
                                placeholder="Quantity"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="book-price">Price</Label>
                            <Input
                                id="book-price"
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                                placeholder="Price"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4">
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={handleDelete}
                            variant="destructive"
                            onClick={handleDelete}
                            className="w-full"
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </Button>

                        <Button type="submit" className="w-full">
                            <Save className="mr-2 h-4 w-4" />
                            Update
                        </Button>
                    </div>

                    <Button type="button" variant="outline" onClick={onClose} className="w-full">
                        Cancel
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default UpdateItemModal

