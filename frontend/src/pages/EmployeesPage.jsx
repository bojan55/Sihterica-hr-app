import { useState, useEffect } from 'react'
import { employeeService, sectorService } from '../services/api'

function EmployeesPage() {
  const [employees, setEmployees] = useState([])
  const [sectors, setSectors] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    sectorId: '',
    position: '',
    employmentDate: '',
    status: 'ACTIVE'
  })

  useEffect(() => {
    fetchEmployees()
    fetchSectors()
  }, [])

  const fetchEmployees = () => {
    employeeService.getAll()
      .then(res => setEmployees(res.data))
      .catch(err => console.error(err))
  }

  const fetchSectors = () => {
    sectorService.getAll()
      .then(res => setSectors(res.data))
      .catch(err => console.error(err))
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    employeeService.create({
      ...form,
      sectorId: parseInt(form.sectorId)
    })
      .then(() => {
        fetchEmployees()
        setShowForm(false)
        setForm({
          firstName: '',
          lastName: '',
          sectorId: '',
          position: '',
          employmentDate: '',
          status: 'ACTIVE'
        })
      })
      .catch(err => console.error(err))
  }

  const handleDelete = (id) => {
    employeeService.delete(id)
      .then(() => fetchEmployees())
      .catch(err => console.error(err))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Spisak radnika</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {showForm ? 'Otkaži' : '+ Dodaj radnika'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded shadow p-6 mb-6 grid grid-cols-2 gap-4">
          <input
            name="firstName"
            placeholder="Ime"
            value={form.firstName}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          />
          <input
            name="lastName"
            placeholder="Prezime"
            value={form.lastName}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          />
          <select
            name="sectorId"
            value={form.sectorId}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          >
            <option value="">Izaberi sektor</option>
            {sectors.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
          <input
            name="position"
            placeholder="Pozicija"
            value={form.position}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          />
          <input
            name="employmentDate"
            type="date"
            value={form.employmentDate}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          />
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          >
            <option value="ACTIVE">Aktivan</option>
            <option value="INACTIVE">Neaktivan</option>
          </select>
          <button
            onClick={handleSubmit}
            className="col-span-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Sačuvaj
          </button>
        </div>
      )}

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left">Ime i prezime</th>
              <th className="px-4 py-3 text-left">Sektor</th>
              <th className="px-4 py-3 text-left">Pozicija</th>
              <th className="px-4 py-3 text-left">Datum zaposlenja</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Akcije</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">{emp.firstName} {emp.lastName}</td>
                <td className="px-4 py-3">{emp.sectorName}</td>
                <td className="px-4 py-3">{emp.position}</td>
                <td className="px-4 py-3">{emp.employmentDate}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    emp.status === 'ACTIVE'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {emp.status === 'ACTIVE' ? 'Aktivan' : 'Neaktivan'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleDelete(emp.id)}
                    className="text-red-500 hover:text-red-700 text-xs"
                  >
                    Deaktiviraj
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default EmployeesPage