import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

const BASE_URL = "https://hearthand.onrender.com/api/v1";

export const useSignUp = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (username, email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(BASE_URL + "/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.message);
      setIsLoading(false);
      return;
    }

    if (response.ok) {
      // save token to local storage
      localStorage.setItem("accessToken", json.accessToken);
      localStorage.setItem("user", JSON.stringify(json.user));

      // save user to context
      dispatch({ type: "LOGIN", payload: json.user });

      setIsLoading(false);

      // Redirect user to dashboard
      window.location.href = "/homeTest";
    }
  };

  return { signup, error, isLoading };
};
