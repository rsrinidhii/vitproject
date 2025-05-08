import React, { useState } from "react";
import axios from "axios";
import '../styles/PredictPage.css';
function PredictPage() {
  const [smiles, setSmiles] = useState("");
  const [numValue, setNumValue] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setPrediction(null);

    try {
      const response = await axios.post("http://127.0.0.1:5001/predict", {
        smiles,
        num_value: numValue,
      });

      setPrediction(response.data.prediction);
    } catch (err) {
      setError("Error: Invalid input or server issue.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>SMILES Prediction Page</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>SMILES String:</label>
          <input
            type="text"
            value={smiles}
            onChange={(e) => setSmiles(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Numeric Value:</label>
          <input
            type="number"
            value={numValue}
            onChange={(e) => setNumValue(e.target.value)}
            required
          />
        </div>
        <button type="submit">Predict</button>
      </form>

      {prediction !== null && (
        <div>
          <h3>Prediction: {prediction}</h3>
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default PredictPage;
