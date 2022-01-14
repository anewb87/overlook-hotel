import { expect } from 'chai';
import Room from '../src/classes/Room';
import sampleRooms from'../src/data/sampleRooms';

const getRandomIndex = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

describe('Room', () => {
  let room;

  beforeEach(() => {
    room = new Room(getRandomIndex(sampleRooms))
  });

  it('should be a function', () => {
    expect(Room).to.be.a('function');
  });

  it('should be an instance of Room', () => {
    expect(room).be.be.an.instanceof(Room);
  });

  it('should have a room number that is a number', () => {
    expect(room.number).to.be.a('number');
  });

  it('should have a room number that is a positive number', () => {
    expect(room.number).to.be.greaterThan(0);
  });

  it('should have a room type that is a string', () => {
    expect(room.roomType).to.be.a('string');
  });

  it('should have a room type that is a string of residential suite, suite, junior suite, or single room', () => {
    expect(room.roomType).to.equal.any.string('residential suite', 'suite', 'junior suite', 'single room');
    //not so sure about how to write this one
    //want a way to test an ||
  });
//OR an different option one to above?
  it('should have a room type that is a string of residential suite, suite, junior suite, or single room', () => {
    expect(room.roomType).to.equal(sampleRooms[getRandomIndex].roomType);
  });

  it('should return true if it has a bidet', () => {
    room = new Room(sampleRooms[0]);
    expect(room.bidet).to.equal(true);
  });

  it('should return false if it does not have a bidet', => {
    room = new Room(sampleRooms[1]);
    expect(room.bidet).to.equal(false);
  });

  it('should have a bed size that is a string', () => {
    expect(room.bedSize).to.be.a('string');
  });

  it('should have a specific bed size that is either full, queen, or king', () => {
    expect(room.bedSize).to.equal(sampleRooms[getRandomIndex].bedSize);
  });

  it('should have a number of beds that is a number', () => {
    expect(room.numBeds).to.be.a('number');
  });

  it('should have a room number that is a positive number', () => {
    expect(room.number).to.be.greaterThan(0);
  });

  it('should have the cost per night', () => {
    expect(room.costPerNight).to.equal(sampleRooms[getRandomIndex].costPerNight)
  });
})
