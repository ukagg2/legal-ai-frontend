import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { MessageSquare, FileText, Upload, Shield, Zap, Users } from 'lucide-react'

const Home = () => {
  const { user } = useAuth()

  return (
    <div>
      <section className="hero">
        <div className="container">
          <h1>AI-Powered Legal Assistant</h1>
          <p>
            Get instant answers to legal questions, generate professional documents, 
            and manage your legal documents with cutting-edge AI technology.
          </p>
          {user ? (
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <Link to="/ask" className="btn btn-primary">
                Ask Legal Questions
              </Link>
              <Link to="/document" className="btn btn-secondary">
                Generate Documents
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <Link to="/register" className="btn btn-primary">
                Get Started
              </Link>
              <Link to="/login" className="btn btn-secondary">
                Login
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#333' }}>
            Powerful Features for Legal Professionals
          </h2>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <MessageSquare />
              </div>
              <h3>AI Legal Q&A</h3>
              <p>
                Ask complex legal questions and get instant, accurate answers 
                based on comprehensive legal knowledge and case law.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <FileText />
              </div>
              <h3>Document Generation</h3>
              <p>
                Generate professional legal documents, contracts, and agreements 
                with AI assistance and customizable templates.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Upload />
              </div>
              <h3>Document Management</h3>
              <p>
                Upload, organize, and search through your legal documents 
                with intelligent indexing and retrieval.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Shield />
              </div>
              <h3>Secure & Private</h3>
              <p>
                Enterprise-grade security with encrypted storage and 
                secure authentication to protect your sensitive legal data.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Zap />
              </div>
              <h3>Fast & Efficient</h3>
              <p>
                Lightning-fast responses and document generation 
                to save time and increase productivity.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Users />
              </div>
              <h3>User Management</h3>
              <p>
                Manage user access, roles, and permissions 
                for teams and organizations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {!user && (
        <section style={{ 
          padding: '4rem 0', 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          textAlign: 'center'
        }}>
          <div className="container">
            <h2>Ready to Get Started?</h2>
            <p style={{ marginBottom: '2rem', fontSize: '1.2rem' }}>
              Join thousands of legal professionals using AI to enhance their practice.
            </p>
            <Link to="/register" className="btn btn-primary">
              Create Free Account
            </Link>
          </div>
        </section>
      )}
    </div>
  )
}

export default Home 
