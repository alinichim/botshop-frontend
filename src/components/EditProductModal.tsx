import React, { useState } from "react";
import axios from "axios";
import {useAuth} from "../util/auth.ts";

type Props = {
    product: { id: string; name: string; description: string; price: number; quantity: number };
    onClose: () => void;
    onUpdated: () => void;
};

const EditProductModal = ({ product, onClose, onUpdated }: Props) => {
    const { authToken } = useAuth();
    const [name, setName] = useState(product.name);
    const [description, setDescription] = useState(product.description);
    const [price, setPrice] = useState(product.price);
    const [quantity, setQuantity] = useState(product.quantity);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payload = {
                name: name,
                description: description,
                price: price,
                quantity: quantity,
            }
            await axios.put(`http://localhost:8080/product/${product.id}`, payload, {
                headers: { Authorization: `${authToken}` },
            });
            onUpdated();
            onClose();
        } catch (error) {
            console.error("Failed to update product", error);
            alert("Update failed.");
        }
    };

    return (
        <div style={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center"
        }}>
            <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px" }}>
                <h3>Edit Product</h3>
                <form onSubmit={handleSubmit}>
                    <input value={name} onChange={(e) => setName(e.target.value)} />
                    <input value={description} onChange={(e) => setDescription(e.target.value)} />
                    <input type="number" value={price} step={0.01} onChange={(e) => setPrice(Number(e.target.value))} />
                    <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
                    <div style={{ marginTop: "10px" }}>
                        <button type="submit">Save</button>
                        <button type="button" onClick={onClose} style={{ marginLeft: "10px" }}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProductModal;
