import {useAuth} from "../util/auth.ts";
import {useNavigate} from "react-router";
import {useEffect} from "react";

function HomePage() {
    const authContext = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!authContext.currentUser) {
            navigate('/login');
            return
        }
    }, [authContext.currentUser, navigate]);

    return (
        <>
            <p>Hello, {authContext.currentUser?.name}! This is your email: {authContext.currentUser?.email}</p>
        </>
    )
}

export default HomePage