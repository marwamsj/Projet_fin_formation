import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import { Link } from "react-router-dom";
import {
  deleteProduct,
  getProductById,
  likeProduct,
  unlikeProduct,
} from "../../JS/Actions/product";

function ProductCard({ prod }) {
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  return (
    <div className="product_card">
      <div className="product_card_img">
        <span onClick={() => dispatch(deleteProduct(prod._id))}>X</span>
        <img src={prod.productPictures} alt={prod.name} />
      </div>
      <div className="product_box">
        <h4 title={prod.name}>{prod.name}</h4>

        <div
          onClick={() => {
            if (prod.likes.find((like) => like.user === auth.user._id)) {
              dispatch(unlikeProduct(prod._id));
            } else {
              dispatch(likeProduct(prod._id));
            }
          }}
        >
          <i
            className={
              prod.likes.find((like) => like.user === auth.user._id)
                ? "fas fa-heart"
                : "far fa-heart"
            }
          ></i>
          <p>({prod.likes.length})</p>
        </div>
      </div>
      <Link className="linkReadMore" to={`/product/${prod._id}`}>
        <button
          onClick={() => {
            dispatch(getProductById(prod._id));
          }}
        >
          Read More
        </button>
      </Link>
    </div>
  );
}

export default ProductCard;
