import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AdminLayout from './components/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import Inventory from './pages/admin/Inventory'
import PendingOrders from './pages/admin/PendingOrders'
import AuditLogs from './pages/admin/AuditLogs'
import Vendors from './pages/admin/Vendors'
import Settings from './pages/admin/Settings'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="orders" element={<PendingOrders />} />
          <Route path="logs" element={<AuditLogs />} />
          <Route path="vendors" element={<Vendors />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        
        {/* Placeholder for Officer & Vendor routes */}
        <Route path="/officer" element={<div className="p-8 text-white text-2xl font-display">Officer Portal - Coming Soon</div>} />
        <Route path="/vendor" element={<div className="p-8 text-white text-2xl font-display">Vendor Portal - Coming Soon</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
