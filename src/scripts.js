import './css/base.scss';
import Customer from '../src/classes/Customer';
import {
  fetchCustomers,
  fetchRooms,
  fetchBookings
} from './apiCalls';


import {
  domUpdates,
  selectDateButton,
  selectedDate,
  roomTypeButton,
  bookButtons,
  date
} from './domUpdates';

import './images/hood-logo.png'

//GLOBAL VARIABLES
let customersData;
let roomsData;
let bookingsData;
let customerIndex;
let currentCustomer;

//FUNCTIONS

Promise.all([fetchCustomers(), fetchRooms(), fetchBookings()])
  .then(data => {
    [customersData, roomsData, bookingsData] = [data[0].customers, data[1].rooms, data[2].bookings]
  })
  .then(() => {
    instantiateCustomer(customersData)
    getCustomerInfo(customersData, bookingsData, roomsData, currentCustomer)
  })
    //put catch here

  //I want to fetch all the data and then instantiate the classes

const instantiateCustomer = (customersData) => {
  customerIndex = getRandomIndex(customersData)
  currentCustomer = new Customer(customersData[customerIndex]);
  return currentCustomer
}

const getCustomerInfo = (customersData, bookingsData, roomsData, currentCustomer) => {
  currentCustomer.getCustomerBookings(bookingsData);
  currentCustomer.getTotalSpent(roomsData);
  domUpdates.populateCustomerInfo(currentCustomer, roomsData)
}


const getRandomIndex = (array) => {
  return Math.floor(Math.random() * array.length);
}


const bookARoom = (e) => {
  if (e.target.classList.contains('book-button-js')) {
    const roomToPost = {
      "user.ID": currentCustomer.id,
      "date": date,
      "roomNumber": e.target.parentNode.id
    }
    console.log(roomToPost)
    //post that shiiiiz
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
selectDateButton.addEventListener('click', function(e) {
  e.preventDefault(),
  domUpdates.displayAvailableRooms(currentCustomer, roomsData, bookingsData)
});

roomTypeButton.addEventListener('click', function() {
  domUpdates.displayFilteredRooms()
})

export {
  currentCustomer,
  roomsData,
  bookingsData,
  createBookButton
}
