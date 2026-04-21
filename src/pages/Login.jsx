import React, { useState } from "react";
import { signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);

      //if email not verified, optionally resend and show message
      if (!cred.user.emailVerified) {
        const resend = window.confirm("Please verify your email. Resend verification email?");
        if (resend) {
          await sendEmailVerification(cred.user);
          alert("Verification email resent. Check your inbox.");
        }
        // sign out to prevent access until verified, or allow limited access
        // await signOut(auth); // optional
      }

      // NEW CODE 
      

    
      navigate("/course/Default"); // safe now
    
    } catch (err) {
      //console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h1 className="site-title">Study Sync</h1>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="input-wrapper">
          <input 
            required 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
          />
        </div>
        <div className="input-wrapper">
          <input 
            required 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p className="error">{error}</p>}
      <p>Forgot password? <Link to="/forgot">Click here</Link></p>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </div>

    // <div className="auth-container">
    //   <h2>Login</h2>
    //   <form onSubmit={handleSubmit}>
    //     <input required type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
    //     <input required type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
    //     <button type="submit">Login</button>
    //   </form>
    //   {error && <p className="error">{error}</p>}
    //   <p><Link to="/forgot">Forgot password?</Link></p>
    //   <p>Don't have account? <Link to="/register">Register</Link></p>
    // </div>
    // <div 
    // style={{ maxWidth: 420, margin: "2rem auto", padding: 16 }}>
    //   <h2>Login</h2>
    //   <form onSubmit={handleSubmit}>
    //     <input required type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
    //     <input required type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
    //     <button type="submit" style={{ marginTop: 8 }}>Login</button>
    //   </form>
    //   {error && <p style={{color:"red"}}>{error}</p>}
    //   <p><Link to="/forgot">Forgot password?</Link></p>
    //   <p>Don't have account? <Link to="/register">Register</Link></p>
    // </div>

  );
}