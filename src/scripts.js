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
  domUpdates
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


//FUNCTIONS

Promise.all([fetchCustomers(), fetchRooms(), fetchBookings()])
  .then(data => {
    [customersData, roomsData, bookingsData] = [data[0], data[1], data[2]]
  })
  .then(() => {
    customerIndex = getRandomIndex(customersData.customers)
    currentCustomer = new Customer(customersData.customers[customerIndex]);
    console.log(currentCustomer)
  })
    //put catch here

  //I want to fetch all the data and then instantiate the classes

// window.onload = function() {
//   // getCustomerInfo()
//   // domUpdates.displayBookedRooms()
// }




const getCustomerInfo = (bookingData, roomData, currentCustomer) => {
  currentCustomer.getCustomerBookings(bookingData);
  currentCustomer.getTotalSpent(roomData);
  domUpdates.populateCustomerInfo(currentCustomer, roomData)
  console.log("current Customer round 2", currentCustomer)
}

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}
