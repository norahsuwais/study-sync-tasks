import React, { useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { useNavigate, Link } from "react-router-dom";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import "./Auth.css";

export default function Register() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);

      // update displayName in Firebase Auth
      await updateProfile(cred.user, { displayName });

      // send verification email
      await sendEmailVerification(cred.user);

      // optional: create user profile in Firestore
      await setDoc(doc(db, "users", cred.user.uid), {
        uid: cred.user.uid,
        email: cred.user.email,
        displayName,
        createdAt: serverTimestamp()
      });

      alert("Account created. Verification email sent...please verify your email.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h1 className="site-title">Study Sync</h1>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="input-wrapper">
          <input 
            required 
            placeholder="Display name" 
            value={displayName} 
            onChange={e => setDisplayName(e.target.value)} 
          />
        </div>
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
            placeholder="Password (6+ chars)" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
          />
        </div>
        <button type="submit">Create account</button>
      </form>
      {error && <p className="error">{error}</p>}
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  
      

    // <div style={{ maxWidth: 420, margin: "2rem auto", padding: 16 }}>
    //   <h2>Register</h2>
    //   <form onSubmit={handleSubmit}>
    //     <input required placeholder="Display name" value={displayName} onChange={e=>setDisplayName(e.target.value)} />
    //     <input required type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
    //     <input required type="password" placeholder="Password (6+ chars)" value={password} onChange={e=>setPassword(e.target.value)} />
    //     <button type="submit" style={{ marginTop: 8 }}>Create account</button>
    //   </form>
    //   {error && <p style={{color:"red"}}>{error}</p>}
    //   <p>Already have an account? <Link to="/login">Login</Link></p>
    // </div>
  );
}