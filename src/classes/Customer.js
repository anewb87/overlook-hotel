class Customer {
  constructor(customer) {
    this.id = customer.id;
    this.name = customer.name;
    this.bookings = [];
    this.totalSpent = 0;
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
}

export default Customer;
