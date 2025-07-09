import React, { useState } from 'react';
import axios from 'axios';

export default function Upload() {
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('file', file);
    formData.append('question', question);

    try {
      const res = await axios.post('/api/upload', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setAnswer(res.data.answer);
    } catch (err) {
      setAnswer('Error analyzing the document.');
    }
  };

  return (
    <div className="container">
      <h2>Ask on Uploaded Document</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
        <textarea
          placeholder="Enter your question about the document..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows={4}
          style={{ width: '100%' }}
        />
        <button type="submit">Submit</button>
      </form>
      {answer && <div><h4>Answer:</h4><p>{answer}</p></div>}
    </div>
  );
}
