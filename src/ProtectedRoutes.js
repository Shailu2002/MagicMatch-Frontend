import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // Agar token nahi hai, toh login pe bhej do
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Agar token hai, toh jo page maanga hai wo dikhao
  return children;
};

export default ProtectedRoute;