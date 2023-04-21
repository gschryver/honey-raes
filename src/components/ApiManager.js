// CUSTOMERS

// customer list fetch
export const getAllCustomers = () => {
    return fetch(`http://localhost:8088/customers?_expand=user`)
        .then(res => res.json())
}

// customer details fetch 
export const allCustomerDetails = (customerId) => {
    return fetch(`http://localhost:8088/customers/${customerId}?_expand=user`)
      .then(res => res.json())
}

// EMPLOYEES
// employee list fetch
export const getAllEmployees = () => {
    return fetch("http://localhost:8088/users?isStaff=true")
            .then(res => res.json())
}

// CUSTOMER PROFILES 
// customer form fetch
export const getCustomerProfile = (honeyUserObject) => {
    return fetch(`http://localhost:8088/customers?userId=${honeyUserObject.id}`)
            .then(response => response.json())
}

// update customer profile fetch
export const updateCustomerProfileHandler = (customerId, customerProfile) => {
    return fetch(`http://localhost:8088/customers/${customerId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customerProfile)
        })
}

// EMPLOYEE PROFILES
export const getEmployeeProfile = (honeyUserObject) => {
    return fetch(`http://localhost:8088/employees?userId=${honeyUserObject.id}`)
            .then(response => response.json())
}

// update employee profile fetch
export const updateEmployeeProfileHandler = (profile, updateProfile, setFeedback) => {
    return fetch(`http://localhost:8088/employees/${profile.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(profile)
        })
        .then(() => {
            updateProfile({
                ...profile,
                specialty: "",
                rate: 0,
            })
        })
        .then(() => {
            setFeedback("Employee profile successfully saved")
        })
}

// TICKETS.JS 
// update service ticket 
export const updateServiceTicket = (ticketId, ticketData) => {
    return fetch(`http://localhost:8088/serviceTickets/${ticketId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(ticketData)
    }).then(response => response.json());
  }

// delete service ticket
  export const deleteServiceTicket = (ticketId) => {
    return fetch(`http://localhost:8088/serviceTickets/${ticketId}`, {
      method: "DELETE"
    }).then(response => response.json());
  }

// claim service ticket
  export const claimServiceTicket = (serviceTicketId, employeeId) => {
    return fetch(`http://localhost:8088/employeeTickets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        employeeId,
        serviceTicketId
      })
    }).then(response => response.json());
  }

// TICKETEDIT.JS
export const getServiceTicket = (ticketId) => {
    return fetch(`http://localhost:8088/serviceTickets/${ticketId}`)
      .then(response => response.json());
  }
  
export const updateServiceTicketEdit = (ticket) => {
    return fetch(`http://localhost:8088/serviceTickets/${ticket.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(ticket)
    }).then(response => response.json());
  }

  // TICKETFORM.JS 
export const addTicket = (ticketToSendToAPI) => {
    return fetch("http://localhost:8088/serviceTickets", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticketToSendToAPI)
            })
}

// TICKETLIST.JS 
// get all service tickets
export const getAllServiceTickets = () => {
    return fetch(`http://localhost:8088/serviceTickets?_embed=employeeTickets`)
                .then(response => response.json())
}

export const getAllEmployeesWithUsers = () => {
    return fetch(`http://localhost:8088/employees?_expand=user`)
                .then(response => response.json())
}
