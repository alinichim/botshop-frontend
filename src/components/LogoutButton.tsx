import {useAuth} from "../util/auth.ts";

export const LogoutButton = () => {
    const authContext = useAuth()
    return (
        <button onClick={authContext.handleLogout}>Logout</button>
    )
}