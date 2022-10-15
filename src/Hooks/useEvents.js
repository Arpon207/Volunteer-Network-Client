import axios from "axios";
import { useEffect, useState } from "react";

const useEvents = (searchText) => {
  const [events, setVolunteers] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://volunteer-network207.herokuapp.com/events?searchText=${searchText}`
      )
      .then((response) => setVolunteers(response.data));
  }, [searchText]);
  return { events, setVolunteers };
};

export default useEvents;
