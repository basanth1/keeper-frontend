import React from "react";
import "./auth.css";
function Header({ user }) {
    function logout() {
    window.location.href = `${import.meta.env.VITE_API_URL}/logout`;
  }
  return (
    <header className="header">
      <h1 className="logo">Keeper</h1>
      {user && (
        <div className="user-bar">
          <span>Welcome, {user.name}</span>
          <button className="logout-btn" onClick={logout}>Logout</button>
        </div>
      )}
    </header>
  );
}

export default Header;
