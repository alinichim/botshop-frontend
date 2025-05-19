import React, {useState} from 'react';
import { useAuth } from '../util/auth.ts';
import {useNavigate} from "react-router";

interface ValidationError {
    email?: string,
    password?: string,
}

export const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validationErrors, setValidationErrors] = useState<ValidationError>({});
    const {handleLogin} = {...useAuth()}
    const navigate = useNavigate();


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newErrors: ValidationError = {}

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

        await handleLogin(email, password)

        navigate("/home");
    };

    return (
        <form onSubmit={handleSubmit}>
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

            <button type="submit">Login</button>
        </form>
    );
};