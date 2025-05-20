import {useAuth} from "../util/auth.ts";
import {useNavigate} from "react-router";
import {useEffect} from "react";
import {ProductType, useCart} from "../util/cart.ts";
import axios from "axios";
import {BOTSHOP_SERVER_URL} from "../constants.ts";

export const CheckoutPage = () => {
    const authContext = useAuth();
    const { cartItems, removeFromCart, clearCart } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        if (!authContext.loading && !authContext.authToken) {
            navigate('/login');
            return
        }
    }, [authContext.authToken, authContext.loading, navigate]);

    const total = cartItems.reduce((sum: number, item: ProductType) => sum + item.price * item.quantity, 0);

    const sendTotalOrder = async () => {
        try {
            const response = await axios.post(BOTSHOP_SERVER_URL + '/order/total', {
                userEmail: authContext.currentUser?.email,
                orders: cartItems.map<{productId: number, quantity: number}>((item) => ({productId: Number(item.id), quantity: item.quantity})),
            }, {
                headers: {
                    Authorization: `${authContext.authToken}`,
                },
            })
            if (response.status === 200) {
                alert("Order successfully sent");
            }
            clearCart()
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <h2>Cart</h2>
            {cartItems.length === 0 && <p>Your cart is empty.</p>}
            {cartItems.map((item: ProductType) => (
                <div key={item.id}>
                    {item.name} — ${item.price} × {item.quantity}
                    <button onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
            ))}
            <p>Total: ${total.toFixed(2)}</p>
            <button onClick={clearCart}>Clear Cart</button>
            <button onClick={() => sendTotalOrder()}>Send Order</button>
        </div>
    );
}