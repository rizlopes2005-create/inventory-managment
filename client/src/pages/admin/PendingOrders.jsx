import React from 'react'
import { Clock, Truck, MapPin, AlertCircle } from 'lucide-react'

export default function PendingOrders() {
  const orders = [
    { id: 1, item: 'Ready-to-Eat Meals', quantity: 500, vendor: 'SupplyCo', eta: '2 days', status: 'In Transit' },
    { id: 2, item: 'Drinking Water', quantity: 200, vendor: 'AquaLogistics', eta: '1 day', status: 'Processing' },
    { id: 3, item: 'Wheat Flour', quantity: 150, vendor: 'AgriCorp', eta: '3 days', status: 'Confirmed' },
    { id: 4, item: 'Canned Vegetables', quantity: 300, vendor: 'FoodNet', eta: '5 days', status: 'Pending' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-display font-bold text-white tracking-wide">PENDING ORDERS</h1>
          <p className="text-gray-400 mt-1">Track all active orders from vendors.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Orders</p>
              <p className="text-3xl font-bold text-white mt-2">{orders.length}</p>
            </div>
            <Clock className="text-blue-400" size={32} />
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">In Transit</p>
              <p className="text-3xl font-bold text-white mt-2">1</p>
            </div>
            <Truck className="text-green-400" size={32} />
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Pending</p>
              <p className="text-3xl font-bold text-white mt-2">2</p>
            </div>
            <AlertCircle className="text-orange-400" size={32} />
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Expected Value</p>
              <p className="text-2xl font-bold text-white mt-2">₹45.2K</p>
            </div>
            <MapPin className="text-red-400" size={32} />
          </div>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-military-900 border-b border-military-700 text-gray-400 text-sm uppercase tracking-wider">
                <th className="p-4 font-medium">Item</th>
                <th className="p-4 font-medium">Quantity</th>
                <th className="p-4 font-medium">Vendor</th>
                <th className="p-4 font-medium">ETA</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-military-700">
              {orders.map(order => (
                <tr key={order.id} className="hover:bg-military-900/50">
                  <td className="p-4 text-white font-medium">{order.item}</td>
                  <td className="p-4 text-gray-300">{order.quantity} units</td>
                  <td className="p-4 text-gray-300">{order.vendor}</td>
                  <td className="p-4 text-gray-300">{order.eta}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300">
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button className="text-blue-400 hover:text-blue-300 text-sm">View</button>
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
