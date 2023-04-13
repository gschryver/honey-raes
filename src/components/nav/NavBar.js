import { CustomerNav } from "./CustomerNav"
import { EmployeeNav } from "./EmployeeNav"
import "./NavBar.css"

export const NavBar = () => {
    	// Retrieving the user object from local storage
        const localHoneyUser = localStorage.getItem("honey_user")
        const honeyUserObject = JSON.parse(localHoneyUser)
    
        if (honeyUserObject.staff) {
            // return employees here  
            return <EmployeeNav />       
        } else {
            // return customers here
            return <CustomerNav />
        }
    }

