// frontend/src/components/Login.jsx
import React from "react";
import "./auth.css";

function Login() {
  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Keeper</h1>
        <p className="login-subtitle">Save your notes securely</p>
        <a
          className="login-btn"
          href={`${import.meta.env.VITE_API_URL}/auth/google`}
        >
          Sign in with Google
        </a>


      </div>
    </div>
  );
}

export default Login;
