let fetchCustomers = () => {
  return fetch("http://localhost:3001/api/v1/customers")
    .then(response => response.json())
}

let fetchSingleCustomer = (userID) => {
  return fetch(`http://localhost:3001/api/v1/customers/${userID}`)
    .then(response => response.json())
}

let fetchRooms = () => {
  return fetch("http://localhost:3001/api/v1/rooms")
    .then(response => response.json())
}

let fetchBookings = () => {
  return fetch("http://localhost:3001/api/v1/bookings")
    .then(response => response.json())
}

let postBooking = (booking) => {
  return fetch("http://localhost:3001/api/v1/bookings", {
    method: 'POST',
    body: JSON.stringify(booking),
    headers: {'Content-Type': 'application/json'}
  })
    .then(response => errorHandle(response))
    .catch(error => console.log(error))
}

const errorHandle = (response) => {
  if (!response.ok) {
    const errorHandleMessage = document.querySelector('.errorHandle');
    errorHandleMessage.innerText = 'Well shoot, that trail did not lead to our front door. Please try again.'
  } else {
    return response.json()
  }
}

export {fetchCustomers, fetchSingleCustomer, fetchRooms, fetchBookings, postBooking}
