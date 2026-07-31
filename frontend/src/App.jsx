import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import EmployeesPage from './pages/EmployeesPage'
import AttendancePage from './pages/AttendancePage'
import PrintPage from './pages/PrintPage'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">

        <nav className="bg-blue-700 text-white px-6 py-4 flex gap-6 shadow-md">
          <span className="font-bold text-xl mr-6">Sihterica</span>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "underline font-semibold" : "hover:underline"
            }
          >
            Radnici
          </NavLink>
          <NavLink
            to="/sihterica"
            className={({ isActive }) =>
              isActive ? "underline font-semibold" : "hover:underline"
            }
          >
            Sihterica
          </NavLink>
          <NavLink
            to="/stampa"
            className={({ isActive }) =>
              isActive ? "underline font-semibold" : "hover:underline"
            }
          >
            Štampa
          </NavLink>
        </nav>

        <main className="p-6">
          <Routes>
            <Route path="/" element={<EmployeesPage />} />
            <Route path="/sihterica" element={<AttendancePage />} />
            <Route path="/stampa" element={<PrintPage />} />
          </Routes>
        </main>

      </div>
    </BrowserRouter>
  )
}

export default App