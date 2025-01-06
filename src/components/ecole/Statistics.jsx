import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Header from '../../Header';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import EcoleSidebar from './EcoleSidebar';

// Register the components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DomainStatistics = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(true);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  // Randomized percentages for initial display
  const domains = [
    { domain: 'IA', percentage: Math.floor(Math.random() * 100) },
    { domain: 'Cybersecurity', percentage: Math.floor(Math.random() * 100) },
    { domain: 'Web Dev', percentage: Math.floor(Math.random() * 100) },
    { domain: 'Mobile Dev', percentage: Math.floor(Math.random() * 100) },
    { domain: 'Machine Learning', percentage: Math.floor(Math.random() * 100) },
    { domain: 'Deep Learning', percentage: Math.floor(Math.random() * 100) },
  ];

  const chartData = {
    labels: domains.map((item) => item.domain),
    datasets: [
      {
        label: 'Domain Distribution (%)',
        data: domains.map((item) => item.percentage),
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
  };

  const options = {
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
            <Bar data={chartData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DomainStatistics;
