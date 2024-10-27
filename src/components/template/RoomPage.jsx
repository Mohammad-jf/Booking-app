import React from "react";
import Heading from "../modules/Heading";

const RoomPage = ({ room }) => {
  return (
    <>
      <Heading title={room.name} />
    </>
  );
};

export default RoomPage;
