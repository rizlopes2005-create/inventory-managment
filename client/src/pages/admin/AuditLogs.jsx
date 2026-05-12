import React from 'react'
import { LogOut, LogIn, Edit3, Trash2, Download } from 'lucide-react'

export default function AuditLogs() {
  const logs = [
    { id: 1, user: 'Captain Singh', action: 'Checked Out', item: 'MRE Meals (500 units)', time: '2 hours ago', status: 'success' },
    { id: 2, user: 'Lt. Patel', action: 'Added Stock', item: 'Water Cans (200 units)', time: '4 hours ago', status: 'success' },
    { id: 3, user: 'Admin General', action: 'Modified', item: 'Wheat Flour - Updated quantity', time: '1 day ago', status: 'info' },
    { id: 4, user: 'Major Kumar', action: 'Deleted', item: 'Expired Rice supply record', time: '2 days ago', status: 'warning' },
    { id: 5, user: 'Lt. Desai', action: 'Checked Out', item: 'Canned Vegetables (100 units)', time: '3 days ago', status: 'success' },
  ];

  const getActionIcon = (action) => {
    switch(action) {
      case 'Checked Out': return <LogOut size={16} />;
      case 'Added Stock': return <LogIn size={16} />;
      case 'Modified': return <Edit3 size={16} />;
      case 'Deleted': return <Trash2 size={16} />;
      default: return null;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'success': return 'bg-green-500/20 text-green-300';
      case 'warning': return 'bg-orange-500/20 text-orange-300';
      case 'info': return 'bg-blue-500/20 text-blue-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-display font-bold text-white tracking-wide">AUDIT LOGS</h1>
          <p className="text-gray-400 mt-1">Complete history of all inventory operations and user actions.</p>
        </div>
        <button className="btn-primary">
          <Download size={18} />
          Export Log
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
          <p className="text-gray-400 text-sm">Total Actions</p>
          <p className="text-3xl font-bold text-white mt-2">1,247</p>
        </div>
        <div className="card p-6">
          <p className="text-gray-400 text-sm">This Month</p>
          <p className="text-3xl font-bold text-white mt-2">342</p>
        </div>
        <div className="card p-6">
          <p className="text-gray-400 text-sm">Today</p>
          <p className="text-3xl font-bold text-white mt-2">47</p>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-military-900 border-b border-military-700 text-gray-400 text-sm uppercase tracking-wider">
                <th className="p-4 font-medium">User</th>
                <th className="p-4 font-medium">Action</th>
                <th className="p-4 font-medium">Details</th>
                <th className="p-4 font-medium">Time</th>
                <th className="p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-military-700">
              {logs.map(log => (
                <tr key={log.id} className="hover:bg-military-900/50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-military-700 flex items-center justify-center text-xs text-gray-300 font-bold">
                        {log.user.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-white font-medium">{log.user}</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-300">{log.action}</td>
                  <td className="p-4 text-gray-400 text-sm">{log.item}</td>
                  <td className="p-4 text-gray-400 text-sm">{log.time}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2 w-fit ${getStatusColor(log.status)}`}>
                      {getActionIcon(log.action)}
                      {log.action}
                    </span>
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
