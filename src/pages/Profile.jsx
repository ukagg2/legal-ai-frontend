import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'
import { User, Mail, Phone, Shield, Settings, Save } from 'lucide-react'

const Profile = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')

  const { register, handleSubmit, formState: { errors }, setValue } = useForm()

  React.useEffect(() => {
    if (!user) {
      navigate('/login')
    } else {
      // Pre-fill form with user data
      setValue('name', user.name || '')
      setValue('email', user.email || '')
      setValue('phone', user.phone || '')
    }
  }, [user, navigate, setValue])

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      await axios.put('/api/auth/profile', data)
      toast.success('Profile updated successfully!')
    } catch (error) {
      console.error('Error updating profile:', error)
      toast.error('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
    toast.success('Logged out successfully')
  }

  if (!user) {
    return null
  }

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          marginBottom: '2rem',
          gap: '0.5rem'
        }}>
          <User size={24} color="#667eea" />
          <h1 style={{ color: '#333', margin: 0 }}>Profile & Settings</h1>
        </div>

        {/* Tab Navigation */}
        <div style={{ 
          display: 'flex', 
          borderBottom: '2px solid #e1e5e9',
          marginBottom: '2rem'
        }}>
          <button
            onClick={() => setActiveTab('profile')}
            style={{
              padding: '1rem 2rem',
              border: 'none',
              background: activeTab === 'profile' ? '#667eea' : 'transparent',
              color: activeTab === 'profile' ? 'white' : '#333',
              cursor: 'pointer',
              borderBottom: activeTab === 'profile' ? '2px solid #667eea' : 'none',
              fontWeight: activeTab === 'profile' ? '600' : '400'
            }}
          >
            <User size={16} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
            Profile
          </button>
          <button
            onClick={() => setActiveTab('security')}
            style={{
              padding: '1rem 2rem',
              border: 'none',
              background: activeTab === 'security' ? '#667eea' : 'transparent',
              color: activeTab === 'security' ? 'white' : '#333',
              cursor: 'pointer',
              borderBottom: activeTab === 'security' ? '2px solid #667eea' : 'none',
              fontWeight: activeTab === 'security' ? '600' : '400'
            }}
          >
            <Shield size={16} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
            Security
          </button>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="card">
            <h2 style={{ marginBottom: '1.5rem', color: '#333' }}>
              <User size={20} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
              Personal Information
            </h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <div style={{ position: 'relative' }}>
                  <User size={20} style={{ 
                    position: 'absolute', 
                    left: '12px', 
                    top: '50%', 
                    transform: 'translateY(-50%)',
                    color: '#666'
                  }} />
                  <input
                    {...register('name', { 
                      required: 'Full name is required',
                      minLength: {
                        value: 2,
                        message: 'Name must be at least 2 characters'
                      }
                    })}
                    type="text"
                    placeholder="Enter your full name"
                    style={{ paddingLeft: '40px' }}
                  />
                </div>
                {errors.name && (
                  <span style={{ color: '#c33', fontSize: '0.9rem' }}>
                    {errors.name.message}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={20} style={{ 
                    position: 'absolute', 
                    left: '12px', 
                    top: '50%', 
                    transform: 'translateY(-50%)',
                    color: '#666'
                  }} />
                  <input
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    type="email"
                    placeholder="Enter your email"
                    style={{ paddingLeft: '40px' }}
                  />
                </div>
                {errors.email && (
                  <span style={{ color: '#c33', fontSize: '0.9rem' }}>
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <div style={{ position: 'relative' }}>
                  <Phone size={20} style={{ 
                    position: 'absolute', 
                    left: '12px', 
                    top: '50%', 
                    transform: 'translateY(-50%)',
                    color: '#666'
                  }} />
                  <input
                    {...register('phone', { 
                      required: 'Phone number is required',
                      pattern: {
                        value: /^[0-9+\-\s()]+$/,
                        message: 'Invalid phone number'
                      }
                    })}
                    type="tel"
                    placeholder="Enter your phone number"
                    style={{ paddingLeft: '40px' }}
                  />
                </div>
                {errors.phone && (
                  <span style={{ color: '#c33', fontSize: '0.9rem' }}>
                    {errors.phone.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <Save size={16} />
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="card">
            <h2 style={{ marginBottom: '1.5rem', color: '#333' }}>
              <Shield size={20} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
              Security Settings
            </h2>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ color: '#333', marginBottom: '1rem' }}>Account Information</h3>
              <div style={{ 
                backgroundColor: '#f8f9fa', 
                padding: '1rem', 
                borderRadius: '0.5rem',
                marginBottom: '1rem'
              }}>
                <p><strong>User ID:</strong> {user.id}</p>
                <p><strong>Account Created:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
                <p><strong>Last Login:</strong> {new Date(user.last_login || user.created_at).toLocaleDateString()}</p>
              </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ color: '#333', marginBottom: '1rem' }}>Session Management</h3>
              <p style={{ color: '#666', marginBottom: '1rem' }}>
                You are currently logged in. Click the button below to log out of your account.
              </p>
              <button
                onClick={handleLogout}
                className="btn btn-secondary"
                style={{ 
                  backgroundColor: '#fee',
                  color: '#c33',
                  borderColor: '#c33'
                }}
              >
                Logout
              </button>
            </div>

            <div>
              <h3 style={{ color: '#333', marginBottom: '1rem' }}>Data & Privacy</h3>
              <p style={{ color: '#666', marginBottom: '1rem' }}>
                Your data is encrypted and stored securely. We do not share your personal information with third parties.
              </p>
              <div style={{ 
                backgroundColor: '#f8f9fa', 
                padding: '1rem', 
                borderRadius: '0.5rem',
                fontSize: '0.9rem'
              }}>
                <p><strong>Data Encryption:</strong> All data is encrypted in transit and at rest</p>
                <p><strong>Privacy Policy:</strong> Your data is protected under our privacy policy</p>
                <p><strong>Data Retention:</strong> Your documents are retained as long as your account is active</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile 
