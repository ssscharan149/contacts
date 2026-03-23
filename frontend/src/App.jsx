import { NavLink, Outlet } from 'react-router-dom'

function App() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <h1 className="text-xl font-semibold text-slate-900">Contacts App</h1>
          <nav className="flex items-center gap-2">
            <NavLink
              to="/contacts"
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm font-medium ${
                  isActive ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'
                }`
              }
            >
              All Contacts
            </NavLink>
            <NavLink
              to="/contacts/new"
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm font-medium ${
                  isActive ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'
                }`
              }
            >
              Add Contact
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}

export default App
