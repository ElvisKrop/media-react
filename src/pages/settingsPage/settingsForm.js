import React, { useState } from "react";

function SettingsForm({ userLogOut, user, sendForm }) {
  let { image, username, bio, email, ...restData } = user;

  const [newImage, setImage] = useState(image);
  const [newUsername, setUsername] = useState(username);
  const [newBio, setBio] = useState(bio);
  const [newEmail, setEmail] = useState(email);
  const [newPassword, setPassword] = useState("");

  const newUser = {
    image: newImage,
    username: newUsername,
    bio: newBio,
    email: newEmail,
    password: newPassword,
    ...restData
  };

  return (
    <div className="container text-center">
      <div className="col-lg-6 col-sm-10 col-11 mt-5 m-auto">
        <h1 className="mt-4 mb-3">Your Settings</h1>
        <form
          onSubmit={(e) => {
            sendForm(e, newUser);
            setPassword("");
          }}>
          <fieldset>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="URL of profile picture"
                value={newImage}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                value={newUsername}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <textarea
                className="form-control"
                placeholder="Short bio about you"
                value={newBio}
                onChange={(e) => setBio(e.target.value)}
                rows="8"></textarea>
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={newEmail}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary float-right">
              Update Settings
            </button>
          </fieldset>
        </form>
        <hr />
        <div style={{ height: "50px" }}>
          <button
            className="btn btn-outline-danger float-left"
            onClick={() => userLogOut()}>
            Or click here to logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingsForm;
