"use client";
import cancelBooking from "@/actions/cancelBooking";
import { toast } from "react-toastify";

const CancelBookingButton = ({ bookingId }) => {
  const handleCancel = async () => {
    const confirm = window.confirm("are you sure you want to cancel ?");
    if (!confirm) {
      return;
    }

    try {
      const res = await cancelBooking(bookingId);

      if (res.error) {
        toast.error(res.error);
      }

      if (res.success) {
        toast.success("Booking canceld successfully");
      }
    } catch (error) {
      console.log("failed to cancel booking", error);
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
