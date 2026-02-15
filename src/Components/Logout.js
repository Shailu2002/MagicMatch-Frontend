import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const logoutUser = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/logout`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          // YE SABSE ZAROORI HAI: Cookies bhejne ke liye
          credentials: "include",
        });

        // Agar logout success hai (200) ya token expire hai (401)
        // Dono cases mein humein user ko login pe hi bhejna hai
        if (res.status === 200 || res.status === 401) {
          localStorage.clear(); // Local storage clean karo
          console.log("Logged out successfully");
          // Redirect to login
          navigate("/login", { replace: true });
        } else {
          // Koi aur error aaye toh
          const data = await res.json();
          console.log("Logout failed", data);
          navigate("/login");
        }
      } catch (err) {
        console.log("Logout Network Error:", err);
        navigate("/login"); // Kuch bhi galat ho, login pe bhej do
      }
    };

    logoutUser();
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Logging you out...</h1>
      <p>Please wait a moment.</p>
    </div>
  );
};

export default Logout;
