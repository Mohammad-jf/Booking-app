import rooms from "../../../data/rooms.json";
import RoomCard from "../modules/RoomCard";

const HomePage = () => {
  return (
    <>
      {rooms.length > 0 ? (
        rooms.map((room) => <RoomCard room={room} />)
      ) : (
        <p>No Rooms Available</p>
      )}
    </>
  );
};

export default HomePage;
