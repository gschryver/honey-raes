import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

export const CustomerDetails = () => {
  const { customerId } = useParams() // access the 'id' parameter from the URL to fetch and display the customer details
  const [customer, setCustomer] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:8088/customers/${customerId}?_expand=user`)
      .then(res => res.json())
      .then(setCustomer)
  }, [customerId])

  return (
    customer ?
      <div className="customerDetails">
        <h2>{customer.user.fullName}</h2>
        <p class="customerLabel"><strong>Email:</strong> {customer.user.email}</p>
        <p class="customerLabel"><strong>Phone:</strong> {customer.phoneNumber}</p>
        <p class="customerLabel"><strong>Address:</strong> {customer.address}</p>
      </div>
      : <p>Loading...</p>
  )
}
