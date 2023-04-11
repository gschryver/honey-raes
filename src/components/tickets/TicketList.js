import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Tickets.css"

// Creating the TicketList functional component
export const TicketList = () => {
    // Declaring two state variables with the useState hook
    const [tickets, setTickets] = useState([])
    const [filteredTickets, setFiltered] = useState([])
    const [emergency, setEmergency] = useState(false)
    const [openOnly, updateOpenOnly] = useState(false)
    const navigate = useNavigate()

    // Retrieving the user object from local storage
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    // Filtering ticket data based on the emergency state variable using the useEffect hook
    useEffect ( 
        () => { 
            if (emergency) {
                // If the emergency state variable is true, filter tickets by emergency status
                const emergencyTickets = tickets.filter(ticket => ticket.emergency === true)
                // Update the filteredTickets state variable
                setFiltered(emergencyTickets)
            }
        },
        // When this array contains a dependency (in this case, emergency), you are observing state changes
        [emergency]
    )
    
    // Fetching ticket data from an API using the useEffect hook
    useEffect(
        () => {
            fetch(`http://localhost:8088/serviceTickets`)
                .then(response => response.json())
                .then((ticketArray) => {
                    setTickets(ticketArray)
                })
        },
        [] // When this array is empty, you are observing initial component state
    )

    // Filtering ticket data based on the user object using the useEffect hook
    // useEffect is observing the tickets state variable
    useEffect(
        () => {
            if (honeyUserObject.staff) {
                // If the user is a staff member, display all tickets
                setFiltered(tickets)
            }
            else {
                // If the user is a customer, filter tickets by user ID
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFiltered(myTickets)
            }
        },
        [tickets] // When this array contains a dependency (in this case, tickets), you are observing state changes
    )

    // Filtering ticket data based on the openOnly state variable using the useEffect hook
    useEffect(
        () => { 
            if (openOnly){ // If the openOnly state variable is true, filter tickets by date completed
            const openTicketArray = tickets.filter(ticket => {
                return ticket.userId === honeyUserObject.id && ticket.dateCompleted === ""
            })
            setFiltered(openTicketArray)  
        } else { // If the openOnly state variable is false, filter tickets by user ID
            const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
            setFiltered(myTickets)
        }
        },
    [openOnly]
    )

    // Rendering the filtered ticket data
    // If the user is a staff member, display the Emergency Only and All Tickets buttons
    // Else if the user is a customer, display the Create Ticket and Open Ticket buttons
    return <>
        { 
            honeyUserObject.staff
        ? <>
            <button onClick = { () => { setEmergency(true) } }>Emergency Only</button>
            <button onClick = { () => { setEmergency(false) } }>All Tickets</button>
         </>
        : <>
            <button onClick={ () => navigate("/ticket/create") }>Create Ticket</button>
            <button onClick={ () => { updateOpenOnly(true) } }>Open Ticket</button>
            <button onClick={ () => { updateOpenOnly(false) } }>All My Tickets</button>
        </>
        }

            <h2>List of Tickets</h2>
            <article className="tickets">
                {
                filteredTickets.map((ticket) => {
                    return <section className="ticket" key={`ticket--${ticket.id}`}>
                        <header>{ticket.description}</header>
                        <footer>Emergency: {ticket.emergency ? "! 🧨 !" : "🥰"}</footer>
                    </section>
                })
                }
            </article>
        </>
}
