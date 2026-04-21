import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/config";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState(null);
  const [err, setErr] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(null);
    try {
      await sendPasswordResetEmail(auth, email);
      setMsg("Password reset email sent. Check your inbox.");
    } catch (error) {
      setErr(error.message);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "2rem auto", padding: 16 }}>
      <h1 className="site-title">Study Sync</h1>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input required type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <button type="submit" style={{ marginTop: 10 }}>Send reset email</button>
      </form>
      {msg && <p style={{color:"green"}}>{msg}</p>}
      {err && <p style={{color:"red"}}>{err}</p>}
      <p><Link to="/login">Back to login</Link></p>
    </div>
  );
}
