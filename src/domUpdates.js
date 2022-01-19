//IMPORTS
import {
  currentCustomer,
  createBookButton
} from './scripts'


//GLOBAL VARIABLES
let bookButtons = [];
let date;


//QUERY SELECTORS
const username = document.getElementById('username');
const password = document.getElementById('password');
const loginButton = document.getElementById('loginButton');
const selectDateButton = document.getElementById('selectDateButton');
const selectedDate = document.getElementById('calendarDate');
const availableRoomsSection = document.getElementById('roomDisplaySection');
const roomType = document.getElementById('roomTypes');
const roomTypeButton = document.getElementById('selectTypeButton');
const greeting = document.querySelector('.greeting');
const toBookDisplay = document.querySelector('.to-book-display');
const roomTypeContainer = document.querySelector('.room-type-container-js');
const largeLogo = document.querySelector('.large-logo-js');
const availableRoomsContainer = document.querySelector('.bookings-list-container-js');
const loginDisplay = document.querySelector('.login-display-js');
const dashboard = document.querySelector('.customer-display-js');
const header = document.querySelector('.header-js');
const totalSpent = document.querySelector('.total-js');
const errorMessageDisplay = document.querySelector('.error-handle-js');


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

  formatDate(date) {
    const mm = date.slice(5, 7)
    const dd = date.slice(8, 10)
    const yyyy = date.slice(0, 4)
    return `${mm}/${dd}/${yyyy}`;
  },

  populateCustomerBookings(roomsData) {
    const sortedBookings = currentCustomer.bookings.sort((a, b) => {
      const aDate = domUpdates.formatDate(a.date);
      const bDate = domUpdates.formatDate(b.date);
      return new Date(aDate) - new Date(bDate)
    })
    sortedBookings.forEach((booking) => {
      const foundRoom = roomsData.find((room) => {
        return room.number === booking.roomNumber
      })
      availableRoomsContainer.innerHTML += `
      <section class='booked-info-card' tabindex="0">
        <p>Booking For ${domUpdates.formatDate(booking.date)}</p>
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

    const formattedDate = new Date(selectedDate.value);
    const today = new Date();

    if (formattedDate >= today) {
      date = selectedDate.value.split('-').join('/');
      currentCustomer.getAvailableRooms(date, roomsData, bookingsData);

      if (currentCustomer.availableRooms.length > 0) {
        currentCustomer.availableRooms.forEach((room) => {
          availableRoomsSection.innerHTML += `
          <section class="individual-room-cards" tabindex="0" id="${room.number}">
          <p>${room.roomType}</p>
          <p>has a bidet: ${room.bidet}</p>
          <p>${room.bedSize} size bed</p>
          <p>number of beds: ${room.numBeds}</p>
          <p>cost per night: ${room.costPerNight}</p>
          <button class="book-button book-button-js">book room</button>
          </section>
          `
        });
        show([roomTypeContainer])
      } else {
        greeting.innerText = "We fiercely apologize that we have no rooms matching your search. Our company credit card number is 8675309999999, feel free to buy yourself a puppy. Or perhaps a yacht. Maybe a night at the hotel down the road? Our sincerest apologies and happy trails!"
      }

    } else {
      greeting.innerText = "As much as we'd love to Marty McFly this situation, grab that DeLorean and point it toward a future date."
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
    greeting.innerHTML = "Thanks for booking with us!"
    availableRoomsSection.innerHTML = `<img class="large-logo large-logo-js" src="images/natural-beauty.png" alt="large hood overlook hotel logo"/>`
  },

  showLoginErrorMessage() {
    document.querySelector('.username-input-js').value = '';
    document.querySelector('.password-input-js').value = '';
    errorMessageDisplay.innerText = "please enter a valid username and password";
  }
}

export {
  domUpdates,
  selectDateButton,
  roomTypeButton,
  username,
  password,
  loginButton,
  errorMessageDisplay,
  date,
}
