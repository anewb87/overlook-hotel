import {expect} from 'chai';
import Booking from '../src/classes/Booking';
import sampleBookings from '../src/data/sampleRooms';

const getRandomIndex = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

describe('Booking', () => {
  let booking;

  beforeEach(() => {
    booking = new Booking(getRandomIndex(sampleBookings));
  });

  it('should be a function', () => {
    expect(Booking).to.be.a('function');
  });

  it('should be an instance of Booking', () => {
    expect(booking).be.be.an.instanceof(Booking);
  });

  it('should have a booking id that is a string', () => {
    expect(booking.id).to.be.a('string');
  });

  it('should have a booking id that is a random string of 17 characters', () => {
    expect(booking.id.lengh).to.equal(17);
  });

  it('should keep track of who books the room with a userID that is a number', () => {
    expect(booking.userID).to.be.a('number');
  });

  it('should keep track of who books the room with a userID that is a positive number', () => {
    expect(booking.userID).to.be.greaterThan(0);
  });

  it('should have a date for the booking that is a string', () => {
    expect(booking.date).to.be.a('string');
  });

  it('should have a specific formatting for the booking date', () => {
    expect(booking.date.length).to.equal(10);
  });
})
