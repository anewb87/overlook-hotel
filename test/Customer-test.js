import { expect } from 'chai';
import Customer from '../src/classes/Customer';
import sampleCustomers from'../src/data/sampleCustomers';

const getRandomIndex = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

describe('Customer', () => {
    let customer;

    beforeEach(() => {
      customer = new Customer(getRandomIndex(sampleCustomers));
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
})
