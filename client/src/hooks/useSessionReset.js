export const useSessionReset = () => {
    const resetSession = () => {
        const user = JSON.parse(localStorage.getItem("user"));
        let role;
        if (user) {
            role = user.role;
            alert("Your session has expired. Please login again.");
            localStorage.removeItem("user");
            localStorage.removeItem("accessToken");
        }
        if (role === "admin") {
            window.location.href = "/AdminLogin";
        } else {
            window.location.href = "/DonorLogin";
        }
    };
    return { resetSession };
}