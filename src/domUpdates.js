//IMPORTS
import {
  currentCustomer,
  roomsData,
  bookingsData
} from './scripts'




//GLOBAL VARIABLES

//QUERY SELECTORS
const selectDateButton = document.getElementById('selectDateButton');

const selectedDate = document.getElementById('calendarDate');

const availableRoomsSection = document.getElementById('roomDisplaySection');

let roomType = document.getElementById('roomTypes')
let roomTypeButton = document.getElementById('selectTypeButton')

//FUNCTIONS


//DOM UPDATES OBJECT

let domUpdates = {

  populateCustomerInfo(currentCustomer, roomsData) {
    document.querySelector('.user-name-js').innerHTML = `Welcome, <br /> ${currentCustomer.name}`

    document.querySelector('.total-js').innerText = `My Total: $${currentCustomer.totalSpent}`

    currentCustomer.bookings.forEach((booking) => {
      const foundRoom = roomsData.find((room) => {
        return room.number === booking.roomNumber
      })
      document.querySelector('.bookings-list-container-js').innerHTML += `
      <section class='booked-info-card'>
        <p>Booking For ${booking.date}</p>
        <p>Confirmation ID: ${booking.id}</p>
        <p>Room Type: ${foundRoom.roomType}</p>
        <p>Cost: $ ${foundRoom.costPerNight}</p>
      </section>
      `
    })
  },

  displayAvailableRooms(currentCustomer, roomsData, bookingsData) {
    availableRoomsSection.innerHTML = '';
    const date = selectedDate.value.split('-').join('/');
    currentCustomer.getAvailableRooms(date, roomsData, bookingsData);
    console.log('customer', currentCustomer)

    console.log('customer', currentCustomer.availableRooms)
    currentCustomer.availableRooms.forEach((room) => {
      availableRoomsSection.innerHTML += `
      <section class='individual-room-cards'>
        <p>${room.roomType}</p>
        <p>has a bidet: ${room.bidet}</p>
        <p>${room.bedSize} size bed</p>
        <p>number of beds: ${room.numBeds}</p>
        <p>cost per night: ${room.costPerNight}</p>
        <button class="book-button">book room</button>
      </section>
      `
    })
  },

  displayFilteredRooms() {
    availableRoomsSection.innerHTML = ''
    currentCustomer.filterRoomsByType(roomType.value)
    console.log(currentCustomer.filteredRooms)

    if (currentCustomer.filteredRooms.length > 0) {
      currentCustomer.filteredRooms.forEach((room) => {

        availableRoomsSection.innerHTML += `
        <section class='individual-room-cards'>
          <p>${room.roomType}</p>
          <p>has a bidet: ${room.bidet}</p>
          <p>${room.bedSize} size bed</p>
          <p>number of beds: ${room.numBeds}</p>
          <p>cost per night: ${room.costPerNight}</p>
          <button class="book-button">book room</button>
        </section>
        `
      })
    } else {
      availableRoomsSection.innerText = "We fiercely apologize that we have no rooms matching your search. Our company credit card number is 8675309999999, feel free to buy yourself a puppy. Or perhaps a yacht. Maybe a night at the hotel down the road? Our sincerest apologies and happy trails!"
    }
  }
}

export {
 domUpdates,
 selectDateButton,
 selectedDate,
 roomTypeButton
}
