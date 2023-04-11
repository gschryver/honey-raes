// EXPLANATION 
// This is a React component that displays a list of service tickets. 
// The component has four state variables: tickets, filteredTickets, emergency, and openOnly.

// tickets is an array that will hold the ticket data retrieved from an API. 
// filteredTickets is an array that will hold a subset of tickets depending on the user and filtering options. 
// emergency is a boolean value that determines whether only emergency tickets will be displayed. 
// openOnly is a boolean value that determines whether only open tickets will be displayed.

// The component fetches ticket data from an API using the useEffect hook. It also filters the ticket data based on the user's 
// status and filtering options using the useEffect hook. The filtered ticket data is then displayed on the webpage.

// If the user is a staff member, two buttons will be displayed: "Emergency Only" and "All Tickets." 
// If the user is a customer, three buttons will be displayed: "Create Ticket," "Open Ticket," and "All My Tickets."

// When the user clicks on a button, the emergency or openOnly state variable will change, 
// and the useEffect hook will run again to filter the ticket data.

// <> is a React fragment that allows multiple elements to be returned from a 
// component without creating an extra node in the DOM.
// It's like a wrapper that doesn't show up in the HTML, like a div or span. 

// INDEX
// Importing necessary hooks and styling
// Defining state variables for tickets and filtered tickets
// Retrieving user object from local storage
// Defining state variables for emergency and openOnly status
// Using useEffect hook to filter tickets based on emergency status
// Using useEffect hook to fetch tickets from an API
// Using useEffect hook to filter tickets based on user object
// Using useEffect hook to filter tickets based on openOnly status
// Rendering filtered ticket data and conditional buttons based on user object
// Returning JSX for the component.


import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Tickets.css"

// Creating the TicketList functional component
export const TicketList = () => {
    // Declaring two state variables with the useState hook
    const [tickets, setTickets] = useState([]) // This state variable will hold the ticket data retrieved from an API
    const [filteredTickets, setFiltered] = useState([]) // This state variable will hold a subset of tickets depending on the user and filtering options 
    const [emergency, setEmergency] = useState(false) // This state variable will determine whether only emergency tickets will be displayed   
    const [openOnly, updateOpenOnly] = useState(false) // This state variable will determine whether only open tickets will be displayed
    const navigate = useNavigate()

    // Retrieving the user object from local storage
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    // Filtering ticket data based on the emergency state variable using the useEffect hook
    useEffect ( // This function is called when the emergency state variable changes 
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
    useEffect( // This function is called when the component is first rendered
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
    useEffect( // This function is called when the tickets state variable changes
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
    useEffect( // 
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
