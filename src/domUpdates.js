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
const toBookDisplay = document.querySelector('.to-book-display');
const roomTypeContainer = document.querySelector('.room-type-container-js');
const largeLogo = document.querySelector('.large-logo-js');
// const individualRooms = document.querySelector('.individual-room-cards-js');

const username = document.getElementById('username');
const password = document.getElementById('password');
const loginButton = document.getElementById('loginButton');

const loginDisplay = document.querySelector('.login-display-js');
const dashboard = document.querySelector('.customer-display-js');
const header = document.querySelector('.header-js');

const totalSpent = document.querySelector('.total-js');


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

  updateTotalSpent() {
    totalSpent.innerText = `My Total: $${currentCustomer.totalSpent}`
  },

  displayDashboard() {
    hide([loginDisplay]);
    show([header, dashboard]);
    document.querySelector('.user-name-js').innerHTML = `Welcome, <br /> ${currentCustomer.name}`
  },

  populateCustomerBookings(roomsData) {

    let sortedBookings = currentCustomer.bookings.sort((a, b) => {
      return new Date(a.date) - new Date(b.date)
    })
    sortedBookings.forEach((booking) => {
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

  displayAvailableRooms(roomsData, bookingsData) {
    hide([largeLogo]);
    show([toBookDisplay]);
    greeting.innerText = "Available Rooms"
    availableRoomsSection.innerHTML = '';

    const formattedDate = new Date(selectedDate.value)
    const today = new Date()

    if (formattedDate > today) {
      date = selectedDate.value.split('-').join('/');
      currentCustomer.getAvailableRooms(date, roomsData, bookingsData);

      if (currentCustomer.availableRooms.length > 0) {
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
        });
      } else {
        greeting.innerText = "We fiercely apologize that we have no rooms matching your search. Our company credit card number is 8675309999999, feel free to buy yourself a puppy. Or perhaps a yacht. Maybe a night at the hotel down the road? Our sincerest apologies and happy trails!"
      }

    } else {
      greeting.innerText = "As much as we'd love to Marty McFly this situation, grab that DeLorean and point to toward today or a future date."
    }

    bookButtons = document.querySelectorAll('.book-button-js');
    createBookButton(bookButtons);
  },

  displayFilteredRooms() {
    hide([largeLogo]);
    availableRoomsSection.innerHTML = '';
    greeting.innerText = 'Available Rooms';

    currentCustomer.filterRoomsByType(roomType.value);

    if (currentCustomer.filteredRooms.length > 0) {
      currentCustomer.filteredRooms.forEach((room) => {

        availableRoomsSection.innerHTML += `
        <section class='individual-room-cards individual-room-cards-js' id="${room.number}">
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
      greeting.innerText = "We fiercely apologize that we have no rooms matching your search. Our company credit card number is 8675309999999, feel free to buy yourself a puppy. Or perhaps a yacht. Maybe a night at the hotel down the road? Our sincerest apologies and happy trails!"
    }
    bookButtons = document.querySelectorAll('.book-button-js');
    createBookButton(bookButtons)
  },

  displayBookedMessage() {
    greeting.innerHTML = "THANKS FOR BOOKING WITH US!"
    availableRoomsSection.innerHTML += ''
  }
}

export {
  domUpdates,
  selectDateButton,
  roomTypeButton,
  bookButtons,
  roomTypeContainer,
  username,
  password,
  loginButton,
  // individualRoom,
  date,
  hide,
  show,
}
