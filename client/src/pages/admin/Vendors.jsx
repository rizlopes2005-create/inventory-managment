import React from 'react'
import { Phone, Mail, MapPin, Star, Edit2, MoreVertical } from 'lucide-react'

export default function Vendors() {
  const vendors = [
    { id: 1, name: 'SupplyCo Logistics', contact: '+91 98765 43210', email: 'supply@co.in', location: 'Delhi NCR', rating: 4.8, totalOrders: 42 },
    { id: 2, name: 'AgriCorp Foods', contact: '+91 96543 21098', email: 'contact@agricorp.in', location: 'Punjab', rating: 4.5, totalOrders: 28 },
    { id: 3, name: 'AquaLogistics', contact: '+91 94321 09876', email: 'info@aqualog.in', location: 'Mumbai', rating: 4.2, totalOrders: 15 },
    { id: 4, name: 'FoodNet Distribution', contact: '+91 92109 87654', email: 'sales@foodnet.in', location: 'Bangalore', rating: 4.6, totalOrders: 35 },
    { id: 5, name: 'ExpressDelivery Hub', contact: '+91 90987 65432', email: 'depot@express.in', location: 'Pune', rating: 4.3, totalOrders: 22 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-display font-bold text-white tracking-wide">VENDOR MANAGEMENT</h1>
          <p className="text-gray-400 mt-1">Manage and monitor all supplier relationships.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
          <p className="text-gray-400 text-sm">Active Vendors</p>
          <p className="text-3xl font-bold text-white mt-2">{vendors.length}</p>
        </div>
        <div className="card p-6">
          <p className="text-gray-400 text-sm">Avg Rating</p>
          <div className="flex items-center gap-2 mt-2">
            <p className="text-3xl font-bold text-white">4.5</p>
            <Star size={24} className="text-yellow-400 fill-yellow-400" />
          </div>
        </div>
        <div className="card p-6">
          <p className="text-gray-400 text-sm">Total Orders</p>
          <p className="text-3xl font-bold text-white mt-2">142</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {vendors.map(vendor => (
          <div key={vendor.id} className="card p-6 hover:border-military-600 transition-colors">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white">{vendor.name}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Phone size={16} />
                    <span className="text-sm">{vendor.contact}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Mail size={16} />
                    <span className="text-sm">{vendor.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <MapPin size={16} />
                    <span className="text-sm">{vendor.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-1">
                    <Star size={16} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-sm text-white font-medium">{vendor.rating}</span>
                  </div>
                  <span className="text-sm text-gray-400">{vendor.totalOrders} orders completed</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="btn-primary">
                  <Edit2 size={16} />
                </button>
                <button className="btn-danger">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
