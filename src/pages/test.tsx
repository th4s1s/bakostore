import React, { useEffect, useState } from 'react';

const TestComponent: React.FC = () => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(0);

  useEffect(() => {
    fetch('http://localhost:8080/test.php')
      .then(response => {
        setStatus(response.status);
        return response.json();
      })
      .then(data => setData(data));
  }, []);

  return (

    <div>
      <h1>Test Component</h1>
      <h2>Status: {status}</h2>
      <h3>Data:</h3>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
);
};

export default TestComponent;