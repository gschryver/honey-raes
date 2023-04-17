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

    // function that determines if the current user can close the ticket
    const canClose = () => {
        if (!currentUser.staff) {
            // if the current user is not staff, then the finish button doesn't render
            return ""
        }
        if (ticketObject.dateCompleted !== "") {
            // if the ticket has already been completed
            if (ticketObject.completedBy) {
                // if the ticketObject has a completedBy property (i.e., it has been completed and the employee who completed it is known), then display that employee's name
                return <div className="ticket__completed">Ticket completed by {ticketObject.completedBy}.</div>
            } else {
                // if the ticketObject doesn't have a completedBy property (i.e., it has been completed but the employee who completed it is unknown), then try to find the completedBy employee by looking up the employeeTickets relationship and the employees array
                const assignedEmployeeTicket = ticketObject.employeeTickets.find(
                    (et) => et.serviceTicketId === ticketObject.id
                )
                if (assignedEmployeeTicket) { 
                    const completedByEmployee = employees.find(
                        (employee) => employee.id === assignedEmployeeTicket.employeeId 
                    )
                    if (completedByEmployee) {
                        return (
                            <div className="ticket__completed">
                                Ticket completed by {completedByEmployee.user.fullName}.
                            </div>
                        )
                    }
                }
                // if the completedBy employee can't be found in the employees array, display "Ticket completed by an unknown employee."
                return <div className="ticket__completed">Ticket completed by an unknown employee.</div>
            }
        } else if (userEmployee?.id === assignedEmployee?.id && ticketObject.dateCompleted === "") {
            // if the current user primary key is the same as the primary key of the assigned employee and the date completed is empty, then the ticket is still open - display the finish button
            return <button onClick={closeTicket} className="ticket__finish">Finish</button>
        } else {
            return ""
        }
    }

        // conditional rendering for the 'Currently being worked on by' message
        const showAssignedEmployee = () => {
            if (ticketObject.employeeTickets.length && ticketObject.dateCompleted === "") {
                // if the ticket is currently being worked on by an employee (i.e., the employeeTickets array has a length greater than 0) and the ticket hasn't 
                // been completed yet (i.e., dateCompleted is empty), then display the 'Currently being worked on by' message
                return (
                    <div className="currentWork">
                        Currently being worked on by {assignedEmployee ? assignedEmployee?.user?.fullName : ""}.
                    </div>
                )
            } else {
                // if the ticket isn't currently being worked on by an employee or it has already been completed, then don't display anything
                return ""
            }
        }
    

    // function that updates the ticket with a new date completed
    // and closes it 
    const closeTicket = () => {
        const copy = {
            userId: ticketObject.userId,
            description: ticketObject.description,
            emergency: ticketObject.emergency,
            dateCompleted: new Date().toLocaleDateString("en-US"),
            completedBy: assignedEmployee ? assignedEmployee.user.fullName : "Unknown Employee" // show who completed the ticket after it has been finished
        }

        return fetch(`http://localhost:8088/serviceTickets/${ticketObject.id}`, {
            method: "PUT", // update
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(copy)
        })
            .then(response => response.json())
            // the api has been updated, so we need to get the state from the API again
            .then(getAllTickets) // passing a function reference to then - this is the same as .then(() => getAllTickets())
        }
    

    // so we can avoid nested ternary statements, we're going to create a function that will return the button based on certain conditions (e.g. if the user is a staff member)
    // updating this so that the claim button disappears when claimed 
    const buttonOrNoButton = () => {
        if (currentUser.staff && ticketObject.employeeTickets.length === 0) { 
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
    <header className="ticketHeaderName">
        {
            currentUser.staff
            ? `Ticket ${ticketObject.id}`
            : <Link to={`/tickets/${ticketObject.id}/edit`}>Ticket {ticketObject.id}</Link>
        }
    </header>
    <section>{ticketObject.description}</section>
    <section><strong>Emergency:</strong> {ticketObject.emergency ? "🧨" : "No"}</section>
    <footer className="completedMessage">
            {showAssignedEmployee()}
            {buttonOrNoButton()}
            {canClose()}
        </footer>

    </section>
}

