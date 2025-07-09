import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { LogOut, User, Settings } from 'lucide-react'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-brand">
          Legal AI Platform
        </Link>
        
        <ul className="navbar-nav">
          <li><Link to="/">Home</Link></li>
          {user ? (
            <>
              <li><Link to="/ask">Ask Legal Questions</Link></li>
              <li><Link to="/document">Document Generator</Link></li>
              <li><Link to="/upload">Upload Documents</Link></li>
              <li>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span>Welcome, {user.name}</span>
                  <button 
                    onClick={handleLogout}
                    className="btn btn-secondary"
                    style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                  >
                    <LogOut size={16} />
                  </button>
                </div>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar 
