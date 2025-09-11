import axios from "axios";
import React, { useEffect } from "react";
import BASE_URL from "../config/baseurl";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import { data } from "react-router-dom";

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
          {connections.map((elem, index) => {
            const { firstName, lastName, photoUrl, age, gender, about } = elem;
            return (
              <div key={index} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div className="card-body">
                  <div className="flex items-center gap-4">
                    <div className="avatar">
                      <div className="w-16 h-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img
                          alt={`${firstName} ${lastName}`}
                          src={photoUrl}
                          className="rounded-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h2 className="card-title text-xl">
                        {firstName} {lastName}
                      </h2>
                      {age && gender && (
                        <p className="text-sm text-base-content/70 mb-2">
                          {age} years old • {gender}
                        </p>
                      )}
                      <p className="text-sm line-clamp-2">{about}</p>
                    </div>
                    <div className="card-actions">
                      <button className="btn btn-primary btn-sm">
                        Message
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Connection;
