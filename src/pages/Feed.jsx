import axios from "axios";
import React, { useEffect } from "react";
import BASE_URL from "../config/baseurl";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "../components/UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  console.log("feed", feed);

  const getFeed = async () => {
    if (feed) {
      return;
    }
    try {
      const feedData = await axios.get(
        BASE_URL + "/user/feed?page=1&limit=10",
        {
          withCredentials: true,
        }
      );

      console.log("feedData", feedData);

      dispatch(addFeed(feedData?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);
  const handleInterested = () => {
    console.log("User interested in:", feed[0]?.firstName);
    // Add API call for interested action
  };

  const handleIgnored = () => {
    console.log("User ignored:", feed[0]?.firstName);
    // Add API call for ignored action
  };

  return (
    feed && (
      <div>
        <UserCard
          userFeed={feed[0]}
          showButtons={true}
          onInterested={handleInterested}
          onIgnored={handleIgnored}
        />
      </div>
    )
  );
};

export default Feed;
