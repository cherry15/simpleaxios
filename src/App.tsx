import React, { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { baseUrl, Employee, employeesUrl } from './mocks/employee-data'
import styles from './styles/container.module.css'

const App = () => {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const getEmployees = async () => {
    let result
    try {
      setLoading(true)
      setError(false)
      result = await axios.get(`${baseUrl}${employeesUrl}`)
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
      setError(false)
    }
  }, [])

  return (
    <div className='app'>
      <h1>Welcome</h1>
      {loading && <span>Loading...</span>}
      {error && <span>Sorry there's been an error</span>}
      {employees.length > 0 && (
        <div className={styles.container}>
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
