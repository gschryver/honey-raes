export const TicketSearch = ({ setterFunction }) => {
    return (
      <div>
        <input 
          onChange={(event) => {
            // When the onChange event is triggered, this function is called, which takes the current value of the input field as an argument and calls the setterFunction with it.
            setterFunction(event.target.value)
          }}
          type="text"
          placeholder="Enter search terms"
        />
      </div>
    )
  }
  