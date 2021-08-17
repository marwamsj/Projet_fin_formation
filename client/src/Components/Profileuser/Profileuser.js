import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { upprofileuser } from "../../JS/Actions/auth";
import axios from "../../helpers/axios";
import { Link } from "react-router-dom";

function Profileuser() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [pofilePicture, setPofilePicture] = useState("");
  const [cloudinaryId, setCloudinaryId] = useState("");

  useEffect(() => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setUsername(user.username);
    setEmail(user.email);
    setContactNumber(user.contactNumber);
    setPofilePicture(user.pofilePicture);
    setCloudinaryId(user.cloudinaryId);
  }, [user]);

  const handleUpload = async (e) => {
    try {
      const file = e.target.files[0];
      let formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(`/atelier/upload`, formData);
      setPofilePicture(res.data.url);
      setCloudinaryId(res.data.public_id);
    } catch (error) {
      alert(error.response.data.msg);
    }
  };
  const handleDestroy = async () => {
    try {
      await axios.post(`/atelier/destroy`, {
        public_id: cloudinaryId,
      });
      setPofilePicture("");
      setCloudinaryId("");
    } catch (error) {
      alert(error.response.msg);
    }
  };
  const handlepr = () => {
    const form = new FormData();
    form.append("firstName", firstName);
    form.append("lastName", lastName);
    form.append("username", username);
    form.append("email", email);
    form.append("contactNumber", contactNumber);
    form.append("pofilePicture", pofilePicture);
    form.append("cloudinaryId", cloudinaryId);

    dispatch(upprofileuser(form));
    
  };

  const styleUpload = {
    display: pofilePicture ? "block" : "none",
  };

  return (
    <div className="create_product">
      <div className="upload">
        <input type="file" name="file" id="file_up" onChange={handleUpload} />
        <div id="file_img" style={styleUpload}>
        
          <img src={pofilePicture} alt="product" />
          <span onClick={handleDestroy}>X</span>
        </div>
      </div>
      <form>
        <div className="row">
          <label htmlFor="Product Name">firstName</label>
          <input
            value={firstName}
            label="firstName"
            placeholder="firstName"
            name="firstName"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="row">
          <label htmlFor="Product Name">lastName</label>
          <input
            value={lastName}
            label="lastName"
            placeholder="lastName"
            name="lastName"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="row">
          <label htmlFor="Product Name">username</label>
          <input
            value={username}
            label="username"
            placeholder="username"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="row">
          <label htmlFor="Product Name">email</label>
          <input
            value={email}
            label="email"
            placeholder="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="row">
          <label htmlFor="Product Name">contactNumber</label>
          <input
            value={contactNumber}
            label="contactNumber"
            placeholder="contactNumber"
            name="contactNumber"
            onChange={(e) => setContactNumber(e.target.value)}
          />
        </div>

        <Link to="/">
          <button type="submit" onClick={handlepr}>
            update
          </button>
        </Link>
      </form>
    </div>
  );
}

export default Profileuser;
