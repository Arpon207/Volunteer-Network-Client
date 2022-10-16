import React, { useState } from "react";
import "./Register.css";
import logo from "../../Images/logos/Group 1329.png";
import { format } from "date-fns";
import { Calendar } from "react-date-range";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useLocation, useNavigate } from "react-router-dom";
import useEvents from "./../../Hooks/useEvents";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./../../Firebase/firebase.init";
import axios from "axios";

const Register = () => {
  const { events } = useEvents("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState(new Date());
  const [user] = useAuthState(auth);
  const location = useLocation();
  const navigate = useNavigate();

  const { eventTitle } = location.state?.event || "";

  const handleSetDate = (date) => {
    setDate(date);
    setShowCalendar(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const selectedDate = format(date, "dd-MM-yyyy");
    const event =
      location.state?.event ||
      events.find((event) => event.eventTitle == e.target.eventSelect.value);
    const volunteer = {
      name,
      email,
      selectedDate,
      event,
    };
    if (!Object.values(volunteer).some((v) => v === "")) {
      axios
        .post(
          "https://volunteer-network207.herokuapp.com/volunteers",
          volunteer
        )
        .then((response) => {
          if (response.data) {
            navigate("/events");
            alert("You have successfully registered for volunteer work.");
          }
        });
    }
  };
  return (
    <div className="register">
      <img onClick={() => navigate("/")} src={logo} alt="" />
      <div className="register-form">
        <h3>Register as a Volunteer</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <input
              defaultValue={user?.displayName}
              type="text"
              name="name"
              id="name"
              placeholder="Full Name"
              required
            />
          </div>
          <div className="input-wrapper">
            <input
              defaultValue={user?.email}
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              required
            />
          </div>
          <div className="input-wrapper">
            <input
              onClick={() => setShowCalendar(!showCalendar)}
              value={format(date, "dd MMMM yyyy")}
              id="date"
              className="date"
              readOnly
            />
            <div className="calender">
              {showCalendar && (
                <Calendar
                  onChange={(date) => handleSetDate(date)}
                  date={date}
                  minDate={date}
                />
              )}
            </div>
          </div>
          <div className="input-wrapper">
            <input
              type="text"
              name="description"
              id="description"
              placeholder="Description"
            />
          </div>
          <div className="input-wrapper">
            {eventTitle ? (
              <input name="event" defaultValue={eventTitle} />
            ) : (
              <select name="eventSelect" id="event">
                {events.map((volunteer) => (
                  <option>{volunteer.eventTitle}</option>
                ))}
              </select>
            )}
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
