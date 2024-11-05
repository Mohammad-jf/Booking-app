"use server";
import { createSessionClient } from "@/config/appwrite";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import checkAuth from "./checkAuth";

async function cancelBooking({ bookingId }) {
  const sessionCookie = cookies().get("appwrite-session");
  if (!sessionCookie) {
    redirect("/");
  }

  try {
    const { databases } = await createSessionClient(sessionCookie.value);

    const { user } = await checkAuth();
    if (!user) {
      return {
        error: "unAuthorize",
      };
    }

    const { documents: booking } = await databases.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
      bookingId
    );

    if (booking.user._id !== user.id) {
      return {
        error: "you are not authorize to cancel this booking",
      };
    }

    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
      bookingId
    );

    revalidatePath("/bookings", "layout");
    return {
      success: true,
    };
  } catch (error) {
    console.log("failed to cancel Booking", error);
    redirect("/error");
  }
}

export default cancelBooking;
