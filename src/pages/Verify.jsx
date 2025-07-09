import { useState } from 'react';

export default function Verify() {
  const [code, setCode] = useState('');
  const [result, setResult] = useState('');

  const submitCode = async () => {
    const res = await fetch('/api/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    });

    const data = await res.json();
    setResult(data.message || 'Verification failed');
  };

  return (
    <div>
      <h2 className="text-xl mb-3 font-bold">Phone Verification</h2>
      <input type="text" placeholder="Enter OTP or code" className="input mb-2" onChange={(e) => setCode(e.target.value)} />
      <button onClick={submitCode} className="btn">Verify</button>
      {result && <p className="mt-2">{result}</p>}
    </div>
  );
}
