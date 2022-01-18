//IMPORTS
import './css/base.scss';
import Customer from '../src/classes/Customer';
import {
  fetchSingleCustomer,
  fetchRooms,
  fetchBookings,
  postBooking,
  errorMessage
} from './apiCalls';

import {
  domUpdates,
  selectDateButton,
  roomTypeButton,
  username,
  password,
  loginButton,
  date,
} from './domUpdates';

import './images/large-logo.png';
import './images/natural-beauty.png';


//GLOBAL VARIABLES
let customersData;
let roomsData;
let bookingsData;
let currentCustomer;


//FUNCTIONS
const fetchAllData = (userID) => {
  return Promise.all([fetchSingleCustomer(userID), fetchRooms(), fetchBookings()])
}

const validateCustomerLogin = () => {
  const loginName = username.value;
  const customerLoginNumber = parseInt(loginName.substring(8))
  if (loginName.startsWith("customer") && customerLoginNumber > 0 && customerLoginNumber < 51 && password.value === "overlook2021") {
    fetchAllData(customerLoginNumber)
      .then(data => {
        [customersData, roomsData, bookingsData] = [data[0], data[1].rooms, data[2].bookings]
        currentCustomer = new Customer(customersData);
        displayCustomerInfo(bookingsData, roomsData);
        domUpdates.displayDashboard();
        domUpdates.updateTotalSpent();
      })
      .catch(error => errorMessage(error))
  } else {
    domUpdates.showLoginErrorMessage()
  }
}

const displayCustomerInfo = (bookingsData, roomsData) => {
  currentCustomer.getCustomerBookings(bookingsData);
  currentCustomer.getTotalSpent(roomsData);
  domUpdates.populateCustomerBookings(roomsData);
  domUpdates.updateTotalSpent();
}

const bookARoom = (e) => {
  if (e.target.classList.contains('book-button-js')) {
    const roomToPost = {
      userID: currentCustomer.id,
      date: date,
      roomNumber: parseInt(e.target.parentNode.id)
    }
    domUpdates.displayBookedMessage();

    postBooking(roomToPost).then(data => {
      fetchBookings().then(data => {
        bookingsData = data.bookings
        displayCustomerInfo(bookingsData, roomsData);
        setTimeout(() => {
          domUpdates.displayAvailableRooms(roomsData, bookingsData)
        }, 2000)
      }).catch(error => errorMessage(error))
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
  domUpdates.displayAvailableRooms(roomsData, bookingsData);
})

roomTypeButton.addEventListener('click', function(e) {
  e.preventDefault();
  domUpdates.displayFilteredRooms();
})


export {
  currentCustomer,
  roomsData,
  bookingsData,
  createBookButton
}
