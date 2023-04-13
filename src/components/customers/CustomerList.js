import { useState, useEffect } from "react"
import { Customer } from "./Customer.js"
import "./customers.css"

export const CustomerList = () => {
    const [customers, setCustomers] = useState([])

    useEffect(() => {
        fetch("http://localhost:8088/users?isStaff=false")
            .then(res => res.json())
            .then((customerArray) => {
                setCustomers(customerArray)
            })
    }, [])

    return (
        <article className="customers">
            {customers.map(customer => (
                <section className="customer" key={`customer--${customer.id}`}>
                    <div>
                        <div>Name: {customer.fullName}</div>
                    </div>
                </section>
            ))}
        </article>
    )
}
