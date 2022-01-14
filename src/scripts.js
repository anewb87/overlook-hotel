// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import Customer from '../src/classes/Customer';
import {
  fetchCustomers,
  fetchRooms,
  fetchBookings,
} from './apiCalls';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'

//GLOBAL VARIABLES
let customerData;
let roomData;
let bookingData;
let customerIndex;
let currentCustomer;



//FUNCTIONS
const getCustomer = () => {
  fetchCustomers()
  .then(data => {
    console.log('data:', typeof data, data)
    customerData = data;
    console.log(typeof customerData)
    currentCustomer = new Customer(customerData[0]);
    console.log(currentCustomer);
  })
}

window.onload = function() {
  getCustomer()
}

// const getRooms = () => {
//   fetchRooms()
//   .then(data => {
//
//   })
// }
//
// const getBookings = () => {
//   fetchBookings()
//   .then(data => {
//
//   })
// }
//
//
// Promise.all([fetchCustomers, fetchRooms, fetchBookings])
//   .then(data => {
//     [customerData, roomData, bookingData] = [data[0], data[1], data[2]];
//     customerIndex = getRandomIndex(customerData);
//     console.log(customerData)
//     currentCustomer = new Customer(customerData[customerIndex])
//     console.log(currentCustomer)
//
//   })



function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}
