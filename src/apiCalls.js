let fetchCustomers = () => {
  return fetch("http://localhost:3001/api/v1/customers")
    .then(response => errorHandle(response))
}

let fetchSingleCustomer = (userID) => {
  return fetch(`http://localhost:3001/api/v1/customers/${userID}`)
    .then(response => errorHandle(response))
}

let fetchRooms = () => {
  return fetch("http://localhost:3001/api/v1/rooms")
    .then(response => errorHandle(response))
}

let fetchBookings = () => {
  return fetch("http://localhost:3001/api/v1/bookings")
    .then(response => errorHandle(response))
}

let postBooking = (booking) => {
  return fetch("http://localhost:3001/api/v1/bookings", {
    method: "POST",
    body: JSON.stringify(booking),
    headers: {"Content-Type": "application/json"}
  })
    .then(response => errorHandle(response))
    // .catch(error => displayErrorMessage(error))
}

const errorHandle = (response) => {
  if (!response.ok) {
    const errorHandleMessage = document.querySelector('.errorHandle');
    errorHandleMessage.innerText = "Well shoot, that trail did not lead to our front door. Please try again."
  } else {
    return response.json()
  }
}

// const displayErrorMessage = (error) => {
//   const errorHandleMessage = document.querySelector('.errorHandle');
//   errorHandleMessage.innerText = "Please check your connection, something went wrong."
// }

//missing a catch in other place(s)? This isn't correct. Circle back

export {fetchCustomers, fetchSingleCustomer, fetchRooms, fetchBookings, postBooking}
