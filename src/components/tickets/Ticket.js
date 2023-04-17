import { Link } from "react-router-dom"

export const Ticket = ({ ticketObject, isStaff, employees }) => {

    let assignedEmployee = null

    // check if the ticket has an employee assigned to it
    if (ticketObject.employeeTickets.length > 0) {  // if the ticket has an employee assigned to it, then the employeeTickets array will have a length greater than 0
        const ticketEmployeeRelationship = ticketObject.employeeTickets[0] // the employeeTickets array will only ever have one item in it, so we can access it by using the index 0
        assignedEmployee = employees.find(employee => employee.id === ticketEmployeeRelationship.employeeId) // find the employee object that matches the employeeId of the ticketEmployeeRelationship object
    }

   return <section className="ticket" key={`ticket--${ticketObject.id}`}>
    <header>
        {
            isStaff
            ? `Ticket ${ticketObject.id}`
            : <Link to={`/tickets/${ticketObject.id}/edit`}>Ticket {ticketObject.id}</Link>
        }
    </header>
    <section>{ticketObject.description}</section>
    <section><strong>Emergency:</strong> {ticketObject.emergency ? "🧨" : "No"}</section>
    <footer>
        {
            ticketObject.employeeTickets.length 
            /* null was throwing an error here for undefined, so we changed it to a string instead. the reason for this 
            was because the assignedEmployee variable is intended to hold an object representing an employee. if there is 
            no employee assigned to the ticket, then the assignedEmployee variable will be null. however, null is not
            a valid value for the user.fullName property, so we changed it to an empty string. et voila, no more error */ 
            ? `Currently being worked on by ${assignedEmployee !== "" ? assignedEmployee.user.fullName : ""}`
            : <button>Claim</button>
        }
    </footer>
    </section>
}

