import React, { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import Header from '../../Header';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import EcoleSidebar from './EcoleSidebar';
import axios from 'axios';

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const DomainStatistics = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(true);
  const [domainChartData, setDomainChartData] = useState(null);
  const [enterpriseChartData, setEnterpriseChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  useEffect(() => {
    const fetchDomainStatistics = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/ecole/statistics', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.data || !Array.isArray(response.data.data)) {
          throw new Error('Invalid data format received from API');
        }

        const data = response.data.data;

        const totalCount = data.reduce((sum, item) => sum + item.COUNT, 0);
        const labels = data.map((item) => item.DOMAINE || 'Unknown');
        const percentages = data.map((item) => ((item.COUNT / totalCount) * 100).toFixed(2));

        setDomainChartData({
          labels,
          datasets: [
            {
              label: 'Domain Distribution (%)',
              data: percentages,
              backgroundColor: [
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(201, 203, 207, 0.6)',
              ],
              borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(201, 203, 207, 1)',
              ],
              borderWidth: 1,
            },
          ],
        });
      } catch (err) {
        setError('Failed to fetch domain statistics.');
        console.error('Error fetching domain statistics:', err);
      } finally {
        setLoading(false);
      }
    };

    const fetchEnterpriseEvolution = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/entreprise/enterpriseevolution', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const data = response.data.data;

        let cumulativeTotal = 0;
        const processedData = data.map(([date, count]) => {
          cumulativeTotal += count;
          return { date, total: cumulativeTotal };
        });

        setEnterpriseChartData({
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
      } catch (err) {
        setError('Failed to fetch enterprise evolution data.');
        console.error('Error fetching enterprise evolution data:', err);
      }
    };

    fetchDomainStatistics();
    fetchEnterpriseEvolution();
  }, []);

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `${value}%`,
        },
      },
    },
  };

  const lineChartOptions = {
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
        beginAtZero: true,
        title: {
          display: true,
          text: 'Total Enterprises',
        },
      },
    },
  };

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar} />
      <EcoleSidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <div
        className={`flex justify-center items-start ${
          openSidebarToggle ? 'ml-[56rem] mt-[4rem] pt-[0.1rem]' : 'ml-[16rem]'
        }`}
      >
        <div className='rounded-lg p-24 max-w-6xl'>
          <h2 className="text-center mb-8 font-bold text-2xl">Domain Statistics</h2>
          <div style={{ width: '600px', margin: '0 auto' }}>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <>
                <Bar data={domainChartData} options={barChartOptions} />
                <h2 className="text-center mt-8 font-bold text-2xl">Enterprise Evolution</h2>
                <Line data={enterpriseChartData} options={lineChartOptions} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DomainStatistics;
