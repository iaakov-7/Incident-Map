import { useNavigate } from "react-router";
import { api } from "../api";
import AuthForm from "../components/AuthForm";
import type { Response } from "../types";
import { useState } from "react";
import type { AxiosError } from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");
  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await api.post<Response>("/auth/login", {
        email,
        password,
      });
      if (response.data.success) {
        navigate("/");
        setErrorMessage(response.data.message);
      }
    } catch (err) {
      const error = err as AxiosError<Response>;
      const serverMessage = error.response?.data?.message;
      setErrorMessage(serverMessage || "תקלה פנימית");
    }
  };
  return (
    <>
      <h1>התחברות לאתר</h1>
      <AuthForm textButton="התחבר" onSubmit={handleLogin} />
      {errorMessage && <h3>{errorMessage}</h3>}
      <button onClick={() => navigate("/register")}>
        אם עוד לא נרשמת לאתר שלנו עבור לעמוד ההרשמה
      </button>
    </>
  );
};

export default LoginPage;
