import {useState, useEffect, PropsWithChildren} from "react";
import {ProductType, CartContext} from "../util/cart.ts";

export const CartProvider = ({ children }: PropsWithChildren) => {
    const [cartItems, setCartItems] = useState((() => {
        const saved = localStorage.getItem("cart");
        return saved ? JSON.parse(saved) : [];
    })());

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product: { id: string, name: string, price: number }) => {
        const newCartItems = [...cartItems];
        for (let i = 0; i < newCartItems.length; i++) {
            if (newCartItems[i].id === product.id) {
                newCartItems[i].quantity++
                console.log(newCartItems);
                setCartItems(newCartItems);
                localStorage.setItem("cart", JSON.stringify(newCartItems));
                return;
            }
        }
        newCartItems.push({...product, quantity: 1});
        setCartItems(newCartItems);
    };

    const removeFromCart = (id: string) => {
        const newCartItems = cartItems.filter((item: ProductType) => item.id !== id);
        setCartItems(newCartItems);
        localStorage.setItem("cart", JSON.stringify(newCartItems));
    };

    const clearCart = () => {
        setCartItems([])
        localStorage.setItem("cart", JSON.stringify([]))
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
