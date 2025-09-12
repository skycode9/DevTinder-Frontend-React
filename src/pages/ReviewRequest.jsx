import axios from "axios";
import React, { useEffect, useState } from "react";
import BASE_URL from "../config/baseurl";
import ConnectionRequestCard from "../components/ConnectionRequestCard";

const ReviewRequest = () => {
  const [connectionRequest, setConnectionrequest] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      console.log("res", res?.data?.connectionRequest);

      setConnectionrequest(res?.data?.connectionRequest);

      console.log("crs", connectionRequest);
    } catch (error) {
      console.log("Axios Error: " + error);
      console.log("Error Message" + error?.response?.data?.msg);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!connectionRequest) return;

  if (connectionRequest.length === 0) {
    return (
      <h1 className="flex justify-center py-4 text-2xl font-semibold">
        No Request Found
      </h1>
    );
  }

  return (
    connectionRequest && (
      <div>
        {connectionRequest.map((connectionRequest, index) => {
          console.log("cr", connectionRequest);
          return (
            <ConnectionRequestCard
              userData={connectionRequest.fromUserId}
              reqId={connectionRequest._id}
              key={connectionRequest._id}
            />
          );
        })}
      </div>
    )
  );
};

export default ReviewRequest;
