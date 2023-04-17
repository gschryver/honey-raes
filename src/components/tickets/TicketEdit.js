import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

// in react components are designed so that copies of the state object are created and updated, but the original state is not updated directly  
const TicketEdit = () => { // this component will allow the user to edit a service ticket
    const [ticket, assignTicket] = useState({  // assignTicket updates the ticket state variable when the user enters something new into the form
        description: "", 
        emergency: false
    })

    const { ticketId } = useParams() // useParams() is a hook that returns an object of key/value pairs of URL parameters, e.g. { ticketId: "1" }
    const navigate = useNavigate()

    // get the data for a specific service ticket 
    useEffect(() => {
        fetch(`http://localhost:8088/serviceTickets/${ticketId}`)
            .then(response => response.json())
            .then((data) => {
                assignTicket(data) // assigns the data to the ticket state variable (e.g. { description: "", emergency: false })
            })
    }, [ticketId]) // ensures that the useEffect hook only runs when the ticketId changes

    const handleSaveButtonClick = (event) => { // this will save the edited ticket data to the API & redirect user to tickets page
        event.preventDefault()

        return fetch(`http://localhost:8088/serviceTickets/${ticket.id}`, { // PUT request to replace existing ticket data with new data entered into the ticketedit form)
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticket) // converts the ticket object to a JSON string
        })
            .then(response => response.json())
            .then(() => {
                navigate("/tickets")
            })
    }

    return <form className="ticketForm">
        <h2 className="ticketForm__title">Service Ticket</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                    required autoFocus
                    type="text"
                    style={{
                        height: "10rem"
                    }}
                    className="form-control"
                    value={ticket.description}
                    onChange={
                        (evt) => {
                            const copy = { ...ticket }
                            copy.description = evt.target.value
                            assignTicket(copy) // copies the existing ticket object and updates the description property
                        }
                    }>{ticket.description}</textarea>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="name">Emergency:</label>
                <input type="checkbox"
                    checked={ticket.emergency}
                    onChange={
                        (evt) => {
                            const copy = { ...ticket }
                            copy.emergency = evt.target.checked
                            assignTicket(copy) // copies the existing ticket object and updates the emergency property
                        }
                    } />
            </div>
        </fieldset>
        <button
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)} // sends the updated ticket data to the API using PUT & redirects user to tickets page
            className="btn btn-primary">
            Save Edits
        </button>
    </form>
}

export default TicketEdit