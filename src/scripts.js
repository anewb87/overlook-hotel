// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import Customer from '../src/classes/Customer';
// import {
//   fetchCustomers,
//   fetchRooms,
//   fetchBookings
// } from './apiCalls';

import {
  fetchAllData
} from './apiCalls';

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


// const getCustomer = () => {
//   fetchCustomers()
//   .then(data => {
//     console.log('data:', typeof data, data)
//     customerData = data.customers;
//     console.log('want this to be an array', typeof customerData)
//     currentCustomer = new Customer(customerData[0]);
//     console.log('current customer***', currentCustomer);
//   })
//   .then(data => getCustomerInfo())
// }

// const load = () => {
//   fetchAllData()
//     .then((allData) => {
//       customersData = allData.
//
//     })
// }


Promise.all([fetchCustomers(), fetchRooms(), fetchBookings()])
  .then(data => {
    [customersData, roomsData, bookingsData] = [data[0], data[1], data[2]];
    customerIndex = getRandomIndex(customersData.customers);
    currentCustomer = new Customer(customersData.customers[customerIndex]);
    console.log(currentCustomer)

    //put catch here
})


//reference from whats cookin
// Promise.all([userAPI, ingredientAPI, recipeAPI])
//   .then(data => {
//     [usersData, ingredientsData, recipeData] = [data[0], data[1], data[2]];
//     userIndex = getRandomIndex(usersData);
//     currentUser = new User(usersData[userIndex], ingredientsData);
//     recipeList = recipeData.map(recipe => {
//       return new Recipe(recipe);
//     })
//     recipeRepository = new RecipeRepository(recipeList);
//     domUpdates.displayRecipes(recipeRepository.recipeData);
//     domUpdates.populateDropdown();
//   })
//   .catch(error => console.log(error));



  //I want to fetch all the data and then instantiate the classes

//this isn't going to work. need to instantiate classes AFTER getting all the data, duh.
//

window.onload = function() {
  getCustomerInfo()

  //getCustomer()
  // domUpdates.displayBookedRooms()
}




const getCustomerInfo = (bookingData, roomData, currentCustomer) => {
  currentCustomer.getCustomerBookings(bookingData);
  currentCustomer.getTotalSpent(roomData);
  domUpdates.populateCustomerInfo(currentCustomer, roomData)
  console.log("current Customer round 2", currentCustomer)
}

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
