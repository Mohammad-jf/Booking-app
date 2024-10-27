import RoomPage from "@/components/template/RoomPage";
import rooms from "../../../../data/rooms.json";
import Heading from "@/components/modules/Heading";

const Room = ({ params }) => {
  const id = params.id;
  const room = rooms.find((room) => room.$id === id);

  if (!room) {
    return <Heading title="Room Not Found" />;
  }

  return <RoomPage room={room} />;
};

export default Room;
