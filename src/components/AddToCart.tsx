"use client"

import type React from "react"
import { useState } from "react"
import type { Item } from "../models/Item.ts"
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "../reducer/OrderDetailSlice.ts"
import { Button } from "./ui/button.tsx"
import { Label } from "./ui/label.tsx"
import { Input } from "./ui/input.tsx"
import { X, ShoppingCart, Search } from "lucide-react"

interface AddItemModalProps {
    isOpen: boolean
    onClose: () => void
    suggestions: Item[]
}

const AddCartModal: React.FC<AddItemModalProps> = ({ isOpen, onClose, suggestions }) => {
    const dispatch = useDispatch()
    const items = useSelector((state) => state.item.items)

    const [itemCode, setItemCode] = useState("")
    const [desc, setDesc] = useState("")
    const [unitPrice, setUnitPrice] = useState<number>(0)
    const [qty, setQty] = useState<number>(0)
    const [subTotal, setSubTotal] = useState<number>(0)
    const [showSuggestions, setShowSuggestions] = useState(false)

    const handleItemSelect = (item: Item) => {
        setItemCode(item.itemCode)
        setDesc(item.desc)
        setUnitPrice(item.price)
        setShowSuggestions(false)
        setQty(1)
        setSubTotal(item.price)
    }

    const handleQuantityChange = (value: string) => {
        const qty = Number(value)
        setQty(qty)
        setSubTotal(qty * unitPrice)
    }

    const handleAddToCart = () => {
        const cartItem = {
            itemCode,
            desc,
            unitPrice,
            qty,
            subTotal,
        }

        items.forEach((item: Item) => {
            if (item.itemCode === itemCode) {
                if (item.qto >= qty) {
                    dispatch(addToCart(cartItem))
                } else alert("Insufficient quantity for Item " + item.desc)
            }
        })
        setItemCode("")
        setDesc("")
        setUnitPrice(0)
        setQty(0)
        setSubTotal(0)
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm animate-in fade-in">
            <div className="bg-card w-full max-w-xl rounded-lg shadow-lg border border-border p-6 animate-in zoom-in-95">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <ShoppingCart className="h-5 w-5 text-primary" />
                        <h2 className="text-2xl font-semibold text-foreground">Add to Cart</h2>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="order-item-id">Item ID</Label>
                        <Input id="order-item-id" value={itemCode} readOnly className="bg-muted" />
                    </div>

                    <div className="space-y-2 relative">
                        <Label htmlFor="order-item-desc">Item Description</Label>
                        <div className="relative">
                            <Input
                                id="order-item-desc"
                                value={desc}
                                onChange={(e) => {
                                    setDesc(e.target.value)
                                    setShowSuggestions(true)
                                }}
                                onFocus={() => setShowSuggestions(true)}
                                className="pr-10"
                                placeholder="Search for a book..."
                            />
                            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>

                        {/* Suggestions List */}
                        {showSuggestions && suggestions.length > 0 && (
                            <ul className="absolute z-10 mt-1 w-full max-h-60 overflow-auto rounded-md bg-popover border border-border shadow-md">
                                {suggestions.map((item) => (
                                    <li
                                        key={item.itemCode}
                                        className="px-4 py-2 hover:bg-accent cursor-pointer transition-colors"
                                        onClick={() => handleItemSelect(item)}
                                    >
                                        <div className="font-medium">{item.desc}</div>
                                        <div className="text-sm text-muted-foreground">by {item.author}</div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="order-item-price">Unit Price</Label>
                            <Input id="order-item-price" value={unitPrice} readOnly className="bg-muted" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="order-item-qty">Quantity</Label>
                            <Input
                                id="order-item-qty"
                                type="number"
                                placeholder="Enter Quantity"
                                value={qty}
                                onChange={(e) => handleQuantityChange(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="order-sub-total">Sub Total</Label>
                        <Input id="order-sub-total" value={subTotal} readOnly className="bg-muted font-medium text-lg" />
                    </div>

                    <div className="flex flex-col gap-2 pt-4">
                        <Button type="button" className="w-full" onClick={handleAddToCart} disabled={!itemCode || qty <= 0}>
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Add to Cart
                        </Button>

                        <Button type="button" variant="outline" className="w-full" onClick={onClose}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddCartModal
