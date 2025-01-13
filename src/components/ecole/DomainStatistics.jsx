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
  const [tagChartData, setTagChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTag, setSelectedTag] = useState('');

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
        console.log('Domain Statistics Response:', response); // Debugging line

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
        console.error('Error fetching domain statistics:', err);
        setError('Failed to fetch domain statistics.');
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
        console.log('Enterprise Evolution Response:', response); // Debugging line

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
        console.error('Error fetching enterprise evolution data:', err);
        setError('Failed to fetch enterprise evolution data.');
      }
    };

    fetchDomainStatistics();
    fetchEnterpriseEvolution();
  }, []);

  const handleTagSelect = async (tagName) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/ecole/tag-count/${tagName}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log('Tag Statistics Response:', response); // Debugging line

      const data = response.data.data;
      setTagChartData({
        labels: [tagName],
        datasets: [
          {
            label: `${tagName} Offers`,
            data: data[0], // Assuming the count is the first item in the array
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      });
    } catch (err) {
      console.error(`Error fetching data for ${tagName}:`, err);
      setError(`Failed to fetch data for ${tagName}`);
    }
  };

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
          // Removing percentage formatting
          callback: (value) => `${value}`, // Just show the number (not percentage)
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
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <EcoleSidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <div
        className={`flex justify-center items-start ${
          openSidebarToggle ? 'ml-[56rem] mt-[4rem] pt-[0.1rem]' : 'ml-[16rem]'
        }`}
      >
        <div className="rounded-lg p-24 max-w-6xl">
          
          <div style={{ width: '600px', margin: '0 auto' }}>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <>
                
                <h2 className="text-center mt-8 font-bold text-2xl">Enterprise Evolution</h2>
                {enterpriseChartData ? (
                  <Line data={enterpriseChartData} options={lineChartOptions} />
                ) : (
                  <p>No enterprise evolution data available.</p>
                )}
                <h2 className="text-center mt-8 font-bold text-2xl">Tag Statistics</h2>
                <div className="flex justify-center mb-4">
                  <select
                    value={selectedTag}
                    onChange={(e) => {
                      const tagName = e.target.value;
                      setSelectedTag(tagName);
                      handleTagSelect(tagName);
                    }}
                    className="p-2 border border-gray-300 rounded"
                  >
                    <option value="">Select Tag</option>
                    <option value="Frontend Developer">Frontend Developer</option>
                    <option value="Backend Developer">Backend Developer</option>
                    <option value="Full Stack Developer">Full Stack Developer</option>
                    <option value="Software Engineer">Software Engineer</option>
                    <option value="Artificial Intelligence Engineer">Artificial Intelligence Engineer</option>
                    <option value="Deep Learning Engineer">Deep Learning Engineer</option>
                    <option value="DevOps Engineer">DevOps Engineer</option>
                  </select>
                </div>
                {tagChartData ? (
                  <Bar data={tagChartData} options={barChartOptions} />
                ) : (
                  <p>No data for selected tag.</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DomainStatistics;
