import getAllRooms from "@/actions/getAllRooms";
import HomePage from "@/components/template/HomePage";

export default async function Home() {
  const rooms = await getAllRooms();
  return <HomePage rooms={rooms} />;
}
