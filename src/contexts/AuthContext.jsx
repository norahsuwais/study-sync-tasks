// import React, { createContext, useEffect, useState } from "react";
// import { auth } from "../firebase/config";
// import { onAuthStateChanged } from "firebase/auth";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);      // firebase user or null
//   const [loading, setLoading] = useState(true); // while checking auth state

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (u) => {
//       setUser(u);
//       setLoading(false);
//     });
//     return () => unsubscribe();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, loading }}>
//       { !loading && children }
//     </AuthContext.Provider>
//   );
// };

// New code:

import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}