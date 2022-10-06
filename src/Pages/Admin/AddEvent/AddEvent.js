import React, { useState } from "react";
import "./AddEvent.css";
import { Calendar } from "react-date-range";
import { format } from "date-fns";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import axios from "axios";

const AddEvent = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState(new Date());

  const handleSetDate = (date) => {
    setDate(date);
    setShowCalendar(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventTitle = e.target.title.value;
    const eventDate = format(date, "dd-MM-yyyy");
    const eventDesc = e.target.description.value;
    const eventBannerUrl = e.target.banner.value;
    const event = { eventTitle, eventDate, eventDesc, eventBannerUrl };
    if (eventTitle && eventDate && eventDesc && eventBannerUrl) {
      axios
        .post("http://localhost:5000/volunteers", event)
        .then((response) => console.log(response));
    }
  };
  return (
    <div>
      <form id="eventForm" onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="title">Event Title</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Event Title"
          />
        </div>
        <div className="input-wrapper">
          <label>Event Date</label>
          <input
            onClick={() => setShowCalendar(!showCalendar)}
            value={format(date, "dd-MM-yyyy")}
            id="date"
            readOnly
          />
          {showCalendar && (
            <Calendar
              onChange={(date) => handleSetDate(date)}
              date={date}
              minDate={date}
            />
          )}
        </div>
        <div className="input-wrapper">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="5"
            placeholder="Description"
          ></textarea>
        </div>
        <div className="input-wrapper">
          <label htmlFor="banner">Banner</label>
          <input
            type="text"
            name="banner"
            id="banner"
            placeholder="Banner URL"
          />
        </div>
      </form>
    </div>
  );
};

export default AddEvent;
