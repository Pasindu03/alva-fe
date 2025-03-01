"use client"

import type React from "react"
import { useEffect, useState } from "react"
import type { Customer } from "../models/Customer.ts"
import { useDispatch } from "react-redux"
import { deleteCustomer, getAllCustomer, updateCustomer } from "../reducer/CustomerSlice.ts"
import type { Appdispatch } from "../store/store.tsx"
import { Button } from "./ui/button.tsx"
import { Label } from "./ui/label.tsx"
import { Input } from "./ui/input.tsx"
import { X, Save, Trash2, User } from "lucide-react"

interface UpdateCustomerModalProps {
    isOpen: boolean
    onClose: () => void
    selectedCustomer: Customer | null
}

const UpdateCustomerModal: React.FC<UpdateCustomerModalProps> = ({ isOpen, onClose, selectedCustomer }) => {
    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")

    const dispatch = useDispatch<Appdispatch>()

    useEffect(() => {
        if (selectedCustomer) {
            setId(selectedCustomer.id)
            setName(selectedCustomer.name)
            setPhone(selectedCustomer.phone)
            setAddress(selectedCustomer.address)
        }
    }, [selectedCustomer])

    if (!isOpen) return null

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const customer = {
            id,
            name,
            address,
            phone,
        }
        await dispatch(updateCustomer(customer))
        onClose()
        await dispatch(getAllCustomer())
    }

    const handleDelete = async () => {
        if (selectedCustomer) {
            await dispatch(deleteCustomer(selectedCustomer.id))
        }
        onClose()
        await dispatch(getAllCustomer())
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm animate-in fade-in">
            <div className="bg-card w-full max-w-md rounded-lg shadow-lg border border-border p-6 animate-in zoom-in-95">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <User className="h-5 w-5 text-primary" />
                        <h2 className="text-2xl font-semibold text-foreground">Update Customer</h2>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="customer-name">Name</Label>
                        <Input
                            id="customer-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Customer name"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="customer-address">Address</Label>
                        <Input
                            id="customer-address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Customer address"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="customer-phone">Phone</Label>
                        <Input
                            id="customer-phone"
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Phone number"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4">
                        <Button type="button" variant="destructive" onClick={handleDelete} className="w-full">
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

export default UpdateCustomerModal

