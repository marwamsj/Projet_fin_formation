import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "../../helpers/axios";
import { createNeed, editNeed } from "../../JS/Actions/patientNeeds";
import { getAllCategory } from "../../JS/Actions/category";
import "./Forum.css";

function CreateNeeds() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const categories = useSelector((state) => state.category.categories);
  const edit = useSelector((state) => state.patientNeeds.edit);
  const patneed = useSelector((state) => state.patientNeeds.need);

  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [besoinPictures, setBesoinPictures] = useState("");
  const [cloudinaryId, setCloudinaryId] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      let formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(`/atelier/upload`, formData);
      // setImage(res.data);
      setBesoinPictures(res.data.url);
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
      setBesoinPictures("");
      setCloudinaryId("");
    } catch (error) {
      alert(error.response.data.msg);
    }
  };
  useEffect(() => {
    if (edit) {
      setBesoinPictures(patneed.besoinPictures);
      setCloudinaryId(patneed.cloudinaryId);
      setDescription(patneed.description);
      setCategory(patneed.category);
    } else {
      setBesoinPictures("");
      setCloudinaryId("");
      setDescription("");
      setCategory("");
    }

    dispatch(getAllCategory());
  }, [edit, patneed]);

  const handleNeed = () => {
    const form = new FormData();

    form.append("description", description);
    form.append("category", category);
    form.append("besoinPictures", besoinPictures);
    form.append("cloudinaryId", cloudinaryId);

    if (!edit) {
      dispatch(createNeed(form));
    } else {
      dispatch(editNeed(patneed._id, form));
    }
  };

  return (
    <>
      {auth.authenticateatl ? (
        ""
      ) : (
        <div className="createneed">
          <div className="createneed-descrep">
            <div className="createneed-descrep-img">
              <img 
               src={
                auth.user.pofilePicture
                  ? auth.user.pofilePicture
                  : "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
              }
              alt="user-pic"></img>
            </div>
            <div className="creatneeds_text">
              <input
                name="Put your needs"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <div className={besoinPictures ? "creatneeds_text-img" : ""}>
                {besoinPictures ? (
                  <img src={besoinPictures} alt="besoin Pictures" />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="createneed-button">
            <div className="createneed-button-category">
              <select
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Category</option>
                {categories.map((el) => (
                  <option value={el._id} key={el._id}>
                    {el.nameCategory}
                  </option>
                ))}
              </select>
            </div>
            <div className="createneed-button-img">
              <input type="file" name="file" onChange={handleUpload} />
              <span onClick={handleDestroy}>X</span>
            </div>
            <div className="createneed-button-create">
              <button type="submit" onClick={handleNeed}>
                {edit ? "Edit" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CreateNeeds;
