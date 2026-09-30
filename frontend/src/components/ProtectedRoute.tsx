import { useEffect, useState, type ReactNode } from "react";
import { api } from "../api";
import type { Response } from "../types";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const [hasToken, setHasToken] = useState<boolean | null>(null);
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await api.get<Response>("/auth/me");
        if (response.data.success) {
          setHasToken(true);
        } else {
          setHasToken(false);
        }
      } catch (err) {
        setHasToken(false);
        console.log(err);
      }
    };
    fetch();
  }, []);
  if (hasToken === null) {
    return <p>טוען...</p>;
  }
  if (!hasToken) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
