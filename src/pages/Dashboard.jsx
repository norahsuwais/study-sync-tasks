import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div style={{ maxWidth: 900, margin: "2rem auto", padding: 16 }}>
      <h1>Dashboard</h1>
      <p>Welcome, {user?.displayName || user?.email}</p>
      <p>This is where task lists and courses will appear.</p>
    </div>
  );
}
