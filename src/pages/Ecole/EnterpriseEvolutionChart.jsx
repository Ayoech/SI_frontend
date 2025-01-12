import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const EnterpriseEvolutionChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvolutionData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/entreprise/enterpriseevolution`);
        const data = response.data.data;

        // Accumulate the total number of users over time
        let cumulativeTotal = 0;
        const processedData = data.map(([date, count]) => {
          cumulativeTotal += count;
          return { date, total: cumulativeTotal };
        });

        // Format data for chart.js
        setChartData({
          labels: processedData.map((entry) => entry.date),
          datasets: [
            {
              label: 'Total Number of Enterprises',
              data: processedData.map((entry) => entry.total),
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: true,
            },
          ],
        });

        setLoading(false);
      } catch (err) {
        setError('Failed to fetch enterprise evolution data');
        setLoading(false);
      }
    };

    fetchEvolutionData();
  }, []);

  if (loading) return <p>Loading chart...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ width: '80%', margin: 'auto' }}>
      <h2>Enterprise Evolution Over Time</h2>
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: 'top',
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Date',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Total Enterprises',
              },
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default EnterpriseEvolutionChart;
