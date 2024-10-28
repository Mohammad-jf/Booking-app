import Heading from "../modules/Heading";
import RoomCard from "../modules/RoomCard";

const HomePage = ({ rooms }) => {
  return (
    <>
      <Heading title="Available Rooms" />
      {rooms.length > 0 ? (
        rooms.map((room) => <RoomCard key={room.$id} room={room} />)
      ) : (
        <p>No Rooms Available</p>
      )}
    </>
  );
};

export default HomePage;
