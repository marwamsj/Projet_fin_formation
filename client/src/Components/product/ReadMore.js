import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createProductReview, toggleTrue } from "../../JS/Actions/product";
import Rate from "../../utils/Rating/Rate";
import CreateComment from "./CreateComment";
import ReactStars from "react-rating-stars-component";
import "./index.css";
import Comment from "./Comment";
import Loading from "../../utils/loading/Loading";
import { Link } from "react-router-dom";

function ReadMore(props) {
  const dispatch = useDispatch();
  const prod = useSelector((state) => state.product.product);
  const loadingp = useSelector((state) => state.product.loadingproduct);
  const user = useSelector(state => state.auth.user)

  const [rating, setRating] = useState(0);
  if (Object.keys(prod).length === 0) {
    return null;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const { productId } = props.match.params;
    const pay = {
      params: {
        productId,
      },
    };
    const form = new FormData();
    form.append("rating", rating);
    dispatch(createProductReview(pay, form));
  };

  const ratingChanged = (newRating) => {
    setRating(newRating);
  };
  if (loadingp)
    return (
      <div>
        <Loading />
      </div>
    );
  return (
    <div className="readmore">
      <div className="readmore_bloc">
        <div className="readmore_image">
          <img src={prod.productPictures} alt="" />
        </div>
        <div className="readmore_info">
          <h3>{prod.name}</h3>
          <Rate value={prod.rating} text={`${prod.numReviews} reviews`} />

          <h4>Description</h4>
          <p>{prod.description}</p>
          <h4>Add Rating</h4>
          <form onSubmit={handleSubmit}>
            <ReactStars
              count={5}
              value={rating}
              onChange={ratingChanged}
              size={24}
              isHalf={true}
              emptyIcon={<i className="far fa-star"></i>}
              halfIcon={<i className="fa fa-star-half-alt"></i>}
              fullIcon={<i className="fa fa-star"></i>}
              activeColor="#ffd700"
            />
            <button className="readmore_rate_button">Rate</button>
          </form>
        </div>
      </div>
      {((user.role==="admin")||(user._id===prod.createdBy))?( <Link to={`/product/edit/${prod._id}`}>
        <button
          className="readmore_edit_button"
          onClick={() => dispatch(toggleTrue())}
        >
          Edit
        </button>
      </Link>):""}
     
      <div className="readmore_comment">
        <h4>All Comments</h4>
        <CreateComment prodId={prod._id} />
        {prod.comments.map((el) => {
          return <Comment comment={el} key={el._id} />;
        })}
      </div>
    </div>
  );
}

export default ReadMore;
