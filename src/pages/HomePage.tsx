import {useAuth} from "../util/auth.ts";
import {useNavigate} from "react-router";
import {useEffect} from "react";
import {ProductList} from "../components/ProductList.tsx";

function HomePage() {
    const authContext = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!authContext.loading && !authContext.currentUser) {
            navigate('/login');
            return
        }
    }, [authContext.currentUser, authContext.loading, navigate]);

    if (authContext.loading) return <p>Loading...</p>;

    return (
        <>
            <ProductList />
        </>
    )
}

export default HomePage