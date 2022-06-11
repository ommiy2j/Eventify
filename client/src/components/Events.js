import { Pagination } from "@mui/material";
import React, { useEffect, useState, Component } from "react";
import styled from "styled-components";
import Loader from "../Loader";
import AddEvent from "./AddEvent/AddEvent";
import AddEvents from "./AddEvent/AddEvent";
import Button from "./Elements/Button";
import EventCard from "./EventCard";
import MyEventsCard from "./MyEvents";

const Events = ({ theme }) => {
  const [myEvents, setMyEvents] = useState([]);
  const [ongoingEvents, setOngoingEvents] = useState([]);
  const [UpcomingEvents, setUpcomingEvents] = useState([]);
  const [AllEvent, setAllEvent] = useState([]);
  const [addPop, setAddPop] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [didMount, setDidMount] = useState(false);
  const [totalPage, setTotalPage] = useState(1);

  const showAddEvent = () => {
    console.log(addPop);
    setAddPop(true);
  };
  const closeAddEvent = () => {
    console.log(addPop);
    setAddPop(false);
  };

  const getMyEvents = () => {
    fetch(`http://localhost:8000/api/server/servers?page=${page}`, {
      method: "GET",
      headers: {
        "X-Auth-Token": localStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (res.status === 422) {
          throw new Error("Validation failed.");
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log("Error!");
          throw new Error("Could not Fetch  events!");
        }
        return res.json();
      })
      .then((events) => {
        localStorage.setItem('myEvents',JSON.stringify(events))
        setMyEvents(events);
        console.log(myEvents);
        // setTotalPage(events.total);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllEvents = () => {
    fetch(`http://localhost:8000/api/server/allservers?page=${page}`, {
      method: "GET",
      headers: {
        "X-Auth-Token": localStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (res.status === 422) {
          throw new Error("Validation failed.");
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log("Error!");
          throw new Error("Could not Fetch  events!");
        }
        return res.json();
      })
      .then((events) => {
        // console.log(events);
        setOngoingEvents(events.result);
        // console.log(ongoingEvents);
        setTotalPage(events.total);
        setLoading(false);
        //filter ongoingevents
        // setOngoingEvents(() => {
        // 	AllEvent.filter((a) => {
        // 		var date = new Date(a.ProductHits);
        // 		return date >= startDate && date <= endDate;
        // 	});
        // });
        // console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlepaging = (e, p) => {
    console.log(p);
    setPage(p);
  };

  useEffect(() => {
    setDidMount(true);
    getAllEvents();
    getMyEvents();
    return () => setDidMount(false);
  }, [page]);

  if (!didMount) {
    return null;
  }
  return (
    <EventCotainer>
      <Cover theme={theme}>
        <EventHEading theme={theme}>Events</EventHEading>
        <Button
          children="Create Event"
          color="#fff"
          bgcolor="#000B49"
          onClick={showAddEvent}
        />
      </Cover>
      <AllEvents>
        <MyEvents>
          <Heading theme={theme}>My Events</Heading>
          <AllMyEvents>
            {loading ? (
              <Loader />
            ) : (
              myEvents.map((event) => (
                <MyEventsCard
                  key={event._id}
                  refId={event.reference_id}
                  id={event._id}
                  result={event}
                />
              ))
            )}
          </AllMyEvents>
        </MyEvents>
        <OnGoingEvent>
          <Heading theme={theme}>Ongoing Events</Heading>
          <ShowAllEvents>
            {loading ? (
              <Loader />
            ) : (
              ongoingEvents.map((event) => (
                <EventCard
                  key={event._id}
                  refId={event.reference_id}
                  id={event._id}
                  result={event}
                />
              ))
            )}
          </ShowAllEvents>
          <Pagination
            onChange={handlepaging}
            count={totalPage}
            color="primary"
          />
        </OnGoingEvent>

        <UpcomingEvent>
          <Heading theme={theme}>Upcoming Events</Heading>
          <ShowAllEvents>
            {UpcomingEvents.length > 0 ? (
              UpcomingEvents.map((events) => {
                <EventCard
                  id={events._id}
                  key={events._id}
                  eventName={events.eventName}
                  eventDate={events.eventDate}
                  eventImg={events.eventImg}
                />;
              })
            ) : (
              <Nothing>Nothing to show</Nothing>
            )}
          </ShowAllEvents>
          <Pagination
            onChange={handlepaging}
            count={totalPage}
            color="primary"
          />
        </UpcomingEvent>
      </AllEvents>
      <AddEvent closeAddEvent={closeAddEvent} addPop={addPop} />
    </EventCotainer>
  );
};

export default Events;

const EventCotainer = styled.div`
  // padding-top: 50px;
  padding-bottom: 40px;
  font-family: "Varela Round", sans-serif;
  position: relative;
`;
const UpcomingEvent = styled.div`
  position: relative;
`;

const Container = styled.div`
  padding-top: 10px;
  display: flex;
`;
const MyEvents = styled.div`
  position: relative;
`;
const OnGoingEvent = styled.div`
  position: relative;
`;
const EventHEading = styled.div`
  font-family: "Telefon Black";
  font-size: 243px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-align: center;
  // padding-top: 20vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: ${(props) => (props.theme === "dark" ? "#f7f7f7" : "#f7f7f7")};
  transition: font-size 0.3s;

  &::first-letter {
    color: ${(props) => (props.theme === "light" ? "#6EBF8B" : "#6EBF8B")};
  }
`;
const Cover = styled.div`
  background-color: ${(props) =>
    props.theme === "dark" ? "rgb(54, 53, 58)" : "#35858B"};
  height: 360px;
  /* background-image: url('https://images.unsplash.com/photo-1510130315046-1e47cc196aa0?auto=format&fit=crop&w=1050&q=80'); */
  background-position: center center;
  background-size: cover;
  cursor: pointer;
`;

const AllEvents = styled.div``;
const Heading = styled.div`
  text-align: left;
  padding: 2vh 1.2vw;
  border-bottom: 1px solid #ccc;
  font-size: 30px;
  font-weight: 600;
  color: ${(p) => (p.theme === "light" ? "#000" : "#fff")};
`;
const ShowAllEvents = styled.div`
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const AllMyEvents = styled.div`
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const Nothing = styled.div`
  font-size: 1.8rem;
  text-align: center;
  margin: 0 auto;
  width: 300px;
`;
