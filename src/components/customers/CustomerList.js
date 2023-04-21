import { useState, useEffect } from "react"
import "./customers.css"
import { Customer } from "./Customer.js"
import { getAllCustomers } from "../ApiManager.js"

// contains a component function that fetches all customers and iterates
// the array in the JSX to display the name of each customer 
// by passing the customer object to the Customer component
export const CustomerList = () => {
    const [customers, setCustomers] = useState([])

    useEffect(() => {
        getAllCustomers()
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
                      <Customer customer={customer} />
                </section>
            ))}
            </article>
        </div>
        )
    }
