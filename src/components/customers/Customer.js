import { Link } from "react-router-dom" // Imports the Link component from react-router-dom to create links to other views

// Create a functional component called Customer that accepts a customer object as a prop
export const Customer = ({ customer }) => {
  
  console.log(customer)
    return (
      <div className="customerLink"> 
            { /*Link component that displays the customer's 
            full name and links to the customer details 
            page*/ }
            <Link to={`/customers/${customer.id}`}>{customer.user.fullName}</Link> 
      </div>
    )
}
