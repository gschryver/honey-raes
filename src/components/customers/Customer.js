import { Link } from "react-router-dom"

export const Customer = ({ customer }) => {
    return (
      <div className="customerLink">
            <Link to={`/customers/${customer.id}`}>{customer.fullName}</Link>
      </div>
    )
  }