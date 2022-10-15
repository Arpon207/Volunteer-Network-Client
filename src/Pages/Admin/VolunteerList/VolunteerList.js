import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import "./VolunteerList.css";

import { MdDeleteForever } from "react-icons/md";

const VolunteerList = () => {
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    axios
      .get("https://volunteer-network207.herokuapp.com/volunteers")
      .then((response) => setVolunteers(response.data));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`https://volunteer-network207.herokuapp.com/volunteers/${id}`)
      .then((response) => {
        if (response.data.deletedCount > 0) {
          const remaining = volunteers.filter(
            (volunteer) => volunteer._id !== id
          );
          setVolunteers(remaining);
        }
      });
  };

  return (
    <div>
      <Table responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email ID</th>
            <th>Registrating Date</th>
            <th>Volunteer List</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {volunteers.map(
            ({ email, event, name, selectedDate, _id }, index) => (
              <tr key={_id}>
                <td>{index + 1}</td>
                <td>{name}</td>
                <td>{email}</td>
                <td>{selectedDate}</td>
                <td>{event.eventTitle}</td>
                <td className="delete">
                  <button onClick={() => handleDelete(_id)}>
                    <MdDeleteForever />
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default VolunteerList;
