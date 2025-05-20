import {useAuth} from "../util/auth.ts";
import {useCart} from "../util/cart.ts";
import {useState} from "react";
import EditProductModal from "./EditProductModal.tsx";
import axios from "axios";

type ProductProps = {
    id: string,
    name: string,
    description: string,
    price: number,
    quantity: number,
}

export const Product = (props: ProductProps) => {
    const authContext = useAuth();
    const cartContext = useCart();
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const handleDelete = async () => {
        await axios.delete(`http://localhost:8080/product/${props.id}`, {
            headers: { Authorization: `${authContext.authToken}` },
        });
        alert("Deleted");
    };

    return (
        <div style={{ backgroundColor: 'grey', margin: '10px' }}>
            <div>{props.id}</div>
            <div>{props.name}</div>
            <div>{props.description}</div>
            <div>{props.price}</div>
            <button onClick={() => cartContext?.addToCart?.({...props})}>Add to cart</button>
            {authContext.currentUser?.role === "ADMIN" && (
                <>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    <button onClick={() => handleDelete()}>Delete</button>
                </>
            )}
            {isEditing && (<EditProductModal
                product={{...props}}
                onClose={() => setIsEditing(false)}
                onUpdated={() => window.location.reload()} // or refresh list from parent
            />)}
        </div>
    )
}