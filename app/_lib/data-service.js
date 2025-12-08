import { eachDayOfInterval } from 'date-fns';
import cabinsData from './data/cabins.json';
import bookingsData from './data/bookings.json';
import guestsData from './data/guests.json';

/////////////
// GET

export async function getCabin(id) {
  // Simulate async operation
  await new Promise((res) => setTimeout(res, 100));
  
  const cabin = cabinsData.cabins.find(cabin => cabin.id === Number(id));
  
  if (!cabin) {
    throw new Error('Cabin not found');
  }

  return cabin;
}

export async function getCabinPrice(id) {
  await new Promise((res) => setTimeout(res, 100));
  
  const cabin = cabinsData.cabins.find(cabin => cabin.id === Number(id));
  
  if (!cabin) {
    throw new Error('Cabin not found');
  }

  return {
    regularPrice: cabin.regularPrice,
    discount: cabin.discount
  };
}

export const getCabins = async function () {
  // Simulate async operation
  await new Promise((res) => setTimeout(res, 100));
  
  const cabins = cabinsData.cabins.map(cabin => ({
    id: cabin.id,
    name: cabin.name,
    maxCapacity: cabin.maxCapacity,
    regularPrice: cabin.regularPrice,
    discount: cabin.discount,
    image: cabin.image
  }));

  return cabins;
};

// Guests are uniquely identified by their email address
export async function getGuest(email) {
  await new Promise((res) => setTimeout(res, 100));
  
  const guest = guestsData.guests.find(guest => guest.email === email);
  
  // No error here! We handle the possibility of no guest in the sign in callback
  return guest || null;
}

export async function getBooking(id) {
  await new Promise((res) => setTimeout(res, 100));
  
  const booking = bookingsData.bookings.find(booking => booking.id === Number(id));
  
  if (!booking) {
    throw new Error('Booking could not get loaded');
  }

  return booking;
}

export async function getBookings(guestId) {
  await new Promise((res) => setTimeout(res, 100));
  
  const bookings = bookingsData.bookings
    .filter(booking => booking.guestId === Number(guestId))
    .map(booking => {
      const cabin = cabinsData.cabins.find(c => c.id === booking.cabinId);
      return {
        ...booking,
        cabins: {
          name: cabin?.name,
          image: cabin?.image
        }
      };
    })
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

  return bookings;
}

export async function getBookedDatesByCabinId(cabinId) {
  await new Promise((res) => setTimeout(res, 100));
  
  let today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  // Getting all bookings for this cabin that are either upcoming or checked-in
  const bookings = bookingsData.bookings.filter(booking => {
    const startDate = new Date(booking.startDate);
    return booking.cabinId === Number(cabinId) && 
           (startDate >= today || booking.status === 'checked-in');
  });

  // Converting to actual dates to be displayed in the date picker
  const bookedDates = bookings
    .map((booking) => {
      return eachDayOfInterval({
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
      });
    })
    .flat();

  return bookedDates;
}

export async function getSettings() {
  await new Promise((res) => setTimeout(res, 100));
  
  return bookingsData.settings;
}

export async function getCountries() {
  try {
    const res = await fetch(
      'https://restcountries.com/v2/all?fields=name,flag'
    );
    const countries = await res.json();
    return countries;
  } catch {
    throw new Error('Could not fetch countries');
  }
}

/////////////
// CREATE

export async function createGuest(newGuest) {
  await new Promise((res) => setTimeout(res, 100));
  
  // In a real app, this would persist to a database
  const guest = {
    id: guestsData.guests.length + 1,
    created_at: new Date().toISOString(),
    ...newGuest
  };
  
  return guest;
}

export async function createBooking(newBooking) {
  await new Promise((res) => setTimeout(res, 100));
  
  // In a real app, this would persist to a database
  const booking = {
    id: bookingsData.bookings.length + 1,
    created_at: new Date().toISOString(),
    ...newBooking
  };
  
  return booking;
}

/////////////
// UPDATE

// The updatedFields is an object which should ONLY contain the updated data
export async function updateGuest(id, updatedFields) {
  await new Promise((res) => setTimeout(res, 100));
  
  const guest = guestsData.guests.find(g => g.id === Number(id));
  
  if (!guest) {
    throw new Error('Guest could not be updated');
  }
  
  // In a real app, this would persist to a database
  const updatedGuest = { ...guest, ...updatedFields };
  
  return updatedGuest;
}

export async function updateBooking(id, updatedFields) {
  await new Promise((res) => setTimeout(res, 100));
  
  const booking = bookingsData.bookings.find(b => b.id === Number(id));
  
  if (!booking) {
    throw new Error('Booking could not be updated');
  }
  
  // In a real app, this would persist to a database
  const updatedBooking = { ...booking, ...updatedFields };
  
  return updatedBooking;
}

/////////////
// DELETE

export async function deleteBooking(id) {
  await new Promise((res) => setTimeout(res, 100));
  
  const booking = bookingsData.bookings.find(b => b.id === Number(id));
  
  if (!booking) {
    throw new Error('Booking could not be deleted');
  }
  
  // In a real app, this would remove from database
  return booking;
}
