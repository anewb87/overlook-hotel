// let fetchCustomers = () => {
//   return fetch("http://localhost:3001/api/v1/customers")
//   .then(response => response.json())
// }
//
// let fetchRooms = () => {
//   return fetch("http://localhost:3001/api/v1/rooms")
//   .then(response => response.json())
// }
//
// let fetchBookings = () => {
//   return fetch("http://localhost:3001/api/v1/bookings")
//   .then(response => response.json())
// }

const fetchAllData () => {

  const fetchCustomers = () => {
    return fetch("http://localhost:3001/api/v1/customers")
    .then(response => response.json())
    }

  const fetchRooms = () => {
    return fetch("http://localhost:3001/api/v1/rooms")
    .then(response => response.json())
    }

  const fetchBookings = () => {
    return fetch("http://localhost:3001/api/v1/bookings")
    .then(response => response.json())
  }



}

//work on catches still

//think I'll need to return






// let postBooking = (booking) => {
//   return fetch("http://localhost:3001/api/v1/bookings", {
//     method: 'POST
//     body: JSON.stringify(booking),
//     headers: {'Content-Type': 'application/json'}
//   })
//   //likely .thens and do stuff
//   //.catch
// }

//from whats cookin
// let post = async(info) => {
//  let response = await fetch("http://localhost:3001/api/v1/users", {
//     method: 'POST',
//     body: JSON.stringify(info),
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   })
//   return response;
// }

//from post advent
// let postRequestedItem = (e) => {
//   e.preventDefault()
//   return fetch("https://mysterious-mesa-00016.herokuapp.com/items", {
//     method: 'POST',
//     body: JSON.stringify({
//       id: itemID++,
//       recipient: inputRecipient.value,
//       name: inputItemName.value,
//       link: inputLink.value,
//       priceInDollars: parseInt(inputPrice.value)
//     }),
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   })
//   .then(fetchList())
//   .then(clearInputs())
//   // .then(response => response.json())
//   // .then(json => /*do something with json*/)
//   .catch(err => console.log(err));
// }


export {fetchAllData}

// export {fetchCustomers, fetchRooms, fetchBookings}
