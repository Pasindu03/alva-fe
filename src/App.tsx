import './App.css';
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import { Home } from "./pages/Home.tsx";
import { RootLayout } from "./components/RootLayout.tsx";
import { CustomerDash } from "./pages/CustomerDash.tsx";
import { ItemDash } from "./pages/ItemDash.tsx";
import { OrdersDash } from "./pages/OrdersDash.tsx";
import { OrderDetailsDash } from "./pages/OrderDetailsDash.tsx";
import { Login } from "./pages/Login.tsx";
import { useSelector } from "react-redux";
import {ErrorBoundary} from "./error-text/error-boundry.tsx";

function App() {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

    const routes = createBrowserRouter([
        {
            path: "/",
            element: <Navigate to="/login" />, // Redirect to login by default
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/home",
            element: isAuthenticated ? <RootLayout /> : <Navigate to="/login" />,
            children: [
                { path: '', element: <Home /> }, // Default child route for Home
                { path: 'customer', element: <CustomerDash /> },
                { path: 'items', element: <ItemDash /> },
                { path: 'orders', element: <OrdersDash /> },
                { path: 'orderdetail', element: <OrderDetailsDash /> },
            ],
        },
    ]);

    return (
        <>
            <ErrorBoundary>
                <RouterProvider router={routes} />
            </ErrorBoundary>
        </>
    );
}

export default App;