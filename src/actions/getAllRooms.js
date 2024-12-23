"use server";
import { createAdminClient } from "@/config/appwrite";
import { revalidatePath } from "next/cache"; //update the cache
import { redirect } from "next/navigation";

async function getAllRooms() {
  try {
    const { databases } = await createAdminClient();

    // fetch rooms
    const { documents: rooms } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE, //database id
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS //collection id
    );

    // revalidate the cache for the path
    revalidatePath("/", "layout");
    return rooms;
  } catch (error) {
    console.log("failed to get rooms", error);
    redirect("/error");
  }
}

export default getAllRooms;
