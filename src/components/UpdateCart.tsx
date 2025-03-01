"use client"

import { useDispatch } from "react-redux"
import type React from "react"
import { useEffect, useState } from "react"
import { deleteFromCart, updateCart } from "../reducer/OrderDetailSlice.ts"
import type { CartItem } from "../models/CartItem.ts"
import { Button } from "./ui/button.tsx"
import { Label } from "./ui/label.tsx"
import { Input } from "./ui/input.tsx"
import { X, ShoppingCart, Trash2, Save } from "lucide-react"

interface UpdateCartItemModalProps {
    isOpen: boolean
    onClose: () => void
    clickedItem: CartItem | null
}

const UpdateCart: React.FC<UpdateCartItemModalProps> = ({ isOpen, onClose, clickedItem }) => {
    const dispatch = useDispatch()

    const [itemCode, setItemCode] = useState("")
    const [desc, setDesc] = useState("")
    const [unitPrice, setUnitPrice] = useState<number>(0)
    const [qty, setQty] = useState<number>(0)
    const [subTotal, setSubTotal] = useState<number>(0)

    useEffect(() => {
        if (clickedItem) {
            setItemCode(clickedItem.itemCode)
            setDesc(clickedItem.desc)
            setUnitPrice(clickedItem.unitPrice)
            setQty(clickedItem.qty)
            setSubTotal(clickedItem.subTotal)
        }
    }, [clickedItem])

    const handleQuantityChange = (value: string) => {
        const qty = Number(value)
        setQty(qty)
        setSubTotal(qty * unitPrice)
    }

    const handleUpdateCart = () => {
        const cartItem = {
            itemCode,
            desc,
            unitPrice,
            qty,
            subTotal,
        }

        dispatch(updateCart(cartItem))

        setItemCode("")
        setDesc("")
        setUnitPrice(0)
        setQty(0)
        setSubTotal(0)
        onClose()
    }

    const handleDelete = () => {
        dispatch(deleteFromCart(clickedItem))
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm animate-in fade-in">
            <div className="bg-card w-full max-w-xl rounded-lg shadow-lg border border-border p-6 animate-in zoom-in-95">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <ShoppingCart className="h-5 w-5 text-primary" />
                        <h2 className="text-2xl font-semibold text-foreground">Update Cart Item</h2>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="update-item-id">Item ID</Label>
                        <Input id="update-item-id" value={itemCode} readOnly className="bg-muted" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="update-item-desc">Item Description</Label>
                        <Input
                            id="update-item-desc"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            readOnly
                            className="bg-muted"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="update-item-price">Unit Price</Label>
                            <Input id="update-item-price" value={unitPrice} readOnly className="bg-muted" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="update-item-qty">Quantity</Label>
                            <Input
                                id="update-item-qty"
                                type="number"
                                value={qty}
                                onChange={(e) => handleQuantityChange(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="update-sub-total">Sub Total</Label>
                        <Input id="update-sub-total" value={subTotal} readOnly className="bg-muted font-medium text-lg" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4">
                        <Button type="button" variant="destructive" className="w-full" onClick={handleDelete}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Remove Item
                        </Button>

                        <Button type="button" className="w-full" onClick={handleUpdateCart} disabled={qty <= 0}>
                            <Save className="mr-2 h-4 w-4" />
                            Update Item
                        </Button>
                    </div>

                    <Button type="button" variant="outline" className="w-full mt-2" onClick={onClose}>
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default UpdateCart

