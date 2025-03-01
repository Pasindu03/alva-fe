"use client"

import { useDispatch, useSelector } from "react-redux"
import { Customer } from "../models/Customer.ts"
import SearchBar from "../components/SerchBar.tsx"
import { useEffect, useState } from "react"
import AddCustomerModal from "../components/AddCustomer.tsx"
import UpdateCustomerModal from "../components/UpdateCustomer.tsx"
import { Appdispatch } from "../store/store.tsx"
import { getAllCustomer } from "../reducer/CustomerSlice.ts"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "../components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Users, UserPlus, Search, Loader2 } from 'lucide-react'

export function CustomerDash() {
    const customers = useSelector(state => state.customer.customers)
    const dispatch = useDispatch<Appdispatch>()
    const [isAddModalOpen, setAddModalOpen] = useState<boolean>(false)
    const [isUpdateModalOpen, setUpdateModalOpen] = useState<boolean>(false)
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getAllCustomer())
            setIsLoading(false)
        }
        fetchData()
    }, [dispatch])

    function handleSearch() {
        if(searchTerm){
            setSearchTerm(searchTerm)
        }
    }

    function showAddCustomer() {
        setAddModalOpen(true)
    }

    function showUpdateCustomer(customer: Customer) {
        setSelectedCustomer(customer)
        setUpdateModalOpen(true)
    }

    const filteredCustomers = customers.filter((customer:Customer) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase()
        return (
            customer.name?.toLowerCase().includes(lowerCaseSearchTerm) ||
            customer.address?.toLowerCase().includes(lowerCaseSearchTerm) ||
            customer.phone?.toLowerCase().includes(lowerCaseSearchTerm)
        )
    })

    return (
        <div className="container mx-auto p-6 space-y-6">
            <div className="flex flex-col space-y-2">
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <Users className="h-8 w-8 text-primary" />
                    Customers
                </h1>
                <p className="text-muted-foreground">
                    Manage and view all customer information
                </p>
            </div>

            <div className="mb-6">
                <SearchBar
                    handleSearch={handleSearch}
                    setSearchTerm={setSearchTerm}
                    handleModal1={showAddCustomer}
                />
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center min-h-[300px]">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : filteredCustomers.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[300px] space-y-4 text-center">
                    <Users className="h-12 w-12 text-muted-foreground" />
                    <div className="space-y-2">
                        <h3 className="text-lg font-medium">No customers found</h3>
                        <p className="text-sm text-muted-foreground">
                            {searchTerm ? "Try adjusting your search" : "Add a customer to get started"}
                        </p>
                    </div>
                </div>
            ) : (
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Address</TableHead>
                                <TableHead>Phone</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredCustomers.map((customer: Customer) => (
                                <TableRow
                                    key={customer.id}
                                    onClick={() => showUpdateCustomer(customer)}
                                    className="cursor-pointer hover:bg-muted/50"
                                >
                                    <TableCell className="font-medium">{customer.name}</TableCell>
                                    <TableCell>{customer.address}</TableCell>
                                    <TableCell>{customer.phone}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}

            <AddCustomerModal
                isOpen={isAddModalOpen}
                onClose={() => setAddModalOpen(false)}
            />
            <UpdateCustomerModal
                isOpen={isUpdateModalOpen}
                onClose={() => setUpdateModalOpen(false)}
                selectedCustomer={selectedCustomer}
            />
        </div>
    )
}
