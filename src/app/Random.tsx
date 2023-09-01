// components/RandomData.js
import { useState, useEffect } from 'react';

const RandomData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // API endpoint
    const apiUrl = 'https://jsonplaceholder.typicode.com/todos/1';

    // GET request to the API
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h2>Random Data</h2>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default RandomData;
