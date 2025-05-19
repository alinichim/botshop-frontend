import {PropsWithChildren, useState} from "react";
import axios, {HttpStatusCode} from "axios";
import {BOTSHOP_SERVER_URL} from "../constants.ts";
import {jwtDecode} from "jwt-decode";
import {AuthContext, User} from "../util/auth.ts";

type AuthProviderProps = PropsWithChildren;

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [authToken, setAuthToken] = useState<string | null>();
    const [currentUser, setCurrentUser] = useState<User | null>();

    const handleLogin = async (email: string, password: string) => {
        try {
            const response = await axios.post(BOTSHOP_SERVER_URL + '/auth/login', {
                email: email,
                password: password,
            })
            if (response.status === HttpStatusCode.Ok) {
                console.log('Login successful');
            } else {
                console.log('Login failed');
                return
            }
            const token = response.headers['authorization']
            const user = jwtDecode<User>(token);
            setCurrentUser({...user})
            setAuthToken(token)
        } catch (error) {
            setAuthToken(null)
            setCurrentUser(null)
            console.log(error)
            return
        }
    }

    const handleLogout = async () => {
        setCurrentUser(null);
        setAuthToken(null);
    }

    return <AuthContext.Provider
        value={{
            authToken: authToken,
            currentUser: currentUser,
            handleLogin: handleLogin,
            handleLogout: handleLogout,
        }}>{children}</AuthContext.Provider>
}
