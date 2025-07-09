import React, { useState, useRef, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Send, Loader, MessageSquare, Brain } from 'lucide-react'

const Ask = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMessage = {
      id: Date.now(),
      text: input,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await axios.post('/api/ask/', {
        question: input
      })

      const assistantMessage = {
        id: Date.now() + 1,
        text: response.data.answer,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error asking question:', error)
      toast.error('Failed to get response. Please try again.')
      
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Sorry, I encountered an error while processing your question. Please try again.',
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString(),
        isError: true
      }

      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const clearChat = () => {
    setMessages([])
  }

  if (!user) {
    return null
  }

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <div className="chat-container">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <div>
            <h1 style={{ color: '#333', marginBottom: '0.5rem' }}>
              <Brain size={24} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
              Legal AI Assistant
            </h1>
            <p style={{ color: '#666', margin: 0 }}>
              Ask any legal question and get instant AI-powered answers
            </p>
          </div>
          <button 
            onClick={clearChat}
            className="btn btn-secondary"
            style={{ fontSize: '0.9rem' }}
          >
            Clear Chat
          </button>
        </div>

        <div className="chat-messages">
          {messages.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              color: '#666', 
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <MessageSquare size={48} color="#667eea" />
              <div>
                <h3>Start Your Legal Consultation</h3>
                <p>Ask me anything about legal matters, contracts, regulations, or case law.</p>
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`message ${message.sender}`}
                style={{
                  backgroundColor: message.isError ? '#fee' : undefined,
                  color: message.isError ? '#c33' : undefined
                }}
              >
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong>{message.sender === 'user' ? 'You' : 'Legal AI'}</strong>
                  <span style={{ 
                    fontSize: '0.8rem', 
                    color: '#666', 
                    marginLeft: '1rem' 
                  }}>
                    {message.timestamp}
                  </span>
                </div>
                <div style={{ whiteSpace: 'pre-wrap' }}>
                  {message.text}
                </div>
              </div>
            ))
          )}
          
          {loading && (
            <div className="message assistant">
              <div style={{ marginBottom: '0.5rem' }}>
                <strong>Legal AI</strong>
                <span style={{ 
                  fontSize: '0.8rem', 
                  color: '#666', 
                  marginLeft: '1rem' 
                }}>
                  {new Date().toLocaleTimeString()}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Loader size={16} className="animate-spin" />
                <span>Thinking...</span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="chat-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your legal question..."
            disabled={loading}
            style={{ flex: 1 }}
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="btn btn-primary"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              minWidth: 'auto',
              padding: '0.75rem 1rem'
            }}
          >
            <Send size={16} />
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

export default Ask 
