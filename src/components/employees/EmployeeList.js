import { useState, useEffect } from "react"
import { getAllEmployees } from "../ApiManager.js"
import "./employees.css"

export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])

    useEffect(() => {
        getAllEmployees()
            .then((employeeArray) => {
                setEmployees(employeeArray)
            })
    }, [])

    return (
        <article className="employees">
            {employees.map(employee => (
                <section className="employee" key={`employee--${employee.id}`}>
                    <div>
                        <div>Name: {employee.fullName}</div>
                        <div>Email: {employee.email}</div>
                    </div>
                </section>
            ))}
        </article>
    )
}
