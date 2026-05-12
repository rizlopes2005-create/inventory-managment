import React, { useState } from 'react'
import { Save, Shield, Bell, Lock, User, Database } from 'lucide-react'

export default function Settings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [lowStockAlert, setLowStockAlert] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold text-white tracking-wide">SETTINGS</h1>
        <p className="text-gray-400 mt-1">Configure system preferences and security settings.</p>
      </div>

      {/* General Settings */}
      <div className="card p-8">
        <h2 className="text-xl font-display font-bold text-white mb-6 flex items-center gap-2">
          <User size={24} />
          General Settings
        </h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">System Name</label>
            <input type="text" value="Military Inventory Management" className="military-input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Admin Email</label>
            <input type="email" value="admin@military.gov.in" className="military-input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Organization</label>
            <input type="text" value="Ministry of Defence" className="military-input" />
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="card p-8">
        <h2 className="text-xl font-display font-bold text-white mb-6 flex items-center gap-2">
          <Bell size={24} />
          Notifications
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-military-900 rounded-lg border border-military-700">
            <div>
              <p className="text-white font-medium">Email Notifications</p>
              <p className="text-sm text-gray-400">Receive updates via email</p>
            </div>
            <input type="checkbox" checked={emailNotifications} onChange={() => setEmailNotifications(!emailNotifications)} className="w-5 h-5" />
          </div>
          <div className="flex items-center justify-between p-4 bg-military-900 rounded-lg border border-military-700">
            <div>
              <p className="text-white font-medium">Low Stock Alerts</p>
              <p className="text-sm text-gray-400">Alert when stock drops below 20%</p>
            </div>
            <input type="checkbox" checked={lowStockAlert} onChange={() => setLowStockAlert(!lowStockAlert)} className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="card p-8">
        <h2 className="text-xl font-display font-bold text-white mb-6 flex items-center gap-2">
          <Shield size={24} />
          Security
        </h2>
        <div className="space-y-4">
          <button className="w-full btn-primary justify-center">
            <Lock size={18} />
            Change Password
          </button>
          <button className="w-full btn-danger justify-center">
            <Database size={18} />
            Clear Cache
          </button>
        </div>
      </div>

      {/* System Settings */}
      <div className="card p-8">
        <h2 className="text-xl font-display font-bold text-white mb-6">System Configuration</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-military-900 rounded-lg border border-military-700">
            <div>
              <p className="text-white font-medium">Maintenance Mode</p>
              <p className="text-sm text-gray-400">Temporarily disable access for maintenance</p>
            </div>
            <input type="checkbox" checked={maintenanceMode} onChange={() => setMaintenanceMode(!maintenanceMode)} className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex gap-4">
        <button className="btn-primary">
          <Save size={18} />
          Save Changes
        </button>
        <button className="btn-danger">
          Reset to Defaults
        </button>
      </div>
    </div>
  )
}
