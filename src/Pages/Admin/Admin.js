import React, { useState } from "react";
import "./Admin.css";
import logo from "../../Images/logos/Group 1329.png";
import { FiUsers } from "react-icons/fi";
import { AiOutlinePlus } from "react-icons/ai";
import AddEvent from "./AddEvent/AddEvent";

const Admin = () => {
  const [toggle, setToggle] = useState(1);

  const handleToggle = (index) => {
    setToggle(index);
  };

  return (
    <div className="admin">
      <div className="admin-header">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <h2>{toggle === 1 ? "Volunteer register list" : "Add event"}</h2>
      </div>
      <div className="admin-body">
        <div className="sidebar">
          <div className="sidebar-buttons">
            <button
              className={toggle === 1 && "active-btn"}
              onClick={() => handleToggle(1)}
            >
              <FiUsers /> Volunteer register list
            </button>
            <button
              className={toggle === 2 && "active-btn"}
              onClick={() => handleToggle(2)}
            >
              <AiOutlinePlus /> Add event
            </button>
          </div>
        </div>
        <div className="admin-main">
          <div
            className={
              toggle === 1 ? "volunteer-list active" : "volunteer-list"
            }
          >
            <h1>Volunteers</h1>
          </div>
          <div className={toggle === 2 ? "add-event active " : "add-event"}>
            <AddEvent />
          </div>
          <div className="event-submit-btn">
            {toggle === 2 && (
              <button
                form="eventForm"
                className="event-submit-btn"
                type="submit"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
