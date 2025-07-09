import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function NavBar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
      <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
      {isLoggedIn && (
        <>
          <Link to="/ask" style={{ marginRight: '10px' }}>Ask</Link>
          <Link to="/upload" style={{ marginRight: '10px' }}>Upload</Link>
          <Link to="/generate" style={{ marginRight: '10px' }}>Generate</Link>
          <button onClick={handleLogout} style={{ float: 'right' }}>Logout</button>
        </>
      )}
      {!isLoggedIn && (
        <>
          <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}
