// EXPLANATION
// This code is for a form that allows users to create a new ticket. The form has two fields, one for the description of the 
// issue and the other is a checkbox for whether the issue is an emergency or not.

// When the user clicks on the "Submit Ticket" button, the handleSaveButtonClick function is called. 
// This function prevents the browser from submitting the form and creates a new ticket object that will 
// be sent to the server for saving. The object contains the user's ID, the description of the issue, the 
// emergency status (either true or false), and the date the ticket was completed, which is left empty since the 
// ticket has not yet been completed.

// The fetch() function is used to send the ticket object to the server. Once the server confirms that the ticket was saved successfully, 
// the user is redirected to the ticket list.

// The useState hook is used to create a state variable called ticket that keeps track of the form inputs. 
// This allows the description and emergency status to be updated in real time as the user types in the form fields.

// Finally, the useNavigate hook is used to redirect the user to the ticket list after the new ticket is saved to the server.

// INDEX
// Importing necessary modules
// Defining TicketForm component as a function component
// Using the useState hook to define a state variable ticket and a function update to update it
// Using the useNavigate hook to get the navigate function which can be used to redirect the user to a different page
// Getting the user object from local storage and converting it from a string to an object using JSON.parse
// Defining a function handleSaveButtonClick to handle the submit button click event
// Creating an object ticketToSendToAPI with the data entered by the user, which will be sent to the API
// Using the fetch function to POST the data to the API and redirecting the user to the ticket list page upon successful submission
// Rendering the ticket form with input fields for description and emergency, and a submit button to save the ticket data. 
// The onChange event on the input fields updates the ticket state with the entered data.

import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const TicketForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
   // Creating a state variable with the useState hook
    const [ticket, update] = useState({ //  This state variable will hold the form inputs
        description: "",
        emergency: false
    })
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the ticket list
    */
    
    // TODO: Add the code to save the ticket to the API
    const navigate = useNavigate() // This hook is used to redirect the user to the ticket list
    // Retrieving the user object from local storage
    const localHoneyUser = localStorage.getItem("honey_user") // Retrieving the user object from local storage
    // Converting the user object from a string to an object
    const honeyUserObject = JSON.parse(localHoneyUser) // 

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