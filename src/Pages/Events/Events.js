import React, { useEffect, useState } from "react";
import "./Events.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./../../Firebase/firebase.init";
import Header from "./../../Components/Header/Header";
import axios from "axios";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  useEffect(() => {
    const getEvents = async () => {
      const email = user.email;
      try {
        const { data } = await axios.get(
          `https://volunteer-network207.herokuapp.com/volunteerEvents?email=${email}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setEvents(data);
      } catch (error) {
        if (error.response.status === 401 || error.response.status === 403) {
          signOut(auth);
          navigate("/signin");
        }
      }
    };
    getEvents();
  }, [user]);

  const handleDelete = (id) => {
    axios
      .delete(
        `https://volunteer-network207.herokuapp.com/volunteerEvents/${id}`
      )
      .then((response) => {
        if (response.data.deletedCount > 0) {
          const remaining = events.filter(({ _id }) => _id !== id);
          setEvents(remaining);
        }
      });
  };
  return (
    <>
      <Header />
      <div className=" Container">
        <div className="events-card-container">
          {events.map((event) => (
            <div className="event-card">
              <div className="event-img">
                <img src={event?.event?.eventBannerUrl} alt="" />
              </div>
              <div>
                <h3>{event.event.eventTitle}</h3>
                <p>{event.event.eventDate}</p>
              </div>
              <button
                className="Cancel-btn"
                onClick={() => handleDelete(event._id)}
              >
                Cancel
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Events;
