// // import logo from './logo.svg';
// // import './App.css';

// // function App() {
// //   return (
// //     <div className="App">
// //       <header className="App-header">
// //         <img src={logo} className="App-logo" alt="logo" />
// //         <p>
// //           Edit <code>src/App.js</code> and save to reload.
// //         </p>
// //         <a
// //           className="App-link"
// //           href="https://reactjs.org"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           Learn React
// //         </a>
// //       </header>
// //     </div>
// //   );
// // }

// // export default App;

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import CourseView from "./pages/CourseView";
import PrivateRoute from "./components/PrivateRoute";
//import Navbar from "./components/Navbar";

// function App() {
//   return (
//     <BrowserRouter>
//       <Navbar />
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/forgot" element={<ForgotPassword />} />
//         <Route
//           path="/dashboard"
//           element={
//             <PrivateRoute>
//               <Dashboard />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/courses/:courseId"
//           element={
//             <PrivateRoute>
//               <CourseView />
//             </PrivateRoute>
//           }
//         />
//         <Route path="*" element={<Navigate to="/dashboard" />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// NEW CODE:
export default function App() {
  return (
    <BrowserRouter>
      
      <Routes>
        {/* Redirect to dashboard */}
        <Route path="/" element={<Navigate to="/courses/Default" replace />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/course/:courseId" element={<CourseView />} />

        {/* Protected Routes */}
        <Route
          path="/courses/:courseId"
          element={
            <PrivateRoute>
              <CourseView />
            </PrivateRoute>
          }
        />

        {/* <Route
          path="/courses/:courseId"
          element={
            <PrivateRoute>
              <CourseView />
            </PrivateRoute>
          }
        /> */}

        {/* Default route */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}







// ALASHAIMA CODE 

// import React from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import CourseView from "./pages/CourseView";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>

//         <Route path="/" element={<Navigate to="/course/Default" replace />} />


//         <Route path="/course/:courseId" element={<CourseView />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }




