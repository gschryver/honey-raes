import { useEffect, useState } from "react"

export const CustomerForm = () => {
    // TODO: Provide initial state for profile

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)
    const [customerId, setCustomerId]= useState(null)
    const [feedback, setFeedback] = useState("")


    // fun phone number stuff using regex! 
    const formatPhone = (input) => {
        // Remove non-numeric characters
        const cleanedInput = input.replace(/\D+/g, '')
        // Format the cleaned input as XXX-XXX-XXXX
        const formattedInput = cleanedInput.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3') // regex - accept 3 numbers, followed by 3 more, followed by 4; format as 3-3-4
        return formattedInput
    }
    
    const [customerProfile, updateCustomerProfile] = useState({
        address: "",
        phoneNumber: "",
        userId: honeyUserObject.id
    })

    
    useEffect(() => {
        if (feedback !== "") {
        // Clear feedback to make entire element disappear after 3 seconds
        setTimeout(() => setFeedback(""), 3000)
        }
    }, [feedback])

    // TODO: Get customer profile info from API and update state
    useEffect(() => {
        // retrieves customer profile information from API using the logged-in user's ID
        fetch(`http://localhost:8088/customers?userId=${honeyUserObject.id}`)
            .then(response => response.json())
            .then(data => { 
                // extracts the first object in the data array (there should only be one object)
                const customerObject = data[0]
                // sets the customerId state variable to the ID of the customer
                setCustomerId(customerObject.id) 
                // updates the customer profile state with the fetched customer object, preserving the userId property so no more funkiness when trying to update form
                updateCustomerProfile({ 
                    ...customerObject, 
                    userId: honeyUserObject.id
                })
            })
    }, [])
    
    const handleSaveButtonClick = (event) => {
        event.preventDefault()
    
        
    
        fetch(`http://localhost:8088/customers/${customerId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customerProfile)
        })
            .then(() => {
                 // reset the customer profile state to empty values, preserving the userId property
                updateCustomerProfile({
                    address: "",
                    phoneNumber: "",
                    userId: honeyUserObject.id
                })
            })
            .then(() => {
                setFeedback("Customer profile successfully saved")
            })
    }

    return (
        <div>
        <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
            {feedback}
        </div>
            <form className="customerProfile">
                <h2 className="profile__title">Update Profile</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="address">Address:</label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            value={customerProfile.address}
                            onChange={
                                (evt) => {
                                    // TODO: Update address property
                                    const copy = {...customerProfile}
                                    copy.address = evt.target.value
                                    updateCustomerProfile(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="name">Phone Number:</label>
                        <input type="tel"
                            className="form-control"
                            value={customerProfile.phoneNumber}
                            onChange={
                                (evt) => {
                                    // TODO: Update phone number property
                                    const copy = {...customerProfile}
                                    const formattedPhone = formatPhone(evt.target.value) // using our delicious regex stuff 
                                    copy.phoneNumber = formattedPhone
                                    updateCustomerProfile(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <button
                    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                    className="btn btn-primary">
                    Save Profile
                </button>
            </form>
        </div>
    )
}