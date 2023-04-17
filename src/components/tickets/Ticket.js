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
            /* weird errors abound? re-worked this so it still shows the assigned employee
            but plays nice when the views are changing */ 
            ? `Currently being worked on by ${assignedEmployee  ? assignedEmployee.user.fullName : ""}`
            : <button>Claim</button>
        }
    </footer>
    </section>
}

