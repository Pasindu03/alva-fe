"use client"

import type React from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { v4 } from "uuid"
import type { Appdispatch } from "../store/store.tsx"
import { getAllCustomer, saveCustomer } from "../reducer/CustomerSlice.ts"
import { Button } from "./ui/button.tsx"
import { Label } from "./ui/label.tsx"
import { Input } from "./ui/input.tsx"
import { X } from "lucide-react"

interface AddCustomerModalProps {
    isOpen: boolean
    onClose: () => void
}

const AddCustomerModal: React.FC<AddCustomerModalProps> = ({ isOpen, onClose }) => {
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const dispatch = useDispatch<Appdispatch>()

    if (!isOpen) return null

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const id = `CID-${v4()}`
        const customer = {
            id,
            name,
            address,
            phone,
        }
        await dispatch(saveCustomer(customer))
        onClose()
        await dispatch(getAllCustomer())
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm animate-in fade-in">
            <div className="bg-card w-full max-w-md rounded-lg shadow-lg border border-border p-6 animate-in zoom-in-95">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-foreground">Add Customer</h2>
                    <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Enter customer name" required onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                            id="address"
                            placeholder="Enter customer address"
                            required
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                            id="phone"
                            type="tel"
                            placeholder="Enter phone number"
                            required
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit">Add Customer</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddCustomerModal

