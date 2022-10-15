import React from "react";
import "./Volunteers.css";
import { useNavigate } from "react-router-dom";
import useEvents from "./../../../Hooks/useEvents";

const Volunteers = ({ searchText }) => {
  const navigate = useNavigate();
  const { events } = useEvents(searchText);

  return (
    <div className="volunteers Container">
      {events.map((event) => (
        <div
          className="event"
          key={event._id}
          onClick={() =>
            navigate("/register", {
              state: { event },
            })
          }
        >
          <img src={event.eventBannerUrl} alt="" />
          <div>
            <h3>{event.eventTitle}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Volunteers;
