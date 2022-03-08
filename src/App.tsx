import React, { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { Employee } from './mocks/employee-data'

const App = () => {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const getEmployees = async () => {
    let result
    try {
      setLoading(true)
      setError(false)
      result = await axios.get('/api/employees')
      setEmployees(result.data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setError(true)
    }
  }

  useEffect(() => {
    getEmployees()
    return () => {
      setEmployees([])
      setLoading(false)
    }
  }, [])

  return (
    <div className='App'>
      <h1>Welcome</h1>
      {loading && <span>Loading...</span>}
      {employees.length > 0 && (
        <div>
          {employees.map((employee: Employee) => {
            return (
              <div key={employee.id}>
                <img src={employee.imageUrl} alt={employee.name} />
                <h3>{employee.name}</h3>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default App
