// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import Customer from '../src/classes/Customer';
import {
  fetchCustomers,
  fetchRooms,
  fetchBookings
} from './apiCalls';

// import {
//   fetchAllData
// } from './apiCalls';

import {
  domUpdates,
  selectDateButton,
  selectedDate
} from './domUpdates';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'
//import '.images/hood-logo.png'

//GLOBAL VARIABLES
let customersData;
let roomsData;
let bookingsData;
let customerIndex;
let currentCustomer;
// let date;


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



//EVENT LISTENERS
selectDateButton.addEventListener('click', function(e) {
  e.preventDefault(),
  console.log(currentCustomer)
  domUpdates.displayAvailableRooms(currentCustomer, roomsData, bookingsData)
});

export {
  currentCustomer,
  roomsData,
  bookingsData
}
