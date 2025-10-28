import React, { useState } from 'react';

const DrugInfo = () => {
  const [drug, setDrug] = useState('');
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDrugInfo = async () => {
    if (!drug) return;
    setLoading(true);
    setInfo(null);

    try {
      const baseUrl = import.meta.env.VITE_DAILYMED_API;
      const res = await fetch(`${baseUrl}/spls.json?drug_name=${drug}`);
      const data = await res.json();
      setInfo(data.data || []);
    } catch (err) {
      console.error('Error fetching data:', err);
      setInfo([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>💊 Medicine Information Finder</h1>
      <input
        type="text"
        placeholder="Enter medicine name..."
        value={drug}
        onChange={(e) => setDrug(e.target.value)}
      />
      <button onClick={fetchDrugInfo}>Search</button>

      {loading && <p>Loading...</p>}

      <div className="result">
        {info && info.length > 0 ? (
          info.slice(0, 5).map((item, index) => (
            <div key={index}>
              <h3>{item.title}</h3>
              <p><strong>ID:</strong> {item.setid}</p>
              <hr />
            </div>
          ))
        ) : (
          !loading && <p>No data found.</p>
        )}
      </div>
    </div>
  );
};

export default DrugInfo;