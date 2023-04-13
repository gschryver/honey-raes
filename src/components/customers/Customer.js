export const Customer = ({ customer, customerDetails }) => {
    return (
        <div onClick={() => customerDetails(customer)}>
            Name: {customer.fullName}
        </div>
    )
}
