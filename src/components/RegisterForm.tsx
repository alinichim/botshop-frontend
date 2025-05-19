import React, { useState } from 'react';
import axios from 'axios';
import {BOTSHOP_SERVER_URL} from "../constants.ts";

interface ValidationError {
    name?: string,
    email?: string,
    password?: string,
}

export const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const error: ValidationError = {}
    const [validationErrors, setValidationErrors] = useState(error);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newErrors: ValidationError = {}

        if (name === '') {
            newErrors.name = 'Name is required';
        }
        if (email === '') {
            newErrors.email = "Invalid email address"
        }
        if (password === '') {
            newErrors.password = "Invalid password"
        }
        setValidationErrors(newErrors)
        if (newErrors.email || newErrors.password) {
            return;
        }

        try {
            const response = await axios.post(BOTSHOP_SERVER_URL + '/auth/register', {
                name: name,
                email: email,
                password: password,
            })
            if (response.status === 201) {
                console.log('Registration successful');
            } else {
                console.log('Registration failed');
                return
            }
        } catch (error) {
            console.log(error)
            return
        }

        alert('Registration successful!');
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
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {validationErrors.email && <p style={{ color: 'red' }}>{validationErrors.email}</p>}
            </div>

            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {validationErrors.password && <p style={{ color: 'red' }}>{validationErrors.password}</p>}
            </div>

            <button type="submit">Register</button>
        </form>
    );
};
