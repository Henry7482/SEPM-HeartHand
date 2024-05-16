import { useAuthContext } from './useAuthContext';

const BASE_URL = "https://hearthand.onrender.com/api/v1";

export const useLogout= () => {
    const { dispatch } = useAuthContext();
    const logout = async () => {
        // remove user from storage
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");

        // clear the refresh token
        try {
            await fetch(BASE_URL +"/users/logout", {
                method: "POST",
                credentials: "include",
            });
        } catch (error) {
            console.error("Error:", error);
        }

        // dispatch logout action
        dispatch({ type: "LOGOUT" });
    }
    return { logout };
}