"use client";
import cancelBooking from "@/actions/cancelBooking";
import { toast } from "react-toastify";

const CancelBookingButton = ({ booking }) => {
  const handleCancel = async () => {
    const res = await cancelBooking(booking.$id);

    if (res.error) {
      toast.error(res.error);
    }

    if (res.success) {
      toast.success("Booking canceld successfully");
    }
  };

  return (
    <button
      onClick={handleCancel}
      className="bg-red-500 text-white px-4 py-2 rounded w-full sm:w-auto text-center hover:bg-red-700"
    >
      Cancel Booking
    </button>
  );
};

export default CancelBookingButton;
