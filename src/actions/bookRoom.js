"use server";
import { createSessionClient } from "@/config/appwrite";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ID } from "node-appwrite";
import checkAuth from "./checkAuth";
import { revalidatePath } from "next/cache";

async function bookRoom(previousState, formData) {
  const sessionCookie = cookies().get("appwrite-session");
  if (!sessionCookie) {
    redirect("/");
  }

  try {
    const { databases } = await createSessionClient(sessionCookie.value);

    const { user } = await checkAuth();

    if (!user) {
      return {
        error: "you must be logged in to book a room",
      };
    }

    // extract date and time from form
    const checkInDate = formData.get("check_in_date");
    const checkInTime = formData.get("check_in_time");
    const checkOutDate = formData.get("check_out_date");
    const checkOutTime = formData.get("check_out_time");

    // combine date and time to ISO 8601 format
    const checkInDateTime = `${checkInDate}T${checkInTime}`;
    const checkOutDateTime = `${checkOutDate}T${checkOutTime}`;

    const bookingData = {
      check_in: checkInDateTime,
      check_out: checkOutDateTime,
      user_id: user.id,
      room_id: formData.get("room_id"),
    };

    //create booking
    const newBooking = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE, //database id
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS, //collection id,
      ID.unique(),
      bookingData
    );

    revalidatePath("/bookings", "layout");
    return {
      success: true,
    };
  } catch (error) {
    console.log("failed to book a room", error);
    return {
      error: "something went wrong booking the room",
    };
  }
}

export default bookRoom;
