import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'
import { FileText, Download, Copy, Loader, FileType } from 'lucide-react'

const DocumentGenerator = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [generatedDocument, setGeneratedDocument] = useState('')
  const [loading, setLoading] = useState(false)
  const [documentType, setDocumentType] = useState('contract')

  const { register, handleSubmit, formState: { errors } } = useForm()

  React.useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  const documentTypes = [
    { value: 'contract', label: 'Contract Agreement' },
    { value: 'nda', label: 'Non-Disclosure Agreement' },
    { value: 'employment', label: 'Employment Contract' },
    { value: 'lease', label: 'Lease Agreement' },
    { value: 'partnership', label: 'Partnership Agreement' },
    { value: 'service', label: 'Service Agreement' }
  ]

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const response = await axios.post('/api/generate-document/', {
        document_type: documentType,
        ...data
      })

      setGeneratedDocument(response.data.document)
      toast.success('Document generated successfully!')
    } catch (error) {
      console.error('Error generating document:', error)
      toast.error('Failed to generate document. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedDocument)
    toast.success('Document copied to clipboard!')
  }

  const downloadDocument = () => {
    const blob = new Blob([generatedDocument], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${documentType}_document.txt`
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
    toast.success('Document downloaded!')
  }

  if (!user) {
    return null
  }

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          marginBottom: '2rem',
          gap: '0.5rem'
        }}>
          <FileText size={24} color="#667eea" />
          <h1 style={{ color: '#333', margin: 0 }}>Document Generator</h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* Form Section */}
          <div className="card">
            <h2 style={{ marginBottom: '1.5rem', color: '#333' }}>
              Generate Legal Document
            </h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label htmlFor="documentType">Document Type</label>
                <select
                  {...register('documentType')}
                  value={documentType}
                  onChange={(e) => setDocumentType(e.target.value)}
                >
                  {documentTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="parties">Parties Involved</label>
                <input
                  {...register('parties', { required: 'Parties are required' })}
                  type="text"
                  placeholder="e.g., John Doe and Jane Smith"
                />
                {errors.parties && (
                  <span style={{ color: '#c33', fontSize: '0.9rem' }}>
                    {errors.parties.message}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject/Purpose</label>
                <input
                  {...register('subject', { required: 'Subject is required' })}
                  type="text"
                  placeholder="e.g., Software Development Services"
                />
                {errors.subject && (
                  <span style={{ color: '#c33', fontSize: '0.9rem' }}>
                    {errors.subject.message}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="terms">Key Terms</label>
                <textarea
                  {...register('terms')}
                  placeholder="Enter specific terms, conditions, or requirements..."
                  rows="4"
                />
              </div>

              <div className="form-group">
                <label htmlFor="duration">Duration (if applicable)</label>
                <input
                  {...register('duration')}
                  type="text"
                  placeholder="e.g., 12 months, 2 years"
                />
              </div>

              <div className="form-group">
                <label htmlFor="amount">Amount/Value (if applicable)</label>
                <input
                  {...register('amount')}
                  type="text"
                  placeholder="e.g., $50,000, 10% equity"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
                style={{ width: '100%' }}
              >
                {loading ? (
                  <>
                    <Loader size={16} className="animate-spin" />
                    Generating Document...
                  </>
                ) : (
                  <>
                    <FileText size={16} />
                    Generate Document
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Generated Document Section */}
          <div className="card">
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '1rem'
            }}>
              <h2 style={{ color: '#333', margin: 0 }}>Generated Document</h2>
              {generatedDocument && (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={copyToClipboard}
                    className="btn btn-secondary"
                    style={{ padding: '0.5rem', fontSize: '0.9rem' }}
                  >
                    <Copy size={16} />
                  </button>
                  <button
                    onClick={downloadDocument}
                    className="btn btn-primary"
                    style={{ padding: '0.5rem', fontSize: '0.9rem' }}
                  >
                    <Download size={16} />
                  </button>
                </div>
              )}
            </div>

            {generatedDocument ? (
              <div style={{
                border: '2px solid #e1e5e9',
                borderRadius: '0.5rem',
                padding: '1rem',
                backgroundColor: '#f8f9fa',
                minHeight: '400px',
                maxHeight: '500px',
                overflowY: 'auto',
                whiteSpace: 'pre-wrap',
                fontFamily: 'monospace',
                fontSize: '0.9rem',
                lineHeight: '1.5'
              }}>
                {generatedDocument}
              </div>
            ) : (
              <div style={{
                border: '2px dashed #e1e5e9',
                borderRadius: '0.5rem',
                padding: '2rem',
                textAlign: 'center',
                color: '#666',
                minHeight: '400px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem'
              }}>
                <FileType size={48} color="#667eea" />
                <div>
                  <h3>No Document Generated</h3>
                  <p>Fill out the form and click "Generate Document" to create your legal document.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DocumentGenerator 
