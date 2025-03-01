"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import type { Appdispatch } from "../store/store.ts"
import { loginUser, registerUser } from "../reducer/UserSlice.ts"
import type { User } from "../models/User.ts"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "../components/ui/alert"

export function Login() {
    const dispatch = useDispatch<Appdispatch>()
    const navigate = useNavigate()
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated)

    const [registerUsername, setRegisterUsername] = useState("")
    const [registerPassword, setRegisterPassword] = useState("")
    const [loginUsername, setLoginUsername] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const [activeTab, setActiveTab] = useState("login")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    const handleRegister = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            const user: User = { username: registerUsername, password: registerPassword }
            // Wait for the registration to complete before navigating
            await dispatch(registerUser(user)).unwrap()
            setSuccess("Registration successful! You can now log in.")
            setActiveTab("login")
            setRegisterUsername("")
            setRegisterPassword("")
        } catch (err) {
            setError(err?.message || "Registration failed. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            const user: User = { username: loginUsername, password: loginPassword }
            await dispatch(loginUser(user)).unwrap()
            // Navigation will happen in the useEffect when isAuthenticated changes
        } catch (err) {
            setError(err?.message || "Login failed. Please check your credentials.")
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/home")
        }
    }, [isAuthenticated, navigate])

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-muted p-4">
            <Card className="w-full max-w-md overflow-hidden border-none shadow-xl">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="login">Login</TabsTrigger>
                        <TabsTrigger value="register">Register</TabsTrigger>
                    </TabsList>

                    <TabsContent value="login" className="space-y-4 p-1">
                        <CardHeader>
                            <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
                            <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
                        </CardHeader>

                        <CardContent>
                            <form onSubmit={handleLogin} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="login-username">Username</Label>
                                    <Input
                                        id="login-username"
                                        type="text"
                                        placeholder="Enter your username"
                                        value={loginUsername}
                                        onChange={(e) => setLoginUsername(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="login-password">Password</Label>
                                    <Input
                                        id="login-password"
                                        type="password"
                                        placeholder="Enter your password"
                                        value={loginPassword}
                                        onChange={(e) => setLoginPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                {error && (
                                    <Alert variant="destructive">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertDescription>{error}</AlertDescription>
                                    </Alert>
                                )}

                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Logging in...
                                        </>
                                    ) : (
                                        "Login"
                                    )}
                                </Button>
                            </form>
                        </CardContent>

                        <CardFooter className="flex flex-col">
                            <p className="text-sm text-muted-foreground text-center">
                                Don't have an account?{" "}
                                <button
                                    type="button"
                                    className="text-primary underline-offset-4 hover:underline"
                                    onClick={() => setActiveTab("register")}
                                >
                                    Sign up
                                </button>
                            </p>
                        </CardFooter>
                    </TabsContent>

                    <TabsContent value="register" className="space-y-4 p-1">
                        <CardHeader>
                            <CardTitle className="text-2xl text-center">Create Account</CardTitle>
                            <CardDescription className="text-center">Register to get started with our application</CardDescription>
                        </CardHeader>

                        <CardContent>
                            <form onSubmit={handleRegister} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="register-username">Username</Label>
                                    <Input
                                        id="register-username"
                                        type="text"
                                        placeholder="Choose a username"
                                        value={registerUsername}
                                        onChange={(e) => setRegisterUsername(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="register-password">Password</Label>
                                    <Input
                                        id="register-password"
                                        type="password"
                                        placeholder="Choose a password"
                                        value={registerPassword}
                                        onChange={(e) => setRegisterPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                {error && (
                                    <Alert variant="destructive">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertDescription>{error}</AlertDescription>
                                    </Alert>
                                )}

                                {success && (
                                    <Alert variant="success" className="bg-green-50 text-green-800 border-green-200">
                                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                                        <AlertDescription className="text-green-700">{success}</AlertDescription>
                                    </Alert>
                                )}

                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Registering...
                                        </>
                                    ) : (
                                        "Register"
                                    )}
                                </Button>
                            </form>
                        </CardContent>

                        <CardFooter className="flex flex-col">
                            <p className="text-sm text-muted-foreground text-center">
                                Already have an account?{" "}
                                <button
                                    type="button"
                                    className="text-primary underline-offset-4 hover:underline"
                                    onClick={() => setActiveTab("login")}
                                >
                                    Log in
                                </button>
                            </p>
                        </CardFooter>
                    </TabsContent>
                </Tabs>
            </Card>
        </div>
    )
}

