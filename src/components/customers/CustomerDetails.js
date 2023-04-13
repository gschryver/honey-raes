import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

// displays the full name, email, phone number, and address of customer when 
// the customer's name is clicked in the list view 
export const CustomerDetails = () => {
  const { customerId } = useParams() // extracts the 'customerId' parameter from the URL
  const [customer, setCustomer] = useState(null) // initializes state for the customer

  // fetches the customer with the specified ID and the associated user object
  useEffect(() => {
    fetch(`http://localhost:8088/customers/${customerId}?_expand=user`)
      .then(res => res.json())
      .then(setCustomer)
  }, [customerId])

    return customer && (
        <div className="customerDetails">
          <h2>{customer.user.fullName}</h2> 
          <p class="customerLabel"><strong>Email:</strong> {customer.user.email}</p> 
          <p class="customerLabel"><strong>Phone:</strong> {customer.phoneNumber}</p> 
          <p class="customerLabel"><strong>Address:</strong> {customer.address}</p> 
        </div>
      )
}
