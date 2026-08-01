import { useState, useEffect } from 'react'
import { sectorService, employeeService, attendanceService } from '../services/api'

const ATTENDANCE_CODES = [
  { value: 'WORK_DAY', label: '8' },
  { value: 'ANNUAL_LEAVE', label: 'GO' },
  { value: 'DAY_OFF', label: 'SL' },
  { value: 'SICK_LEAVE', label: 'BO' },
  { value: 'MATERNITY_LEAVE', label: 'Porodiljsko odsustvo' },
  { value: 'PAID_LEAVE', label: 'Plaćeno odsustvo' },
  { value: 'NIGHT_WORK', label: 'Rad noću' },
  { value: 'HOLIDAY_WORK', label: 'Rad na dan praznika' },
  { value: 'OVERTIME', label: 'Prekovremeni rad' },
  { value: 'FIELD_WORK', label: 'Terenski rad' },
  { value: 'ON_CALL_DUTY', label: 'Dežurstvo' },
  { value: 'STANDBY', label: 'Pripravnost' },
  { value: 'NON_WORKING_HOLIDAY', label: 'Neradni radi praznika' },
  { value: 'TEMPORARY_INCAPACITY', label: 'Privremena nesposobnost' },
  { value: 'UNPAID_LEAVE', label: 'Neplaćeno odsustvo' },
  { value: 'LEAVE_NO_FAULT_OF_EMPLOYEE', label: 'Odsustvo bez krivice radnika' },
  { value: 'OTHER_LEAVE', label: 'Odsustvo po drugom osnovu' },
]

const MONTHS = [
  'Januar', 'Februar', 'Mart', 'April', 'Maj', 'Juni',
  'Juli', 'August', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'
]

function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate()
}

function calculateTotals(records) {
  const totals = {}
  for (const record of records) {
    const label = ATTENDANCE_CODES.find(c => c.value === record.code)?.label || record.code
    totals[label] = (totals[label] || 0) + record.hours
  }
  return totals
}

function EmployeePrintCard({ employee, records, year, month }) {
  const daysInMonth = getDaysInMonth(year, month)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const totals = calculateTotals(records)

  const getLabel = (code) => {
    return ATTENDANCE_CODES.find(c => c.value === code)?.label || code
  }

  return (
    <div className="print-card bg-white p-6 mb-8 border border-gray-300">
      <div className="mb-4">
        <h2 className="text-lg font-bold">{employee.firstName} {employee.lastName}</h2>
        <div className="text-sm text-gray-600 flex gap-6 mt-1">
          <span>Sektor: <strong>{employee.sectorName}</strong></span>
          <span>Pozicija: <strong>{employee.position}</strong></span>
          <span>Period: <strong>{MONTHS[month - 1]} {year}</strong></span>
        </div>
      </div>

      <div className="overflow-x-auto mb-4">
        <table className="text-xs border-collapse w-full">
          <thead>
            <tr>
              {days.map(d => (
                <th key={d} className="border border-gray-400 px-1 py-1 text-center bg-gray-100 min-w-6">
                  {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {days.map(d => {
                const record = records.find(r => new Date(r.date).getDate() === d)
                return (
                  <td key={d} className="border border-gray-400 px-1 py-1 text-center">
                    {record ? getLabel(record.code) : '-'}
                  </td>
                )
              })}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="border-t pt-3">
        <p className="text-xs font-semibold mb-2">Ukupno:</p>
        <div className="flex flex-wrap gap-4">
          {Object.entries(totals).map(([label, total]) => (
            <span key={label} className="text-xs">
              <span className="font-semibold">{label}:</span> {total}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function PrintPage() {
  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth() + 1

  const [sectors, setSectors] = useState([])
  const [selectedSector, setSelectedSector] = useState('')
  const [selectedYear, setSelectedYear] = useState(currentYear)
  const [selectedMonth, setSelectedMonth] = useState(currentMonth)
  const [printData, setPrintData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    sectorService.getAll()
      .then(res => setSectors(res.data))
      .catch(err => console.error(err))
  }, [])

  const handleGenerate = async () => {
    if (!selectedSector) return
    setLoading(true)
    try {
      const empRes = await employeeService.getAll()
      const sectorEmployees = empRes.data.filter(
        e => e.sectorName === sectors.find(s => s.id === parseInt(selectedSector))?.name
        && e.status === 'ACTIVE'
      )

      const result = []
      for (const emp of sectorEmployees) {
        const attRes = await attendanceService.getForEmployee(emp.id, selectedYear)
        const monthRecords = attRes.data.filter(r => {
          const d = new Date(r.date)
          return d.getMonth() + 1 === selectedMonth
        })
        result.push({ employee: emp, records: monthRecords })
      }
      setPrintData(result)
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div>
      <div className="no-print flex items-center gap-4 mb-6 flex-wrap">
        <h1 className="text-2xl font-bold text-gray-800">Štampa</h1>
        <select
          value={selectedSector}
          onChange={e => setSelectedSector(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="">Izaberi sektor</option>
          {sectors.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
        <select
          value={selectedMonth}
          onChange={e => setSelectedMonth(parseInt(e.target.value))}
          className="border rounded px-3 py-2"
        >
          {MONTHS.map((m, i) => (
            <option key={i + 1} value={i + 1}>{m}</option>
          ))}
        </select>
        <select
          value={selectedYear}
          onChange={e => setSelectedYear(parseInt(e.target.value))}
          className="border rounded px-3 py-2"
        >
          {[currentYear - 1, currentYear, currentYear + 1].map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
        <button
          onClick={handleGenerate}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Generiši
        </button>
        {printData.length > 0 && (
          <button
            onClick={handlePrint}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Štampaj
          </button>
        )}
      </div>

      {loading && (
        <div className="text-center py-12 text-gray-500">Učitavanje...</div>
      )}

      {printData.map(({ employee, records }) => (
        <EmployeePrintCard
          key={employee.id}
          employee={employee}
          records={records}
          year={selectedYear}
          month={selectedMonth}
        />
      ))}
    </div>
  )
}

export default PrintPage