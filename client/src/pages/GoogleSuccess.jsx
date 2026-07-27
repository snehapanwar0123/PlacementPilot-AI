import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function GoogleSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setUser } = useAuth();

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      navigate("/");
      return;
    }

    localStorage.setItem("token", token);

    const fetchUser = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }

        const user = await response.json();

        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);

        navigate("/dashboard", { replace: true });
      } catch (error) {
        console.error(error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/", { replace: true });
      }
    };

    fetchUser();
  }, [navigate, searchParams, setUser]);

  return (
    <div className="flex h-screen items-center justify-center">
      <h2 className="text-lg font-semibold">Signing you in with Google...</h2>
    </div>
  );
}