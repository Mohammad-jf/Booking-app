import rooms from "../../../data/rooms.json";
import Heading from "../modules/Heading";
import RoomCard from "../modules/RoomCard";

const HomePage = () => {
  return (
    <>
      <Heading title="Available Rooms" />
      {rooms.length > 0 ? (
        rooms.map((room) => <RoomCard room={room} />)
      ) : (
        <p>No Rooms Available</p>
      )}
    </>
  );
};

export default HomePage;
            