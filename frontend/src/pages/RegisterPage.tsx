import { useNavigate } from "react-router";
import { api } from "../api";
import type { Response } from "../types";
import { useState } from "react";
import AuthForm from "../components/AuthForm";
import type { AxiosError } from "axios";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");
  const handleRegister = async (email: string, password: string) => {
    try {
      const response = await api.post<Response>("/auth/register", {
        email,
        password,
      });
      if (response.data.success) {
        navigate("/");
      }
    } catch (err) {
      const error = err as AxiosError<Response>;
      const serverMessage = error.response?.data.message;
      setErrorMessage(serverMessage || "תקלה פנימית");
    }
  };
  return (
    <>
      <h1>טופס הרשמה לאתר</h1>
      <AuthForm textButton="הירשם" onSubmit={handleRegister} />
      {errorMessage && <h3>{errorMessage}</h3>}
    </>
  );
};

export default RegisterPage;
