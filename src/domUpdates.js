//IMPORTS
import {
  currentCustomer,
  roomData,
}
  from './scripts'

//GLOBAL VARIABLES

//QUERY SELECTORS

// const bookedContainer = document.querySelector('.bookings-list-container-js')



//FUNCTIONS

//DOM UPDATES OBJECT

let domUpdates = {

  populateCustomerInfo(currentCustomer, roomData) {
    document.querySelector('.user-name-js').innerText = `Welcome, ${currentCustomer.name}`

    document.querySelector('.total-js').innerText = `My Total: ${currentCustomer.totalSpent}`

    currentCustomer.bookings.forEach((booking) => {
      const foundRoom = roomData.find((room) => {
        room.number === booking.roomNumber
      })
      document.querySelector('.bookings-list-container-js').innerHTML += `
      <section class='booked-info-card'>
        <p>Booking For ${booking.date}</p>
        <p>Room Type ${foundRoom.roomType}</p>
        <p>Cost ${foundRoom.costPerNight}</p>
      </section>
      `
    })
  }
}




//EVENT LISTENERS


export {
 domUpdates
}
