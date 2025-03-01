"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { v4 } from "uuid"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Label } from "../components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Separator } from "../components/ui/separator"
import { ScrollArea } from "../components/ui/scroll-area"
import { CalendarIcon, ShoppingCart, DollarSign, Percent, CreditCard, RefreshCw } from "lucide-react"
import SearchOrder from "../components/SearchOrder.tsx"
import AddToCart from "../components/AddToCart.tsx"
import UpdateCart from "../components/UpdateCart.tsx"
import type { Item } from "../models/Item.ts"
import type { CartItem } from "../models/CartItem.ts"
import type { Order } from "../models/Order.ts"
import type { Customer } from "../models/Customer.ts"
import { clearCart } from "../reducer/OrderDetailSlice.ts"
import { addOrder } from "../reducer/OrderSlice.ts"
import type { Appdispatch } from "../store/store.tsx"

export function OrderDetailsDash() {
    const items = useSelector((state) => state.item.items)
    const cartItems = useSelector((state) => state.cart.cartItems)
    const customerList = useSelector((state) => state.customer.customers)
    const dispatch = useDispatch<Appdispatch>()
    const navigate = useNavigate()

    const [orderId, setOrderId] = useState("")
    const [customerId, setCustomerId] = useState("")
    const [orderDate, setOrderDate] = useState("")
    const [customerName, setCustomerName] = useState("")
    const [total, setTotal] = useState<number>(0)
    const [discount, setDiscount] = useState<number>(0)
    const [subTotal, setSubTotal] = useState<number>(0)
    const [cash, setCash] = useState<number>(0)
    const [balance, setBalance] = useState<number>(0)
    const [searchTerm, setSearchTerm] = useState("")
    const [suggestions, setSuggestions] = useState<Item[]>([])
    const [clickedItem, setClickedItem] = useState<CartItem | null>(null)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [isUpdateOpen, setIsUpdateOpen] = useState<boolean>(false)
    const [quantity, setQuantity] = useState<number>(1)
    const [showSuggestions, setShowSuggestions] = useState(false)

    const [order, setOrder] = useState<Order>({})

    useEffect(() => {
        setOrderId(`OID-${v4()}`)
    }, [])

    useEffect(() => {
        // Update subtotal and balance whenever total, discount, or cash changes
        const discountAmount = total * (discount / 100)
        const calculatedSubTotal = total - discountAmount
        setSubTotal(calculatedSubTotal)
        setBalance(cash - calculatedSubTotal)
    }, [total, discount, cash])

    const handleBuy = async () => {
        if (!orderDate || !cash || !customerName) {
            console.log(orderDate)
            alert("Please fill out all the necessary details")
            return
        } else if (order) {
            order.orderId = orderId
            order.date = orderDate
            order.customerName = customerName
            order.customerId = customerId
            order.total = total
            order.discount = discount
            order.subtotal = subTotal
        }
        await dispatch(addOrder(order))
        navigate("/home/orders")
    }

    function handleFinish() {
        order.cartItems = cartItems
        let cartTotal = 0

        cartItems.forEach((item: CartItem) => {
            cartTotal += item.subTotal
        })

        setTotal(cartTotal)
        dispatch(clearCart())
    }

    function handleSearch() {
        const suggested: Item[] = []
        items.forEach((item: Item) => {
            if (item.desc.toLowerCase().includes(searchTerm.toLowerCase())) {
                suggested.push(item)
            }
        })
        setSuggestions(suggested)
        setIsModalOpen(true)
    }

    function handleItemModify(item: CartItem) {
        setClickedItem(item)
        setIsUpdateOpen(true)
    }

    function handleCustomerSelect(customer: Customer) {
        setCustomerId(customer.id)
        setCustomerName(customer.name)
        setShowSuggestions(false)
    }

    return (
        <div className="flex flex-col lg:flex-row gap-6 p-4 bg-background">
            {/* Order Details Card */}
            <Card className="w-full lg:w-1/3 shadow-md">
                <CardHeader className="bg-primary/5 pb-4">
                    <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                        <ShoppingCart className="h-5 w-5" />
                        New Order
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="orderId">Order ID</Label>
                            <Input id="orderId" value={orderId} readOnly className="bg-muted/50" />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="order-cust-id">Customer ID</Label>
                            <Input
                                id="order-cust-id"
                                value={customerId}
                                onChange={(e) => setCustomerId(e.target.value)}
                                readOnly
                                className="bg-muted/50"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="order-date" className="flex items-center gap-1">
                                <CalendarIcon className="h-4 w-4" /> Date
                            </Label>
                            <Input
                                type="date"
                                id="order-date"
                                value={orderDate}
                                onChange={(e) => setOrderDate(e.target.value)}
                                required
                            />
                        </div>

                        <div className="grid gap-2 relative">
                            <Label htmlFor="order-item-desc">Customer Name</Label>
                            <Input
                                id="order-item-desc"
                                value={customerName}
                                onChange={(e) => {
                                    setCustomerName(e.target.value)
                                    setShowSuggestions(true)
                                }}
                                onFocus={() => setShowSuggestions(true)}
                                placeholder="Search customer..."
                            />
                            {/* Suggestions List */}
                            {showSuggestions && customerList.length > 0 && (
                                <Card className="absolute top-full left-0 right-0 z-10 mt-1 max-h-48 overflow-auto">
                                    <ScrollArea className="h-full">
                                        {customerList.map((item: Customer) => (
                                            <div
                                                key={item.id}
                                                className="p-2 cursor-pointer hover:bg-muted transition-colors"
                                                onClick={() => handleCustomerSelect(item)}
                                            >
                                                {item.name}
                                            </div>
                                        ))}
                                    </ScrollArea>
                                </Card>
                            )}
                        </div>

                        <Separator className="my-2" />

                        <div className="grid gap-2">
                            <Label htmlFor="order-total" className="flex items-center gap-1">
                                <DollarSign className="h-4 w-4" /> Total
                            </Label>
                            <Input
                                type="number"
                                id="order-total"
                                value={total}
                                onChange={(e) => setTotal(Number(e.target.value))}
                                readOnly
                                className="bg-muted/50"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="order-discount" className="flex items-center gap-1">
                                <Percent className="h-4 w-4" /> Discount %
                            </Label>
                            <Input
                                type="number"
                                id="order-discount"
                                value={discount}
                                onChange={(e) => setDiscount(Number(e.target.value))}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="order-full-total">Sub Total</Label>
                            <Input
                                type="number"
                                id="order-full-total"
                                value={subTotal}
                                readOnly
                                className="bg-muted/50 font-medium"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="customer-cash" className="flex items-center gap-1">
                                <CreditCard className="h-4 w-4" /> Cash
                            </Label>
                            <Input
                                type="number"
                                id="customer-cash"
                                value={cash}
                                onChange={(e) => setCash(Number(e.target.value))}
                                required
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="customer-bal">Balance</Label>
                            <Input
                                type="number"
                                id="customer-bal"
                                value={balance}
                                readOnly
                                className={`bg-muted/50 font-medium ${balance < 0 ? "text-red-500" : "text-green-500"}`}
                            />
                        </div>

                        <Button className="w-full mt-4" size="lg" onClick={handleBuy}>
                            Complete Purchase
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Items List Card */}
            <Card className="w-full lg:w-2/3 shadow-md">
                <CardHeader className="bg-primary/5 pb-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <CardTitle className="text-2xl">Order Items</CardTitle>
                        <SearchOrder setSearchTerm={setSearchTerm} handleSearch={handleSearch}>
                            Add Item
                        </SearchOrder>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/50">
                                    <TableHead>Item Code</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Unit Price</TableHead>
                                    <TableHead>Qty</TableHead>
                                    <TableHead>Total Price</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {cartItems.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                                            No items added to the order yet
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    cartItems.map((item: CartItem) => (
                                        <TableRow
                                            key={item.itemCode}
                                            className="cursor-pointer hover:bg-muted/50 transition-colors"
                                            onClick={() => handleItemModify(item)}
                                        >
                                            <TableCell className="font-mono">{item.itemCode}</TableCell>
                                            <TableCell>{item.desc}</TableCell>
                                            <TableCell>${item.unitPrice.toFixed(2)}</TableCell>
                                            <TableCell>{item.qty}</TableCell>
                                            <TableCell className="font-medium">${item.subTotal.toFixed(2)}</TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    <div className="flex justify-end mt-6">
                        <Button variant="default" size="lg" onClick={handleFinish} className="gap-2">
                            <RefreshCw className="h-4 w-4" />
                            Calculate Total
                        </Button>
                    </div>

                    <AddToCart isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} suggestions={suggestions} />
                    <UpdateCart isOpen={isUpdateOpen} onClose={() => setIsUpdateOpen(false)} clickedItem={clickedItem} />
                </CardContent>
            </Card>
        </div>
    )
}

