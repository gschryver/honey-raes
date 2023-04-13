import { useState } from "react"
import { TicketSearch } from "./TicketSearch"
import { TicketList } from "./TicketList"

// This is a functional component called TicketContainer.
export const TicketContainer = () => {
  // state variable which is initialized to an empty string and a function called setSearchTerms that can be used to update the state variable.
  const [searchTerms, setSearchTerms] = useState("")

  // The component returns two child components: TicketSearch and TicketList, which receive props.
  return (
    <>
      {/* TicketSearch receives a prop called setterFunction, which is set to the setSearchTerms function we defined earlier. */}
      <TicketSearch setterFunction={setSearchTerms} />
      {/* TicketList receives a prop called searchTermState, which is set to the current value of the searchTerms state variable. */}
      <TicketList searchTermState={searchTerms} />
    </>
  )
}
