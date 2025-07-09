import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Upload as UploadIcon, File, Trash2, Download, Eye } from 'lucide-react'

const Upload = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(true)

  React.useEffect(() => {
    if (!user) {
      navigate('/login')
    } else {
      fetchFiles()
    }
  }, [user, navigate])

  const fetchFiles = async () => {
    try {
      const response = await axios.get('/api/upload/files')
      setFiles(response.data.files)
    } catch (error) {
      console.error('Error fetching files:', error)
      toast.error('Failed to load files')
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (event) => {
    const selectedFiles = Array.from(event.target.files)
    if (selectedFiles.length === 0) return

    setUploading(true)
    const formData = new FormData()

    selectedFiles.forEach(file => {
      formData.append('files', file)
    })

    try {
      await axios.post('/api/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      toast.success('Files uploaded successfully!')
      fetchFiles() // Refresh the file list
    } catch (error) {
      console.error('Error uploading files:', error)
      toast.error('Failed to upload files')
    } finally {
      setUploading(false)
    }
  }

  const handleFileDelete = async (filename) => {
    if (!window.confirm('Are you sure you want to delete this file?')) return

    try {
      await axios.delete(`/api/upload/files/${filename}`)
      toast.success('File deleted successfully!')
      fetchFiles() // Refresh the file list
    } catch (error) {
      console.error('Error deleting file:', error)
      toast.error('Failed to delete file')
    }
  }

  const handleFileDownload = async (filename) => {
    try {
      const response = await axios.get(`/api/upload/files/${filename}`, {
        responseType: 'blob'
      })

      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', filename)
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading file:', error)
      toast.error('Failed to download file')
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString()
  }

  if (!user) {
    return null
  }

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          marginBottom: '2rem',
          gap: '0.5rem'
        }}>
          <UploadIcon size={24} color="#667eea" />
          <h1 style={{ color: '#333', margin: 0 }}>Document Management</h1>
        </div>

        {/* Upload Section */}
        <div className="card">
          <h2 style={{ marginBottom: '1rem', color: '#333' }}>Upload Documents</h2>
          <p style={{ color: '#666', marginBottom: '1.5rem' }}>
            Upload legal documents to be indexed and searchable by the AI assistant.
          </p>

          <div style={{
            border: '2px dashed #e1e5e9',
            borderRadius: '0.5rem',
            padding: '2rem',
            textAlign: 'center',
            backgroundColor: '#f8f9fa'
          }}>
            <UploadIcon size={48} color="#667eea" style={{ marginBottom: '1rem' }} />
            <h3>Drop files here or click to browse</h3>
            <p style={{ color: '#666', marginBottom: '1.5rem' }}>
              Supported formats: PDF, DOC, DOCX, TXT (Max 10MB per file)
            </p>
            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileUpload}
              disabled={uploading}
              style={{ display: 'none' }}
              id="file-upload"
            />
            <label htmlFor="file-upload" className="btn btn-primary" style={{ cursor: 'pointer' }}>
              {uploading ? 'Uploading...' : 'Choose Files'}
            </label>
          </div>
        </div>

        {/* Files List */}
        <div className="card">
          <h2 style={{ marginBottom: '1rem', color: '#333' }}>Your Documents</h2>
          
          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div className="loading">Loading files...</div>
            </div>
          ) : files.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '2rem',
              color: '#666'
            }}>
              <File size={48} color="#667eea" style={{ marginBottom: '1rem' }} />
              <h3>No documents uploaded yet</h3>
              <p>Upload your first document to get started.</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ 
                width: '100%', 
                borderCollapse: 'collapse',
                fontSize: '0.9rem'
              }}>
                <thead>
                  <tr style={{ 
                    backgroundColor: '#f8f9fa',
                    borderBottom: '2px solid #e1e5e9'
                  }}>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>File Name</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Size</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Upload Date</th>
                    <th style={{ padding: '1rem', textAlign: 'center' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {files.map((file, index) => (
                    <tr key={index} style={{ 
                      borderBottom: '1px solid #e1e5e9',
                      '&:hover': { backgroundColor: '#f8f9fa' }
                    }}>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <File size={16} color="#667eea" />
                          {file.filename}
                        </div>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        {formatFileSize(file.size)}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        {formatDate(file.upload_date)}
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                          <button
                            onClick={() => handleFileDownload(file.filename)}
                            className="btn btn-secondary"
                            style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}
                            title="Download"
                          >
                            <Download size={14} />
                          </button>
                          <button
                            onClick={() => handleFileDelete(file.filename)}
                            className="btn btn-secondary"
                            style={{ 
                              padding: '0.25rem 0.5rem', 
                              fontSize: '0.8rem',
                              backgroundColor: '#fee',
                              color: '#c33',
                              borderColor: '#c33'
                            }}
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Upload 
