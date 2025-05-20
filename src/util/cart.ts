import {createContext, useContext} from "react";

export type ProductType = {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

type CartContext = {
    cartItems: ProductType[];
    addToCart: (product: { id: string, name: string, price: number }) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
}

export const CartContext = createContext<CartContext | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);

    if (context === undefined) {
        throw new Error("useCart must be used within cart context provider");
    }

    return context;
}
