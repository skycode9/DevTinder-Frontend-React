import React from "react";

const UserCard = ({ userFeed, showButtons = true, onInterested, onIgnored }) => {
  const { firstName, lastName, about, age, gender, photoUrl } = userFeed;

  return (
    <div className="flex justify-center items-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <figure>
          <img src={photoUrl} alt="Shoes" className="w-[65%]" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {firstName} {lastName}
          </h2>
          <h2>{age && age}</h2>
          <h2>{gender && gender}</h2>
          <p>{about}</p>
          {showButtons && (
            <div className="card-actions justify-end">
              <button 
                className="btn btn-primary" 
                onClick={onInterested}
              >
                Interested
              </button>
              <button 
                className="btn btn-error" 
                onClick={onIgnored}
              >
                Ignored
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
