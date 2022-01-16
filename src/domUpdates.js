//IMPORTS
import {
  currentCustomer,
  roomsData,
  bookingsData,
  createBookButton
} from './scripts'

//GLOBAL VARIABLES
let bookButtons = [];
let date;

//QUERY SELECTORS
const selectDateButton = document.getElementById('selectDateButton');

const selectedDate = document.getElementById('calendarDate');

const availableRoomsSection = document.getElementById('roomDisplaySection');

const roomType = document.getElementById('roomTypes');
const roomTypeButton = document.getElementById('selectTypeButton');

const greeting = document.querySelector('.greeting');

const toBookDisplay= document.querySelector('.to-book-display')



//FUNCTIONS


const show = (elements) => {
  elements.forEach(element => {
    element.classList.remove('hidden');
  });
}

const hide = (elements) => {
  elements.forEach(element => {
    element.classList.add('hidden');
  });
}

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
    hide([greeting])
    show([toBookDisplay])
    availableRoomsSection.innerHTML = '';
    date = selectedDate.value.split('-').join('/');
    currentCustomer.getAvailableRooms(date, roomsData, bookingsData);
    currentCustomer.availableRooms.forEach((room) => {
      availableRoomsSection.innerHTML += `
      <section class='individual-room-cards' id="${room.number}">
        <p>${room.roomType}</p>
        <p>has a bidet: ${room.bidet}</p>
        <p>${room.bedSize} size bed</p>
        <p>number of beds: ${room.numBeds}</p>
        <p>cost per night: ${room.costPerNight}</p>
        <button class="book-button book-button-js">book room</button>
      </section>
      `
    })
    bookButtons = document.querySelectorAll('.book-button-js');
    createBookButton(bookButtons)
  },

  displayFilteredRooms() {
    availableRoomsSection.innerHTML = '';
    currentCustomer.filterRoomsByType(roomType.value);

    if (currentCustomer.filteredRooms.length > 0) {
      currentCustomer.filteredRooms.forEach((room) => {

        availableRoomsSection.innerHTML += `
        <section class='individual-room-cards' id="${room.number}">
          <p>${room.roomType}</p>
          <p>has a bidet: ${room.bidet}</p>
          <p>${room.bedSize} size bed</p>
          <p>number of beds: ${room.numBeds}</p>
          <p>cost per night: ${room.costPerNight}</p>
          <button class="book-button book-button-js">book room</button>
        </section>
        `
      })
    } else {
      availableRoomsSection.innerText = "We fiercely apologize that we have no rooms matching your search. Our company credit card number is 8675309999999, feel free to buy yourself a puppy. Or perhaps a yacht. Maybe a night at the hotel down the road? Our sincerest apologies and happy trails!"
    }
    bookButtons = document.querySelectorAll('.book-button-js');
    createBookButton(bookButtons)
  }
}

export {
 domUpdates,
 selectDateButton,
 selectedDate,
 roomTypeButton,
 bookButtons,
 date
}
