import { expect } from 'chai';
import Customer from '../src/classes/Customer';
import sampleCustomers from '../src/data/sampleCustomers';
import sampleBookings from '../src/data/sampleBookings';
import sampleRooms from '../src/data/sampleRooms';

// const getRandomIndex = (array) => {
//   return array[Math.floor(Math.random() * array.length)];
// };

describe('Customer', () => {
    let customer;

    beforeEach(() => {
      customer = new Customer(sampleCustomers[0]);
    });

    it('should be a function', () => {
      expect(Customer).to.be.a('function');
    });

    it('should be an instance of Customer', () => {
      expect(customer).to.be.an.instanceof(Customer);
    });

    it('should have an id that is a number', () => {
      expect(customer.id).to.be.a('number');
    });

    it('should have an id that is a positive number', () => {
      expect(customer.id).to.be.greaterThan(0);
    });

    it('should have a name that is a string', () => {
      expect(customer.name).to.be.a('string');
    });

    it('should have a property that holds the user bookings', () => {
      expect(customer.bookings).to.deep.equal([])
    });

    it('should have a total amount spent by the customer on rooms', () => {
      expect(customer.totalSpent).to.equal(0);
    });

    it('should have a method that gets all bookings made by this customer', () => {
      customer.getCustomerBookings(sampleBookings);
      expect(customer.bookings).to.deep.equal([sampleBookings[4], sampleBookings[7]]);
    });

    it('should have a method that gets the total price a customer has spent on rooms', () => {
      customer.getCustomerBookings(sampleBookings);
      customer.getTotalSpent(sampleRooms);
      expect(customer.totalSpent).to.equal(477.94);
    })
})
