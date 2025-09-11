import axios from "axios";
import React, { useEffect } from "react";
import BASE_URL from "../config/baseurl";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import { data } from "react-router-dom";
import ConnectionCard from "../components/ConnectionCard";

const Connection = () => {
  const connections = useSelector((store) => store.connection);
  console.log("connection", connections);

  const dispatch = useDispatch();
  const fetchData = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/view/connections", {
        withCredentials: true,
      });
      console.log("res", res);
      dispatch(addConnection(res?.data?.data));
    } catch (error) {
      console.log("Axios Error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!connections) {
    return null;
  }

  if (connections.length === 0) {
    return <h1>Connection Data Not Found..!</h1>;
  }

  return (
    <div className="min-h-[calc(100vh-140px)] bg-base-200 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">My Connections</h1>
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {connections.map((connection, index) => {
            return <ConnectionCard key={index} connection={connection} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Connection;
