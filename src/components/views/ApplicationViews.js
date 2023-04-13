import { EmployeeViews } from "./EmployeeViews"
import { CustomerViews } from "./CustomerViews"

// Creating the ApplicationViews functional component
// Route = TicketList: This route will display the TicketList component
// Route = TicketForm: This route will display the TicketForm component
// <Route> is a component provided by the react-router-dom library in React that helps with handling and managing the routing of a web application.
// The "Route" components take two important props: "path" and "element". The "path" prop specifies the URL path that this route should match, and the "element" prop specifies the component that should be rendered when the route is matched.
// The "Outlet" component is used inside the "/" route to allow for nested routes. It acts as a placeholder where the child components of the matched route will be rendered. In this case, the child components are "TicketList" and "TicketForm".

export const ApplicationViews = () => {
	// Retrieving the user object from local storage
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    if (honeyUserObject.staff) {
        // return employees here  
        return <EmployeeViews />       
    } else {
        // return customers here
        return <CustomerViews />
    }
}