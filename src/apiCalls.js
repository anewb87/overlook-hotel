import {errorMessageDisplay} from './domUpdates'

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
}

const errorHandle = (response) => {
  if (!response.ok) {
    throw new Error("Well shoot, that trail did not lead to our front door. Please reload and try again.")
  } else {
    return response.json()
  }
}

 const errorMessage = (error) => {
 setTimeout(() => {
   errorMessageDisplay.innerText = `Error: ${error.message}`
 }, 2500)
}

export {fetchSingleCustomer, fetchRooms, fetchBookings, postBooking, errorMessage}
