import React, { useEffect } from "react";
import { Paper, Container, Card } from "@mui/material";
import Chat from "./InsideEvent/Chat";
import Heading from "./InsideEvent/Heading";
import SideBar from "./InsideEvent/SideBar";
import Activities from "./InsideEvent/Activities";
import { useLocation } from "react-router-dom";
import { getServerData } from "../utils/getServerData";

const Event = ({ theme }) => {
  const location = useLocation();
  const props = location.state.result;
  console.log(theme, props);
  const myEvents = JSON.parse(localStorage.getItem("myEvents"));

  useEffect(() => {
    getServerData(props.reference_id);
  });

  return (
    <Container id="container">
      <Heading theme={theme} name={props.serverName} />
      <SideBar myEvents={myEvents} refId={props.reference_id} theme={theme} />
      <Chat theme={theme} refId={props.reference_id} />
      <Activities theme={theme} />
    </Container>
  );
};

export default Event;
