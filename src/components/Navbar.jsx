import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { AuthContext } from "../contexts/AuthContext";

export default function Navbar() {
  const { user } = useContext(AuthContext) || {};
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav style={{ padding: "0.6rem 1rem", background: "#6790adff", display: "flex", justifyContent: "space-between"}}>
      {/* <div><Link to="/dashboard">StudySync</Link></div> */}
      <div>
        <Link 
          to="/dashboard" 
          style={{
           fontSize: "24px",
           fontWeight: "bold",
           color: "white",
           textDecoration: "none"
        }}
       > 
           StudySync
        </Link>
       </div>
      <div>
        {user ? (
          <>
            <span style={{ marginRight: 10 }}>{user.displayName || user.email}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            {/* <Link to="/login" style={{ marginRight: 8 }}>Login</Link>
            <Link to="/register">Register</Link> */}
          </>
        )}
      </div>
    </nav>
  );
}