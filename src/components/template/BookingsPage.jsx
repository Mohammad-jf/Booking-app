import getMybookings from "@/actions/getMybookings";
import Heading from "../modules/Heading";
import BookRoomCard from "../modules/BookRoomCard";

const BookingsPage = async () => {
  const bookings = await getMybookings();

  return (
    <>
      {bookings.length === 0 ? (
        <p className="text-gray-600 mt-4">You have no Bookings</p>
      ) : (
        bookings.map((booking) => (
          <BookRoomCard booking={booking} key={booking.$id} />
        ))
      )}
    </>
  );
};

export default BookingsPage;
