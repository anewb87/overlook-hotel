//IMPORTS
import './css/base.scss';
import Customer from '../src/classes/Customer';
import {
  fetchCustomers,
  fetchSingleCustomer,
  fetchRooms,
  fetchBookings,
  postBooking
} from './apiCalls';

import {
  domUpdates,
  selectDateButton,
  selectedDate,
  roomTypeButton,
  bookButtons,
  roomTypeContainer,
  username,
  password,
  // individualRoom,
  loginButton,
  date,
  hide,
  show
} from './domUpdates';

import './images/large-logo.png';
import './images/natural-beauty.png';


//GLOBAL VARIABLES
let customersData;
let roomsData;
let bookingsData;
let customerIndex;
let currentCustomer;


//FUNCTIONS
const fetchAllData = (userID) => {
  return Promise.all([fetchSingleCustomer(userID), fetchRooms(), fetchBookings()])
}

const validateCustomerLogin = () => {

  const customerLoginNumber = parseInt(username.value.substring(8))

  if (customerLoginNumber > 0 && customerLoginNumber < 51 && password.value === "overlook2021") {
    fetchAllData(customerLoginNumber)
    .then(data => {
      [customersData, roomsData, bookingsData] = [data[0], data[1].rooms, data[2].bookings]

      currentCustomer = new Customer(customersData);
      console.log('inside 1st then', currentCustomer);
    })
    .then(() => {
      displayCustomerInfo(currentCustomer, bookingsData, roomsData);
      domUpdates.displayDashboard(currentCustomer);
      console.log('inside 2nd then', currentCustomer);
    })
  }
}

const displayCustomerInfo = (currentCustomer, bookingsData, roomsData) => {
  currentCustomer.getCustomerBookings(bookingsData);
  currentCustomer.getTotalSpent(roomsData);
  domUpdates.populateCustomerBookings(currentCustomer, roomsData);
}


const bookARoom = (e) => {
  if (e.target.classList.contains('book-button-js')) {
    const roomToPost = {
      userID: currentCustomer.id,
      date: date,
      roomNumber: parseInt(e.target.parentNode.id)
    }

    domUpdates.displayBookedMessage();
    // individualRoom.classList.add('white-shadow-transform');

    postBooking(roomToPost).then(data => {
      fetchBookings().then(data => {
        bookingsData = data.bookings
        displayCustomerInfo(currentCustomer, bookingsData, roomsData);
        // getCustomerInfo(customersData, bookingsData, roomsData, currentCustomer)
        setTimeout(() => {
          domUpdates.displayAvailableRooms(currentCustomer, roomsData, bookingsData)
        }, 1500)
      })
    })
  }
}

const createBookButton = (bookButtons) => {
  bookButtons.forEach((button) => {
    button.addEventListener('click', function (e) {
      bookARoom(e);
    });
  });
}


//EVENT LISTENERS
loginButton.addEventListener('click', function(e) {
  e.preventDefault();
  validateCustomerLogin();
})

selectDateButton.addEventListener('click', function() {
  domUpdates.displayAvailableRooms(currentCustomer, roomsData, bookingsData);
  show([roomTypeContainer]);
});

roomTypeButton.addEventListener('click', function(e) {
  e.preventDefault()
  domUpdates.displayFilteredRooms()
});


export {
  currentCustomer,
  roomsData,
  bookingsData,
  createBookButton
}
