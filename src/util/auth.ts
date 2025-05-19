import {createContext, useContext} from "react";

export type User = {
    name: string;
    email: string;
    role: string;
}

type AuthContext = {
    authToken?: string | null;
    currentUser?: User | null;
    handleLogin: (email: string, password: string) => Promise<void>;
    handleLogout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContext | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext)

    if (context === undefined) {
        throw new Error('useAuth must be used within the AuthProvider');
    }

    return context;
};