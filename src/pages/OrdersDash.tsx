"use client"

import { TableHeader } from "../components/ui/table"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { Order } from "../models/Order.ts"
import type { Appdispatch } from "../store/store.tsx"
import { deleteOrder, getAllOrders } from "../reducer/OrderSlice.ts"
import { Table, TableBody, TableCell, TableHead, TableRow } from "../components/ui/table"
import { ShoppingCart, Loader2, Calendar, User, AlertTriangle, XCircle } from "lucide-react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "../components/ui/alert-dialog"
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert"

export function OrdersDash() {
    const orders = useSelector((state) => state.orders.orders) || [] // Provide default empty array
    const dispatch = useDispatch<Appdispatch>()
    const [searchTerm, setSearchTerm] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setIsLoading(true)
                await dispatch(getAllOrders())
                setError(null)
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to fetch orders")
            } finally {
                setIsLoading(false)
            }
        }
        fetchOrders()
    }, [dispatch])

    const handleSearch = () => {
        setSearchTerm(searchTerm)
    }

    const handleOrder = async (order: Order) => {
        setSelectedOrder(order)
        setDeleteDialogOpen(true)
    }

    const handleDeleteConfirm = async () => {
        if (selectedOrder) {
            try {
                await dispatch(deleteOrder(selectedOrder.orderId))
                await dispatch(getAllOrders())
                setDeleteDialogOpen(false)
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to delete order")
            }
        }
    }

    const filteredOrders = orders?.filter((order: Order) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase()
        return (
            order.date?.toLowerCase().includes(lowerCaseSearchTerm) ||
            order.customerName?.toLowerCase().includes(lowerCaseSearchTerm)
        )
    })

    if (error) {
        return (
            <div className="container mx-auto p-6">
                <Alert variant="destructive">
                    <XCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            </div>
        )
    }

    return (
        <div className="container mx-auto p-6 space-y-6 min-h-screen">
            {error && (
                <Alert variant="destructive" className="mb-6">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
            <div className="flex flex-col space-y-2 mb-6">
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <ShoppingCart className="h-8 w-8 text-primary" />
                    Orders
                </h1>
                <p className="text-muted-foreground">View and manage all customer orders</p>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center min-h-[300px]">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : filteredOrders.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[300px] space-y-4 text-center">
                    <ShoppingCart className="h-12 w-12 text-muted-foreground" />
                    <div className="space-y-2">
                        <h3 className="text-lg font-medium">No orders found</h3>
                        <p className="text-sm text-muted-foreground">
                            {searchTerm ? "Try adjusting your search" : "Orders will appear here"}
                        </p>
                    </div>
                </div>
            ) : (
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Discount</TableHead>
                                <TableHead>Subtotal</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredOrders.map((order) => (
                                <TableRow
                                    key={order.orderId}
                                    onClick={() => handleOrder(order)}
                                    className="cursor-pointer hover:bg-muted/50"
                                >
                                    <TableCell className="font-medium">#{order.orderId}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <User className="h-4 w-4 text-muted-foreground" />
                                            {order.customerName}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                            {order.date}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            ${order.total.toFixed(2)}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            {order.discount}
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium">${order.subtotal.toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}

            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-destructive" />
                            Delete Order
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete order #{selectedOrder?.orderId}? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteConfirm}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
