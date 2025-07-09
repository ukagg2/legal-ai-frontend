import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [tokens, setTokens] = useState(null);

  useEffect(() => {
    const fetchTokens = async () => {
      const res = await fetch('/api/tokens', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      const data = await res.json();
      if (res.ok) setTokens(data.tokens);
    };

    fetchTokens();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
      {tokens !== null ? (
        <p className="text-lg">Your current token balance: <strong>{tokens}</strong></p>
      ) : (
        <p>Loading your tokens...</p>
      )}
    </div>
  );
}
