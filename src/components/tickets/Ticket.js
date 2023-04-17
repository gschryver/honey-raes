import { Link } from "react-router-dom"

export const Ticket = ({ ticketObject, currentUser, employees, getAllTickets }) => {
    
    // find the assigned employee for the current ticket
    let assignedEmployee = null

    // check if the ticket has an employee assigned to it
    if (ticketObject.employeeTickets.length > 0) {  // if the ticket has an employee assigned to it, then the employeeTickets array will have a length greater than 0
        const ticketEmployeeRelationship = ticketObject.employeeTickets[0] // the employeeTickets array will only ever have one item in it, so we can access it by using the index 0
        assignedEmployee = employees.find(employee => employee.id === ticketEmployeeRelationship.employeeId) // find the employee object that matches the employeeId of the ticketEmployeeRelationship object
    }

    // find the employee profile object for the current user 
    const userEmployee = employees.find(employee => employee.userId === currentUser.id) // find the employee object that matches the userId of the currentUser object
    // so we can avoid nested ternary statements, we're going to create a function that will return the button based on certain conditions (e.g. if the user is a staff member)
    const buttonOrNoButton = () => {
        if (currentUser.staff) {
            return <button
            onClick={() => {
                fetch(`http://localhost:8088/employeeTickets`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        employeeId: userEmployee.id, 
                        serviceTicketId: ticketObject.id
                })
            }) 
            .then(response => response.json())
            .then(() => {
                // GET the state from the API again
                getAllTickets()

            })
        }}
            >Claim</button>
        } else {
            return ""
        }
    }

   return <section className="ticket" key={`ticket--${ticketObject.id}`}>
    <header>
        {
            currentUser.staff
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
            ? `Currently being worked on by ${assignedEmployee  ? assignedEmployee?.user?.fullName : ""}`
            : buttonOrNoButton()
        }
    </footer>
    </section>
}

