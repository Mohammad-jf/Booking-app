"use server";
import { createSessionClient } from "@/config/appwrite";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Query } from "node-appwrite";
import { revalidatePath } from "next/cache";

async function deleteRoom(roomId) {
  // get session cookie
  const sessionCookie = cookies().get("appwrite-session");

  if (!sessionCookie) {
    redirect("/");
  }

  try {
    const { account, databases } = await createSessionClient(
      sessionCookie.value
    );

    // get the user
    const user = await account.get();
    const userId = user.$id;

    // fetch rooms
    const { documents: rooms } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
      [Query.equal("user_id", userId)]
    );

    // find room to delete
    const roomToDelete = rooms.find((room) => room.$id === roomId);

    // delete the room
    if (roomToDelete) {
      await databases.deleteDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
        roomToDelete.$id
      );

      //revalidate my rooms and all rooms
      revalidatePath("/rooms/my", "layout");
      revalidatePath("/", "layout");
    } else {
      return {
        error: "Room Not found",
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.log("failed to delete room", error);
    return {
      error: "Room Not found",
    };
  }
}

export default deleteRoom;
