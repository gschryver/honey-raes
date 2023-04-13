import { useState, useEffect } from "react"
import "./employees.css"

export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])

    useEffect(() => {
        fetch("http://localhost:8088/users?isStaff=true")
            .then(res => res.json())
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
