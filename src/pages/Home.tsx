"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { Appdispatch } from "../store/store.tsx"
import { getAllCustomer } from "../reducer/CustomerSlice.ts"
import { getAllItem } from "../reducer/ItemSlice.ts"
import { getAllOrders } from "../reducer/OrderSlice.ts"
import { Users, Package, AlertTriangle, ShoppingCart, TrendingUp, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button.tsx"

export function Home() {
    const customers = useSelector((state) => state.customer.customers)
    const items = useSelector((state) => state.item.items)
    const orders = useSelector((state) => state.orders.orders)
    const dispatch = useDispatch<Appdispatch>()

    useEffect(() => {
        dispatch(getAllCustomer())
        dispatch(getAllItem())
        dispatch(getAllOrders())
    }, [dispatch])

    function outOfStock() {
        return items.filter((item) => item.qto === 0).length
    }

    const stats = [
        {
            title: "Total Customers",
            value: customers.length || 120,
            icon: Users,
            trend: "+12.5%",
            description: "Active customers this month",
            color: "from-blue-500 to-blue-600",
        },
        {
            title: "Items in Stock",
            value: items.length || 340,
            icon: Package,
            trend: "+5.2%",
            description: "Products available",
            color: "from-green-500 to-green-600",
        },
        {
            title: "Out of Stock",
            value: outOfStock() || 5,
            icon: AlertTriangle,
            trend: "-2.3%",
            description: "Items need restock",
            color: "from-red-500 to-red-600",
        },
        {
            title: "Total Sales",
            value: orders.length || 78,
            icon: ShoppingCart,
            trend: "+18.7%",
            description: "Orders this month",
            color: "from-purple-500 to-purple-600",
        },
    ]

    return (
        <section className="p-6 min-h-screen bg-background">
            <div className="container mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight">Welcome to Alva Dashboard</h1>
                    <p className="text-muted-foreground">Monitor your business metrics at a glance.</p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <Card key={index} className="relative overflow-hidden transition-all hover:shadow-lg">
                            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                                <div className={`p-2 rounded-full bg-gradient-to-br ${stat.color}`}>
                                    <stat.icon className="w-4 h-4 text-white" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <p className="text-xs text-muted-foreground">{stat.description}</p>
                                <div className="flex items-center mt-2 text-sm">
                                    <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
                                    <span className="text-green-500">{stat.trend}</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Instructions Section */}
                <Card className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 pointer-events-none" />
                    <CardHeader>
                        <CardTitle>Quick Instructions</CardTitle>
                        <CardDescription>Here's what you can do on this dashboard</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Feature Cards */}
                        <div className="grid gap-6 md:grid-cols-2">
                            {[
                                {
                                    title: "Manage Orders",
                                    description: "Create new orders and track existing ones efficiently",
                                },
                                {
                                    title: "Customer Management",
                                    description: "View and manage customer information and history",
                                },
                                {
                                    title: "Inventory Control",
                                    description: "Monitor stock levels and receive low stock alerts",
                                },
                                {
                                    title: "Sales Analytics",
                                    description: "Track your business performance with detailed insights",
                                },
                            ].map((feature, index) => (
                                <Card key={index} className="group relative overflow-hidden">
                                    <CardHeader>
                                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                                        <CardDescription>{feature.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Button variant="ghost" className="group-hover:translate-x-2 transition-transform">
                                            Learn more
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Security Note */}
                        <Card className="bg-warning/10 border-warning/20">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-medium text-warning">Security Note</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-warning">
                                    For security purposes, please ensure you log out after completing your session.
                                </p>
                            </CardContent>
                        </Card>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}

