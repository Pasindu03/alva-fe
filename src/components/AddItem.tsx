"use client"

import type React from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { v4 } from "uuid"
import type { Appdispatch } from "../store/store.tsx"
import { getAllItem, saveItem } from "../reducer/ItemSlice.ts"
import { Button } from "./ui/button.tsx"
import { Label } from "./ui/label.tsx"
import { Input } from "./ui/input.tsx"
import { X } from "lucide-react"

interface AddItemModalProps {
    isOpen: boolean
    onClose: () => void
}

const AddItemModal: React.FC<AddItemModalProps> = ({ isOpen, onClose }) => {
    const dispatch = useDispatch<Appdispatch>()
    const [itemDescription, setItemDescription] = useState("")
    const [author, setAuthor] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")

    if (!isOpen) return null

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const itemCode = `IID-${v4()}`
        const item = {
            itemCode: itemCode,
            desc: itemDescription,
            author: author,
            qto: Number(quantity),
            price: Number(price),
        }
        await dispatch(saveItem(item))
        onClose()
        await dispatch(getAllItem())
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm animate-in fade-in">
            <div className="bg-card w-full max-w-md rounded-lg shadow-lg border border-border p-6 animate-in zoom-in-95">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-foreground">Add New Book</h2>
                    <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="book-name">Book Name</Label>
                        <Input
                            id="book-name"
                            placeholder="Enter book title"
                            required
                            onChange={(e) => setItemDescription(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="author">Author</Label>
                        <Input id="author" placeholder="Enter author name" required onChange={(e) => setAuthor(e.target.value)} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="quantity">Quantity</Label>
                            <Input
                                id="quantity"
                                type="number"
                                placeholder="Enter quantity"
                                required
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="price">Price</Label>
                            <Input
                                id="price"
                                type="number"
                                placeholder="Enter price"
                                required
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit">Add Book</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddItemModal

