import { useState, useEffect } from "react"
import "./customers.css"
import { Link } from "react-router-dom"

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
        <div>
            <h2 className="customersTitle">Customers</h2>
            <article className="customers">
            {customers.map(customer => (
                <section className="customer" key={`customer--${customer.id}`}>
                <div>
                    <div>
                    <Link to={`/customers/${customer.id}`}>{customer.fullName}</Link>
                    </div>
                </div>
                </section>
            ))}
            </article>
        </div>
        )
    }
