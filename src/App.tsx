import './App.css'
import {Route, Routes} from "react-router";
import {AuthPage} from "./pages/AuthPage.tsx";
import {RegisterForm} from "./components/RegisterForm.tsx";
import {LoginForm} from "./components/LoginFrom.tsx";
import HomePage from "./pages/HomePage.tsx";
import {CheckoutPage} from "./pages/CheckoutPage.tsx";
import NavBar from "./components/NavBar.tsx";

function App() {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="home" element={<HomePage />} />
                <Route element={<AuthPage />}>
                    <Route path="login" element={<LoginForm />} />
                    <Route path="register" element={<RegisterForm />} />
                </Route>
                <Route path="checkout" element={<CheckoutPage />} />
            </Routes>
        </>
    )
}

export default App
