import React, {useState} from "react";
import axios from "axios";
import {BOTSHOP_SERVER_URL} from "../constants.ts";
import {useAuth} from "../util/auth.ts";

type ValidationError = {
    name?: string,
    description?: string,
    price?: string,
    quantity?: string,
}

export const AdminAddProduct = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const error: ValidationError = {}
    const [validationErrors, setValidationErrors] = useState(error);
    const authContext = useAuth();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newErrors: ValidationError = {}

        if (name === '') {
            newErrors.name = 'Name is required';
        }
        if (description === '') {
            newErrors.description = "Description is required";
        }
        setValidationErrors(newErrors)
        if (newErrors.name || newErrors.description) {
            return;
        }

        try {
            const response = await axios.post(BOTSHOP_SERVER_URL + '/product', {
                name: name,
                description: description,
                price: price,
                quantity: quantity,
            }, {
                headers: {
                    Authorization: `${authContext.authToken}`,
                },
            })
            if (response.status === 201) {
                console.log('Product added successfully');
            } else {
                console.log('Failed to save product');
                return
            }
        } catch (error) {
            console.log(error)
            return
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {validationErrors.name && <p style={{ color: 'red' }}>{validationErrors.name}</p>}
            </div>

            <div>
                <label>Description:</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                {validationErrors.description && <p style={{ color: 'red' }}>{validationErrors.description}</p>}
            </div>

            <div>
                <label>Price:</label>
                <input
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(parseFloat(e.target.value))}
                />
            </div>

            <div>
                <label>Quantity:</label>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                />
            </div>

            <button type="submit">Add Product</button>
        </form>
    );
}