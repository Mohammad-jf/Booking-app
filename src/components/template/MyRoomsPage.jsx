import getMyRooms from "@/actions/getMyRooms";
import Heading from "../modules/Heading";
import MyRoomsCard from "../modules/MyRoomsCard";

const MyRoomsPage = async () => {
  const rooms = await getMyRooms();

  return (
    <>
      <Heading title="My Rooms" />
      {rooms.length > 0 ? (
        rooms.map((room) => <MyRoomsCard key={room.$id} room={room} />)
      ) : (
        <p>You Dont have any room listed</p>
      )}
    </>
  );
};

export default MyRoomsPage;
