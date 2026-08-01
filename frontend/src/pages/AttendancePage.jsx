import { useState, useEffect } from 'react'
import { employeeService, attendanceService } from '../services/api'

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

function AttendancePage() {
  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth() + 1

  const [employees, setEmployees] = useState([])
  const [selectedYear, setSelectedYear] = useState(currentYear)
  const [selectedMonth, setSelectedMonth] = useState(currentMonth)
  const [attendanceData, setAttendanceData] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    employeeService.getAll()
      .then(res => setEmployees(res.data))
      .catch(err => console.error(err))
  }, [])

  useEffect(() => {
    if (employees.length === 0) return
    fetchAttendanceForAll()
  }, [employees, selectedYear, selectedMonth])

  const fetchAttendanceForAll = async () => {
    setLoading(true)
    const newData = {}
    for (const emp of employees) {
      try {
        const res = await attendanceService.getForEmployee(emp.id, selectedYear)
        const monthRecords = res.data.filter(r => {
          const d = new Date(r.date)
          return d.getMonth() + 1 === selectedMonth
        })
        newData[emp.id] = monthRecords
      } catch (err) {
        console.error(err)
      }
    }
    setAttendanceData(newData)
    setLoading(false)
  }

  const handleCodeChange = async (recordId, newCode) => {
    try {
      await attendanceService.update(recordId, { code: newCode })
      fetchAttendanceForAll()
    } catch (err) {
      console.error(err)
    }
  }

  const daysInMonth = getDaysInMonth(selectedYear, selectedMonth)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  const getCellColor = (code) => {
    switch (code) {
      case 'WORK_DAY': return 'bg-green-100'
      case 'DAY_OFF': return 'bg-gray-200'
      case 'ANNUAL_LEAVE': return 'bg-blue-100'
      case 'SICK_LEAVE': return 'bg-red-100'
      case 'MATERNITY_LEAVE': return 'bg-pink-100'
      default: return 'bg-yellow-100'
    }
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Sihterica</h1>
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
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Učitavanje...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="text-xs border-collapse">
            <thead>
              <tr>
                <th className="border px-3 py-2 bg-gray-100 text-left min-w-40 sticky left-0 z-10">
                  Radnik
                </th>
                {days.map(d => (
                  <th key={d} className="border px-1 py-2 bg-gray-100 min-w-8 text-center">
                    {d}
                  </th>
                ))}
                <th className="border px-3 py-2 bg-blue-50 text-left min-w-48 sticky right-0 z-10">
                  Ukupno
                </th>
              </tr>
            </thead>
            <tbody>
              {employees.map(emp => {
                const records = attendanceData[emp.id] || []
                const totals = calculateTotals(records)
                return (
                  <tr key={emp.id}>
                    <td className="border px-3 py-1 font-medium sticky left-0 bg-white z-10">
                      {emp.firstName} {emp.lastName}
                    </td>
                    {days.map(d => {
                      const record = records.find(r => new Date(r.date).getDate() === d)
                      if (!record) return (
                        <td key={d} className="border px-1 py-1 text-center">-</td>
                      )
                      return (
                        <td key={d} className={`border px-1 py-1 text-center ${getCellColor(record.code)}`}>
                          <select
                            value={record.code}
                            onChange={e => handleCodeChange(record.id, e.target.value)}
                            className="bg-transparent text-xs w-full cursor-pointer"
                          >
                            {ATTENDANCE_CODES.map(c => (
                              <option key={c.value} value={c.value}>{c.label}</option>
                            ))}
                          </select>
                        </td>
                      )
                    })}
                    <td className="border px-3 py-1 bg-blue-50 sticky right-0 z-10">
                      <div className="flex flex-wrap gap-x-3 gap-y-1">
                        {Object.entries(totals).map(([label, total]) => (
                          <span key={label} className="whitespace-nowrap">
                            <span className="font-semibold">{label}:</span> {total}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default AttendancePage