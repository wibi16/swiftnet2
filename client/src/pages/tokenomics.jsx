import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Wallet, TrendingUp, Building, Clock, Users } from 'lucide-react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const Tokenomics = () => {
  const totalSupplyData = [
    { name: 'Circulating Supply', value: 95, color: '#22c55e' },
    { name: 'Developer Allocation', value: 5, color: '#06b6d4' }
  ];

  const developerData = [
    { name: 'Team Allocation (2-Year Vesting)', value: 2, color: '#06b6d4' },
    { name: 'Marketing Operations', value: 1, color: '#0ea5e9' },
    { name: 'Treasury & Ecosystem', value: 2, color: '#3b82f6' }
  ];

  const allocationData = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Team Allocation",
      description: "2% vested linearly over a 2-year period from launch date",
      color: "bg-cyan-500"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Marketing Operations",
      description: "1% allocated for marketing initiatives and community growth",
      color: "bg-blue-500"
    },
    {
      icon: <Building className="w-6 h-6" />,
      title: "Treasury & Ecosystem",
      description: "2% dedicated to ecosystem development and treasury reserves",
      color: "bg-indigo-500"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Circulating Supply",
      description: "95% available for public trading, ensuring high liquidity and fair distribution",
      color: "bg-green-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      {/* Header Section */}
      <div className="container mx-auto px-4 pt-24 text-center">
        <div className="inline-block p-4 mb-6 rounded-2xl bg-white/30 dark:bg-white/10 backdrop-blur-lg">
          <Wallet className="w-12 h-12 text-cyan-500 dark:text-cyan-400" />
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent mb-6">
          Tokenomics
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-16">
          Total Token Distribution
        </p>
      </div>

      {/* Chart Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Total Supply Chart */}
            <div className="h-[400px]">
              <h3 className="text-xl font-semibold text-center mb-4 text-gray-800 dark:text-white">
                Total Token Distribution
              </h3>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={totalSupplyData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={160}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    animationBegin={0}
                    animationDuration={1500}
                  >
                    {totalSupplyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Developer Allocation Chart */}
            <div className="h-[400px]">
              <h3 className="text-xl font-semibold text-center mb-4 text-gray-800 dark:text-white">
                Developer Allocation (5%)
              </h3>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={developerData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={160}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    animationBegin={0}
                    animationDuration={1500}
                  >
                    {developerData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Detailed Breakdown */}
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {allocationData.map((item, index) => (
              <div
                key={index}
                className="p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl ${item.color} text-white`}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center text-gray-600 dark:text-gray-300">
          <p className="text-sm">
            The token distribution is designed to ensure fair public access while maintaining sustainable development and marketing operations. The circulating supply of 95% promotes high liquidity and wide token distribution among the community.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Tokenomics;