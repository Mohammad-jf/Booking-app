import RoomPage from "@/components/template/RoomPage";
import Heading from "@/components/modules/Heading";
import getSingleRoom from "@/actions/getSingleRoom";

const Room = async ({ params }) => {
  const id = params.id;
  const room = await getSingleRoom(id);

  if (!room) {
    return <Heading title="Room Not Found" />;
  }

  return <RoomPage room={room} />;
};

export default Room;
