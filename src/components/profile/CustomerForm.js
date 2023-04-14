import { useEffect, useState } from "react"

export const CustomerForm = () => {
    // TODO: Provide initial state for profile

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)


    // fun phone number stuff using regex! 
    const formatPhone = (input) => {
        // Remove non-numeric characters
        const cleanedInput = input.replace(/\D+/g, '')
        // Format the cleaned input as XXX-XXX-XXXX
        const formattedInput = cleanedInput.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3') // regex - accept 3 numbers, followed by 3 more, followed by 4; format as 3-3-4
        return formattedInput
    }
    
    const [profile, updateProfile] = useState({
        address: "",
        phoneNumber: "",
        userId: honeyUserObject.id
    })

    const [feedback, setFeedback] = useState("")

    useEffect(() => {
        if (feedback !== "") {
        // Clear feedback to make entire element disappear after 3 seconds
        setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])

    // TODO: Get customer profile info from API and update state
    useEffect(() => {
        fetch(`http://localhost:8088/customers?userId=${honeyUserObject.id}`)
            .then(response => response.json())
            .then(data => { 
                const customerObject = data[0]
                updateProfile(customerObject)
            })
    }, [])
    

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        /*
            TODO: Perform the PUT fetch() call here to update the profile.
            Navigate user to home page when done.
        */
       
        fetch(`http://localhost:8088/customers/${profile.id}`, { // already being stored in state "profile"
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(profile)
        })
            .then(() => {
                updateProfile({
                    address: "",
                    phoneNumber: "",
                    ...profile // this is preserving the userId of the person logged in so no weird issues with trying to update the profile again 
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
            <form className="profile">
                <h2 className="profile__title">Update Profile</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="specialty">Address:</label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            value={profile.address}
                            onChange={
                                (evt) => {
                                    // TODO: Update address property
                                    const copy = {...profile}
                                    copy.address = evt.target.value
                                    updateProfile(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="name">Phone Number:</label>
                        <input type="tel"
                            className="form-control"
                            value={profile.phoneNumber}
                            onChange={
                                (evt) => {
                                    // TODO: Update phone number property
                                    const copy = {...profile}
                                    const formattedPhone = formatPhone(evt.target.value) // using our delicious regex stuff 
                                    copy.phoneNumber = formattedPhone
                                    updateProfile(copy)
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