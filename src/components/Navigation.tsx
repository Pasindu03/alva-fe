"use client"

import { Link } from "react-router-dom"
import { Menu, X, Home, Users, Package, ShoppingCart, PlusCircle } from 'lucide-react'
import { useState } from "react"
import "../assets/Navigation.css"

export function Navigation() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    return (
        <header className="bg-gradient-to-r from-slate-800 to-slate-900 shadow-xl">
            <nav className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="custom-link !p-0 !m-0 relative group"
                    >
                        <span className="text-2xl font-bold">
                            Alva
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center">
                        <Link className="custom-link nav-item" to="/">
                            <Home className="w-4 h-4 mr-2" />
                            Home
                        </Link>
                        <Link className="custom-link nav-item" to="customer">
                            <Users className="w-4 h-4 mr-2" />
                            Customer
                        </Link>
                        <Link className="custom-link nav-item" to="items">
                            <Package className="w-4 h-4 mr-2" />
                            Item
                        </Link>
                        <Link className="custom-link nav-item" to="orders">
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Orders
                        </Link>

                        {/* New Order Button */}
                        <Link
                            to="orderdetail"
                            className="custom-link !ml-6 !bg-primary hover:!bg-primary/90 !no-underline flex items-center gap-2 shadow-lg hover:shadow-primary/20 hover:scale-105 transition-all"
                        >
                            <PlusCircle className="w-4 h-4" />
                            New Order
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden custom-link !p-2 !m-0"
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="md:hidden py-4 animate-fade-in">
                        <div className="flex flex-col">
                            <Link
                                className="custom-link mobile-nav-item"
                                to="/"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <Home className="w-4 h-4 mr-2" />
                                Home
                            </Link>
                            <Link
                                className="custom-link mobile-nav-item"
                                to="customer"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <Users className="w-4 h-4 mr-2" />
                                Customer
                            </Link>
                            <Link
                                className="custom-link mobile-nav-item"
                                to="items"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <Package className="w-4 h-4 mr-2" />
                                Item
                            </Link>
                            <Link
                                className="custom-link mobile-nav-item"
                                to="orders"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <ShoppingCart className="w-4 h-4 mr-2" />
                                Orders
                            </Link>

                            {/* Mobile New Order Button */}
                            <Link
                                to="orderdetail"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="custom-link !mt-4 !bg-primary hover:!bg-primary/90 !no-underline flex items-center justify-center"
                            >
                                <PlusCircle className="w-4 h-4 mr-2" />
                                New Order
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    )
}
