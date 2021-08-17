import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategory } from "../../JS/Actions/category";
import { createProduct, editProduct } from "../../JS/Actions/product";
import axios from "../../helpers/axios";
import { Link } from "react-router-dom";
import "./index.css";

function AddProduct() {
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.category.categories);
  const edit = useSelector((state) => state.product.edit);
  const product = useSelector((state) => state.product.product);
  const [productPictures, setProductPictures] = useState("");
  const [cloudinaryId, setCloudinaryId] = useState("")
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (edit) {
      setProductPictures(product.productPictures);
      setCloudinaryId(product.cloudinaryId)
      setName(product.name);
      setDescription(product.description);
      setCategory(product.category);
    } else {
      setProductPictures("");
      setCloudinaryId("");
      setName("");
      setDescription("");
      setCategory("");
    }

    dispatch(getAllCategory());
  }, [edit, product]);

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      let formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(`/atelier/upload`, formData);
     // setImage(res.data);
      setProductPictures(res.data.url);
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
      setProductPictures("");
      setCloudinaryId("")
    } catch (error) {
       alert(error.response.data.msg);
    }
  };
  const handleProduct = () => {
    const form = new FormData();
    form.append("name", name);
    form.append("description", description);
    form.append("productPictures", productPictures);
    form.append("cloudinaryId", cloudinaryId);
    form.append("category", category);
    if (!edit) {
      dispatch(createProduct(form));
    } else {
      dispatch(editProduct(product._id, form));
    }
  };

  const styleUpload = {
    display: productPictures ? "block" : "none",
  };
 
  
  return (
    <div className="create_product">
      <div className="upload">
        <input type="file" name="file" id="file_up" onChange={handleUpload} />
        <div id="file_img" style={styleUpload}>
          <img src={productPictures} alt="product-Pict" />
          <span onClick={handleDestroy}>X</span>
        </div>
      </div>
      <form>
        <div id="button_products">
          <Link to={`/product`}>
        <button id="button_products_link">Products</button>
        </Link>
        </div>
        <div className="row">

          <label htmlFor="Product Name">Product Name</label>
          <input
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="row">
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            required
            value={description}
            rows="5"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="row">
          <label htmlFor="categories">Categories: </label>
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Please select a category</option>
            {categories.map((el) => (
              <option value={el._id} key={el._id}>
                {el.nameCategory}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" onClick={handleProduct}>
          {edit ? "Edit" : "Create"}
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
