class Customer {
  constructor(customer) {
    this.id = customer.id;
    this.name = customer.name;
    this.bookings = [];
    this.totalSpent = 0;
    this.availableRooms = [];
    this.filteredRooms = [];
  }

  getCustomerBookings(bookings) {
    this.bookings = bookings.filter((booking) => {
      return this.id === booking.userID
    })
  }

  getTotalSpent(rooms) {
    const total = this.bookings.reduce((acc, booking) => {
      rooms.forEach((room) => {
        if (booking.roomNumber === room.number) {
          acc += room.costPerNight
        }
      })
      return acc;
    }, 0)

    this.totalSpent = parseFloat(total.toFixed(2))
  }

  getAvailableRooms(date, rooms, bookings) {
    bookings.filter((booking) => {
      return booking.date === date
    }).forEach((roomBooked) => {
      rooms.forEach((room) => {
        if (roomBooked.roomNumber !== room.number){
          this.availableRooms.push(room)
        }
      })
    })
  }

  getAvailableRooms(date, rooms, bookings) {
    const bookedRooms = bookings.reduce((acc, booking) => {
      if (booking.date === date) {
        acc.push(booking.roomNumber)
      }
      return acc
    }, [])

    this.availableRooms = rooms.filter((room) => {
      return !bookedRooms.includes(room.number)
    })
  }

  filterRoomsByType(roomType) {
    this.filteredRooms = this.availableRooms.filter((room) => {
      return room.roomType === roomType
    })
  }
}

export default Customer;
