"use server";
import { createSessionClient } from "@/config/appwrite";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Query } from "node-appwrite";
import { DateTime } from "luxon";

// convert date string to luxon DateTime object in utc
function toUtcDateTime(dateString) {
  return DateTime.fromISO(dateString, {
    zone: "utc",
  }).toUTC();
}

// check for overlapping date ranges
function dateRangesOverLap(checkInA, checkOutA, checkInB, checkOutB) {
  return checkInA < checkOutB && checkOutA > checkInB;
}

async function checkRoomAvailability(roomId, checkIn, checkOut) {
  const sessionCookie = cookies().get("appwrite-session");
  if (!sessionCookie) {
    redirect("/login");
  }

  try {
    const { databases } = await createSessionClient(sessionCookie.value);
    const checkInDatetime = toUtcDateTime(checkIn);
    const checkOutDatetime = toUtcDateTime(checkOut);

    // fetch all bookings for a given room
    const { documents: bookings } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
      [Query.equal("room_id", roomId)]
    );

    // loop over bookings and overlaps
    for (const booking of bookings) {
      const bookingCheckInDateTime = toUtcDateTime(booking.check_in);
      const bookingCheckOutDateTime = toUtcDateTime(booking.check_out);

      if (
        dateRangesOverLap(
          checkInDatetime,
          checkOutDatetime,
          bookingCheckInDateTime,
          bookingCheckOutDateTime
        )
      ) {
        return false; //over lap found
      }
    }

    // no overlap found
    return true;
  } catch (error) {
    console.log("failed to check availability", error);
    return {
      error: "failed to check availability",
    };
  }
}

export default checkRoomAvailability;
