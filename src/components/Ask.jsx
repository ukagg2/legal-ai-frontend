import React, { useState } from "react";
import axios from "axios";

const Ask = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const askQuestion = async () => {
    setLoading(true);
    setError("");
    setAnswer("");

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "/api/ask",
        { question },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAnswer(res.data.answer);
    } catch (err) {
      console.error(err);
      setError("Error while asking question.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ask-container">
      <h2>Ask Legal Question</h2>
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Type your legal question here..."
        rows={5}
      />
      <button onClick={askQuestion} disabled={loading}>
        {loading ? "Asking..." : "Ask"}
      </button>

      {answer && (
        <div className="answer">
          <h3>Answer:</h3>
          <p>{answer}</p>
        </div>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Ask;
