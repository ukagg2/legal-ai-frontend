import React, { useState } from 'react';
import axios from 'axios';

const DOCUMENT_TYPES = [
  'Rent Agreement',
  'Partnership Deed',
  'Affidavit',
  'Power of Attorney',
  'Custom Document'
];

export default function DocumentGenerator() {
  const [type, setType] = useState('');
  const [fields, setFields] = useState('');
  const [output, setOutput] = useState('');

  const handleGenerate = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post(
        '/api/generate-document',
        { type, fields },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOutput(res.data.generated_text);
    } catch (err) {
      setOutput('Failed to generate document.');
    }
  };

  return (
    <div className="container">
      <h2>Generate Legal Document</h2>
      <select value={type} onChange={(e) => setType(e.target.value)} required>
        <option value="">-- Select Document Type --</option>
        {DOCUMENT_TYPES.map((doc) => (
          <option key={doc} value={doc}>{doc}</option>
        ))}
      </select>
      <textarea
        placeholder="Enter required details (names, dates, etc.)"
        value={fields}
        onChange={(e) => setFields(e.target.value)}
        rows={5}
        style={{ width: '100%' }}
      />
      <button onClick={handleGenerate}>Generate</button>
      {output && (
        <div>
          <h4>Drafted Document:</h4>
          <pre>{output}</pre>
        </div>
      )}
    </div>
  );
}
