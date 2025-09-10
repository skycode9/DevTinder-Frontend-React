import axios from "axios";
import React, { useEffect } from "react";
import BASE_URL from "../config/baseurl";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "../components/UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    if (feed) {
      return;
    }
    try {
      const feedData = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });

      dispatch(addFeed(feedData?.data?.users));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);
  return (
    feed && (
      <div>
        <UserCard userFeed={feed[0]} />
      </div>
    )
  );
};

export default Feed;
