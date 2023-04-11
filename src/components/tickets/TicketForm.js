import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const TicketForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
   // Creating a state variable with the useState hook
    const [ticket, update] = useState({
        description: "",
        emergency: false
    })
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the ticket list
    */
    
    // TODO: Add the code to save the ticket to the API
    const navigate = useNavigate()
    // Retrieving the user object from local storage
    const localHoneyUser = localStorage.getItem("honey_user")
    // Converting the user object from a string to an object
    const honeyUserObject = JSON.parse(localHoneyUser)

    const handleSaveButtonClick = (event) => { // This function is called when the user clicks the save button
        event.preventDefault() // Prevent browser from submitting the form
        console.log("You clicked the button")

        // TODO: Create the object to be saved to the API
        const ticketToSendToAPI = {
            userId: honeyUserObject.id,
            description: ticket.description,
            emergency: ticket.emergency,
            dateCompleted: ""
        }
            
        // TODO: Perform the fetch() to POST the object to the API
        return fetch("http://localhost:8088/serviceTickets", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticketToSendToAPI)

            })
            .then(response => response.json())
            .then(() => {
                navigate("/tickets")        
    })
}

    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">New Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Brief description of problem"
                        value={ticket.description}
                        onChange={
                            (event) => {
                                // Update the state of the ticket
                                const copy = { ...ticket }
                                // Update the copy's description property
                                copy.description = event.target.value
                                // Update the state
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Emergency:</label>
                    <input type="checkbox"
                        value={ticket.emergency}
                        onChange={
                            (event) => {
                                // Update the state of the ticket
                                const copy = { ...ticket }
                                // Update the copy's emergency property
                                copy.emergency = event.target.checked
                                // Update the state
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button onClick ={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Submit Ticket
            </button>
        </form>
    )
}