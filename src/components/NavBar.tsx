import { Link } from "react-router-dom";
import {useAuth} from "../util/auth.ts";
import {useCart} from "../util/cart.ts";

const NavBar = () => {
    const { currentUser, handleLogout } = useAuth();
    const { cartItems } = useCart();

    return (
        <nav style={{
            background: "#333",
            color: "#fff",
            padding: "10px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
        }}>
            <div style={{ display: "flex", gap: "15px" }}>
                <Link to="/home" style={{ color: "white", textDecoration: "none" }}>Home</Link>
                <Link to="/checkout" style={{ color: "white", textDecoration: "none" }}>
                    Cart ({cartItems.length})
                </Link>
            </div>

            <div>
                {currentUser ? (
                    <>
            <span style={{ marginRight: "10px" }}>
              Logged in as {currentUser.email} ({currentUser.role})
            </span>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={{ color: "white", marginRight: "10px" }}>Login</Link>
                        <Link to="/register" style={{ color: "white" }}>Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default NavBar;
