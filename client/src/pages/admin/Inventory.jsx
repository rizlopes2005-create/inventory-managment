import React, { useState } from 'react'
import { Search, Filter, Plus, MoreVertical, ShieldAlert, CheckCircle2 } from 'lucide-react'

export default function Inventory() {
  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'Navy', 'Air Defence', 'Army'];

  const dummyItems = [
    { id: 1, name: 'Ready-to-Eat Meals (MRE)', branch: 'Navy', location: 'Base Alpha', stock: 200, capacity: 1000, priority: 'Critical', vendor: 'SupplyCo' },
    { id: 2, name: 'Drinking Water (20L cans)', branch: 'Army', location: 'FOB Bravo', stock: 150, capacity: 500, priority: 'Critical', vendor: 'SupplyCo' },
    { id: 3, name: 'Wheat Flour', branch: 'Air Defence', location: 'Air Base Delta', stock: 120, capacity: 300, priority: 'High', vendor: 'AgriCorp' },
    { id: 4, name: 'Canned Vegetables', branch: 'Navy', location: 'INS Vikrant', stock: 400, capacity: 800, priority: 'Normal', vendor: 'FoodNet' },
  ];

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'Critical': return 'text-accent-critical bg-accent-critical/10 border-accent-critical/20';
      case 'High': return 'text-accent-warning bg-accent-warning/10 border-accent-warning/20';
      case 'Normal': return 'text-accent-safe bg-accent-safe/10 border-accent-safe/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  }

  const getProgressColor = (stock, capacity) => {
    const percent = (stock / capacity) * 100;
    if (percent <= 20) return 'bg-accent-critical';
    if (percent <= 50) return 'bg-accent-warning';
    return 'bg-accent-safe';
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-white tracking-wide">INVENTORY ROSTER</h1>
          <p className="text-gray-400 mt-1">Manage and track all food and supply assets.</p>
        </div>
        <button className="military-btn military-btn-primary">
          <Plus size={18} />
          Add New Item
        </button>
      </div>

      {/* Controls Bar */}
      <div className="military-card p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="flex bg-military-900 rounded-lg p-1 border border-military-700 w-full md:w-auto">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab 
                  ? 'bg-military-700 text-white shadow' 
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search items, bases..." 
              className="military-input pl-10"
            />
          </div>
          <button className="military-btn military-btn-outline px-3">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Inventory List */}
      <div className="military-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-military-900 border-b border-military-700 text-gray-400 text-sm uppercase tracking-wider font-display">
                <th className="p-4 font-medium">Item Details</th>
                <th className="p-4 font-medium">Location</th>
                <th className="p-4 font-medium">Stock Level</th>
                <th className="p-4 font-medium">Priority</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-military-700">
              {dummyItems.map(item => (
                <tr key={item.id} className="hover:bg-military-900/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-military-700 flex items-center justify-center overflow-hidden border border-military-600">
                        <PackageCheck size={20} className="text-gray-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{item.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Vendor: {item.vendor}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-sm text-gray-300">{item.location}</p>
                    <p className="text-xs text-gray-500">{item.branch}</p>
                  </td>
                  <td className="p-4">
                    <div className="w-48">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-white font-medium">{item.stock}</span>
                        <span className="text-gray-500">/ {item.capacity}</span>
                      </div>
                      <div className="h-2 w-full bg-military-900 rounded-full overflow-hidden border border-military-700">
                        <div 
                          className={`h-full ${getProgressColor(item.stock, item.capacity)}`}
                          style={{ width: `${(item.stock / item.capacity) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getPriorityColor(item.priority)}`}>
                      {item.priority === 'Critical' ? <ShieldAlert size={12} /> : <CheckCircle2 size={12} />}
                      {item.priority}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="p-2 text-gray-400 hover:text-white hover:bg-military-700 rounded-lg transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
