import React, { use, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import UserCard from "../components/UserCard";
import axios from "axios";
import BASE_URL from "../config/baseurl";

const Profile = () => {
  const userData = useSelector((store) => store.user);
  console.log("user", userData);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (userData) {
      setFirstName(userData.firstName || "");
      setLastName(userData.lastName || "");
      setPhotoUrl(userData.photoUrl || "");
      setAge(userData.age || "");
      setGender(userData.gender || "");
      setAbout(userData.about || "");
    }
  }, [userData]);

  const handleEditProfile = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about },
        { withCredentials: true }
      );
      console.log("res", res);
    } catch (error) {
      console.log("error", res?.data?.err || res?.data?.msg);
      setError("");
    }
  };

  return (
    userData && (
      <>
        <div className="min-h-[calc(100vh-140px)] bg-base-200 flex  justify-center py-4">
          <div className="card w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <h2 className="text-center text-2xl font-bold">Edit Profile</h2>

              <form>
                {/* Email */}
                <div className="form-control">
                  <label className="label py-1">
                    <span className="label-text">First Name</span>
                  </label>
                  <input
                    className="input input-bordered"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>

                <div className="form-control mt-4">
                  <label className="label py-1">
                    <span className="label-text">Last Name</span>
                  </label>
                  <input
                    className="input input-bordered"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>

                <div className="form-control mt-4">
                  <label className="label py-1">
                    <span className="label-text">Photo Url</span>
                  </label>
                  <input
                    className="input input-bordered"
                    required
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </div>

                <div className="form-control mt-4">
                  <label className="label py-1">
                    <span className="label-text">Age</span>
                  </label>
                  <input
                    className="input input-bordered"
                    required
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>

                <div className="form-control mt-4">
                  <label className="label py-1">
                    <span className="label-text">Gender</span>
                  </label>
                  <input
                    className="input input-bordered"
                    required
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  />
                </div>

                <div className="form-control mt-4">
                  <label className="label py-1">
                    <span className="label-text">About</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered"
                    required
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    rows="3"
                  />
                </div>

                {/* Submit Button */}
                <div className="form-control mt-4">
                  <button
                    className="btn btn-primary"
                    onClick={handleEditProfile}
                  >
                    Save Profile
                  </button>
                </div>

                {error && <p className="text-red-500 shadow-2xl">{error}</p>}
              </form>
            </div>
          </div>
          <div className="ml-4">
            <UserCard userFeed={userData} />
          </div>
        </div>
      </>
    )
  );
};

export default Profile;
