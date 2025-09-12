import axios from "axios";
import React, { useEffect } from "react";
import BASE_URL from "../config/baseurl";
import { useDispatch, useSelector } from "react-redux";
import { addUserToFeed } from "../utils/feedSlice";
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

      dispatch(addUserToFeed(feedData?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return null;
  if (feed.length == 0)
    return <h1 className="flex justify-center my-10">No new users founds!</h1>;
  return (
    feed && (
      <div>
        <UserCard userFeed={feed[0]} showButtons={true} />
      </div>
    )
  );
};

export default Feed;
