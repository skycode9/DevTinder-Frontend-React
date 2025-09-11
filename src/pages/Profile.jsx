import React, { use, useState } from "react";

const Profile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");
  const [error, setError] = useState("");

  const handleEditProfile = () => {};
  return (
    <>
      <div className="min-h-[calc(100vh-140px)] bg-base-200 flex items-center justify-center py-4">
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
                <button className="btn btn-primary" onClick={handleEditProfile}>
                  Save Profile
                </button>
              </div>

              {error && <p className="text-red-500 shadow-2xl">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
