"use server";

import { createBooking as createBookingService, updateGuest as updateGuestService, deleteBooking as deleteBookingService, updateBooking as updateBookingService } from "./data-service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Default guest ID for demo purposes (no authentication)
const DEFAULT_GUEST_ID = 1;

export async function updateGuest(formData) {
  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const updateData = { nationality, countryFlag, nationalID };

  try {
    await updateGuestService(DEFAULT_GUEST_ID, updateData);
    revalidatePath("/account/profile");
  } catch (error) {
    throw new Error("Guest could not be updated");
  }
}

export async function createBooking(bookingData, formData) {
  // Validate that dates are selected
  if (!bookingData.startDate || !bookingData.endDate) {
    throw new Error("Please select check-in and check-out dates");
  }

  // Format dates properly
  const startDate = bookingData.startDate instanceof Date 
    ? bookingData.startDate.toISOString().split('T')[0]
    : bookingData.startDate;
  
  const endDate = bookingData.endDate instanceof Date
    ? bookingData.endDate.toISOString().split('T')[0]
    : bookingData.endDate;

  const newBooking = {
    startDate,
    endDate,
    numNights: bookingData.numNights,
    cabinPrice: bookingData.cabinPrice,
    cabinId: bookingData.cabinId,
    guestId: DEFAULT_GUEST_ID,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations")?.slice(0, 1000) || "",
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  try {
    await createBookingService(newBooking);
  } catch (error) {
    console.error("Booking creation error:", error);
    throw new Error(`Booking could not be created: ${error.message}`);
  }

  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect("/cabins/thankyou");
}

export async function deleteBooking(bookingId) {
  try {
    await deleteBookingService(bookingId);
    revalidatePath("/account/reservations");
  } catch (error) {
    throw new Error("Booking could not be deleted");
  }
}

export async function updateBooking(formData) {
  const bookingId = Number(formData.get("bookingId"));

  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations")?.slice(0, 1000) || "",
  };

  try {
    await updateBookingService(bookingId, updateData);
    revalidatePath(`/account/reservations/edit/${bookingId}`);
    revalidatePath("/account/reservations");
    redirect("/account/reservations");
  } catch (error) {
    throw new Error("Booking could not be updated");
  }
}
