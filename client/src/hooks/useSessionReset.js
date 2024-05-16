export const useSessionReset = () => {
    const resetSession = () => {
        const user = localStorage.getItem("user");
        if (user) {
            alert("Your session has expired. Please login again.");
            localStorage.removeItem("user");
            localStorage.removeItem("accessToken");
        }
        if (user.role == "admin") {
            window.location.href = "/AdminLogin";
        } else {
            window.location.href = "/DonorLogin";
        }
    };
    return { resetSession };
}   