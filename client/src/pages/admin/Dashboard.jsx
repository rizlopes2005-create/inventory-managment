import React from 'react'
import { Activity, AlertTriangle, Clock, PackageCheck, TrendingUp, TrendingDown } from 'lucide-react'

export default function Dashboard() {
  const stats = [
    { name: 'Total Items', value: '1,248', icon: PackageCheck, color: 'text-blue-400' },
    { name: 'Critically Low', value: '12', icon: AlertTriangle, color: 'text-accent-critical' },
    { name: 'Pending Orders', value: '8', icon: Clock, color: 'text-accent-warning' },
    { name: 'Recent Actions', value: '156', icon: Activity, color: 'text-accent-safe' },
  ];

  const recentAlerts = [
    { id: 1, item: 'Ready-to-Eat Meals (MRE)', base: 'Base Alpha', level: 'Critical', time: '10 mins ago' },
    { id: 2, item: 'Drinking Water (20L)', base: 'INS Vikrant', level: 'Critical', time: '1 hour ago' },
    { id: 3, item: 'Ammunition 5.56mm', base: 'Forward Operating Base Bravo', level: 'High', time: '2 hours ago' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-white tracking-wide">COMMAND DASHBOARD</h1>
          <p className="text-gray-400 mt-1">Real-time overview of all military branch inventories.</p>
        </div>
        <button className="military-btn military-btn-primary">
          <Activity size={18} />
          Generate Report
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="military-card p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">{stat.name}</p>
                  <p className="text-3xl font-display font-bold text-white mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-military-900 ${stat.color}`}>
                  <Icon size={24} />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp size={16} className="text-accent-safe mr-1" />
                <span className="text-accent-safe font-medium">2.5%</span>
                <span className="text-gray-500 ml-2">vs last week</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Area */}
        <div className="lg:col-span-2 military-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-display font-bold text-white">Stock Level Trends</h3>
            <select className="bg-military-900 border border-military-700 rounded px-3 py-1 text-sm text-gray-300 focus:outline-none focus:border-accent-safe">
              <option>Last 30 Days</option>
              <option>Last 7 Days</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-64 flex items-center justify-center border border-military-700/50 rounded bg-military-900/50">
            <p className="text-gray-500 font-medium">Chart visualization (Recharts) goes here</p>
          </div>
        </div>

        {/* Critical Alerts */}
        <div className="military-card p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-display font-bold text-white">Critical Alerts</h3>
            <span className="bg-accent-critical/20 text-accent-critical text-xs px-2 py-1 rounded font-bold">LIVE</span>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-4">
            {recentAlerts.map(alert => (
              <div key={alert.id} className="p-4 rounded-lg bg-military-900 border-l-4 border-accent-critical">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-white">{alert.item}</h4>
                  <span className="text-xs text-gray-500">{alert.time}</span>
                </div>
                <p className="text-sm text-gray-400 mt-1">{alert.base}</p>
                <div className="mt-3 flex gap-2">
                  <button className="text-xs bg-military-700 hover:bg-military-600 text-white px-3 py-1 rounded transition-colors">
                    View
                  </button>
                  <button className="text-xs bg-accent-safe hover:bg-green-600 text-white px-3 py-1 rounded transition-colors">
                    Auto-Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
