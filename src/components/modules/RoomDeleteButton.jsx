"use client";
import deleteRoom from "@/actions/deleteRoom";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";

const RoomDeleteButton = ({ roomId }) => {
  const handleDelete = async () => {
    const confirm = window.confirm(
      "are you suer you want to delete this room ? "
    );
    if (confirm) {
      try {
        const res = await deleteRoom(roomId);
        toast.success("room deleted successfully");
      } catch (error) {
        console.log("failed to delete room", error);
        toast.error("failed to delete room");
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white px-4 py-2 rounded mb-2 sm:mb-0 w-full 
      sm:w-auto text-center hover:bg-red-700"
    >
      <FaTrash className="inline mr-1" /> Delete
    </button>
  );
};

export default RoomDeleteButton;
