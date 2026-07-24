import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [sectors, setSectors] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8080/api/sectors')
      .then(response => setSectors(response.data))
      .catch(error => console.error('Greška:', error))
  }, [])

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div>
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Sihterica</h1>
        <ul>
          {sectors.map(sector => (
            <li key={sector.id}>{sector.name}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App