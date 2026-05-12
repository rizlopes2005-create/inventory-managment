import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { LayoutDashboard, Package, ShoppingCart, Users, FileText, Settings, LogOut } from 'lucide-react'

export default function AdminLayout() {
  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Inventory', path: '/admin/inventory', icon: Package },
    { name: 'Pending Orders', path: '/admin/orders', icon: ShoppingCart },
    { name: 'Audit Logs', path: '/admin/logs', icon: FileText },
    { name: 'Vendors', path: '/admin/vendors', icon: Users },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-military-900 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-military-800 border-r border-military-700 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-military-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-accent-safe flex items-center justify-center">
              <span className="text-military-900 font-display font-bold text-lg">M</span>
            </div>
            <h1 className="font-display font-bold text-xl tracking-wider text-white">MIL-INV</h1>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-2">
            Admin Portal
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium ${
                    isActive 
                      ? 'bg-military-700 text-accent-safe border border-military-700/50' 
                      : 'text-gray-400 hover:text-white hover:bg-military-700/50'
                  }`
                }
              >
                <Icon size={20} />
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 border-t border-military-700">
          <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-gray-400 hover:text-red-400 hover:bg-military-700/50 transition-colors font-medium">
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-military-800 border-b border-military-700 flex items-center justify-between px-8">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-display text-gray-300">Command Center</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-sm font-medium text-white">Admin General</span>
              <span className="text-xs text-accent-safe font-mono">HQ-COMMAND</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-military-700 border-2 border-accent-safe flex items-center justify-center overflow-hidden">
              <img src="https://ui-avatars.com/api/?name=Admin+General&background=1f2937&color=22c55e" alt="Admin" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  )
}
