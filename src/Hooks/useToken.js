import axios from "axios";
import { useEffect, useState } from "react";

const useToken = (user) => {
  const [token, setToken] = useState("");
  useEffect(() => {
    const email = user?.user?.email;
    if (email) {
      const getToken = async () => {
        const { data } = await axios.post(
          "https://volunteer-network207.herokuapp.com/auth/getToken",
          {
            email,
          }
        );
        setToken(data);
        localStorage.setItem("accessToken", data.accessToken);
      };
      getToken();
    }
  }, [user]);
  return { token };
};

export default useToken;
