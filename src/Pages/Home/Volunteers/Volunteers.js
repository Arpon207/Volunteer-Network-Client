import React, { useState } from "react";
import "./Volunteers.css";
import { useEffect } from "react";
import axios from "axios";

const Volunteers = () => {
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/volunteers")
      .then((response) => setVolunteers(response.data));
  }, []);

  console.log(volunteers);
  return (
    <div className="volunteers container">
      {volunteers.map(({ _id, eventTitle, eventBannerUrl }) => (
        <div key={_id}>
          <img src={eventBannerUrl} alt="" />
          <h3>{eventTitle}</h3>
        </div>
      ))}
    </div>
  );
};

export default Volunteers;
