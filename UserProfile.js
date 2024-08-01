import React from "react";

const UserProfile = ({ username, onLogout }) => {
  return (
    <div className="user-profile">
      <h2>Welcome, {username}!</h2>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default UserProfile;
