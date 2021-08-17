import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {createCart, editCart} from "../../JS/Actions/atelierCart";
import axios from "../../helpers/axios";
import "./ContactCart.css";

function CreateCart() {
  const dispatch = useDispatch();

  const edit = useSelector((state) => state.atelierCart.edit);
  const card = useSelector((state) => state.atelierCart.cardRed);
  
  const [pofilePicture, setPofilePicture] = useState("");
  const [cloudinaryId, setCloudinaryId] = useState("")
  const [atelierName, setAtelierName] = useState("");
  const [responsibleName, setResponsibleName] = useState("");
  const [textDesciptif, setTextDesciptif] = useState("");
  const [email, setEmail] = useState("");
  const [ville, setVille] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  useEffect(() => {
    if (edit) {
      setPofilePicture(card.pofilePicture);
      setCloudinaryId(card.cloudinaryId)
      setAtelierName(card.atelierName);
      setResponsibleName(card.responsibleName);
      setTextDesciptif(card.textDesciptif);
      setEmail(card.email);
      setVille(card.ville);
      setAddress(card.address);
      setContactNumber(card.contactNumber);
    } else {
      setPofilePicture("");
      setCloudinaryId("");
      setAtelierName("");
      setResponsibleName("");
      setTextDesciptif("");
      setEmail("");
      setVille("");
      setAddress("");
      setContactNumber("");
    }
  }, [edit, card]);

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      let formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(`/atelier/upload`, formData);
      setPofilePicture(res.data.url);
      setCloudinaryId(res.data.public_id)
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
      setCloudinaryId("")
    } catch (error) {
      alert(error.response.data.msg);
    }
  };
  const handleProduct = () => {
    const form = new FormData();
    form.append("atelierName", atelierName);
    form.append("responsibleName", responsibleName);
    form.append("textDesciptif", textDesciptif);
    form.append("pofilePicture", pofilePicture);
    form.append("cloudinaryId", cloudinaryId);
    form.append("email", email);
    form.append("ville", ville);
    form.append("address", address);
    form.append("contactNumber", contactNumber);

    if (!edit) {
      dispatch(createCart(form));
    } else {
      dispatch(editCart(card._id, form));
    }
  };

  const styleUpload = {
    display: pofilePicture ? "block" : "none",
  };

  return (
    <div>
      <div className="create_cart">
        <div className="upload">
          <input type="file" name="file" id="file_up" onChange={handleUpload} />
          <div id="file_img" style={styleUpload}>
            <img src={pofilePicture} alt="" />
            <span onClick={handleDestroy}>X</span>
          </div>
        </div>
        <form>
          <div className="row">
            <label htmlFor="Atelier Name">Atelier Name</label>
            <input
              name="atelierName"
              required
              value={atelierName}
              onChange={(e) => setAtelierName(e.target.value)}
            />
          </div>

          <div className="row">
            <label htmlFor="Responsible Name">Responsible Name</label>
            <input
              name="responsibleName"
              required
              value={responsibleName}
              onChange={(e) => setResponsibleName(e.target.value)}
            />
          </div>

          <div className="row">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="row">
            <label htmlFor="contactNumber">Contact Number</label>
            <input
              name="contactNumber"
              required
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />
          </div>

          <div className="row">
            <label htmlFor="ville">City</label>
            <input
              name="ville"
              required
              value={ville}
              onChange={(e) => setVille(e.target.value)}
            />
          </div>

          <div className="row">
            <label htmlFor="address">Address</label>
            <input
              name="address"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="row">
            <label htmlFor="textDesciptif">Description</label>
            <textarea
              type="text"
              name="textDesciptif"
              id="textDesciptif"
              required
              value={textDesciptif}
              rows="5"
              onChange={(e) => setTextDesciptif(e.target.value)}
            />
          </div>
        </form>
      </div>
      <button
        className="create_cart_button"
        type="submit"
        onClick={handleProduct}
      >
        {edit ? "Edit" : "Create"}
      </button>
    </div>
  );
}

export default CreateCart;
