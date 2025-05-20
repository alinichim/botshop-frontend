import axios from "axios";
import {BOTSHOP_SERVER_URL} from "../constants.ts";
import {Product} from "./Product.tsx";
import {useEffect, useState} from "react";
import {useAuth} from "../util/auth.ts";
import {AdminAddProduct} from "./AdminAddProduct.tsx";

type ProductType = {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
}

export const ProductList = () => {
    const [products, setProducts] = useState<Array<ProductType>>([])
    const [currentPage, setCurrentPage] = useState(0);
    const authContext = useAuth();

    useEffect(() => {
        const fetchProducts = async (page = 0, size = 10) => {
            try {
                const response = await axios.get(BOTSHOP_SERVER_URL + '/product', {
                    params: {
                        page,
                        size,
                    },
                    headers: {
                        Authorization: `${authContext.authToken}`,
                    },
                })
                setProducts(response.data.content)
            } catch (e) {
                console.log(e)
            }
        }
        if (authContext.currentUser) {
            fetchProducts(currentPage)
        }
    }, [authContext.authToken, authContext.currentUser, currentPage])

    return (
        <div>
            {authContext.currentUser?.role === "ADMIN" && <AdminAddProduct />}
            <input value={currentPage} type={"number"} onChange={(e) => setCurrentPage(Number(e.target.value))}/>
            {products.map((product) => (<Product key={product.id} {...product} />))}
        </div>
    )
}