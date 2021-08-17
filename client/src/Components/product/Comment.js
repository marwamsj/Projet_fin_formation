import React from "react";
import TimeAgo from 'react-timeago'
import frenchStrings from 'react-timeago/lib/language-strings/fr'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import { useDispatch, useSelector } from "react-redux";
import {
  deleteComment,
  likeProductComment,
  unlikeProductComment,
} from "../../JS/Actions/product";

function Comment({ comment }) {
  const auth = useSelector((state) => state.auth);
  const prod = useSelector((state) => state.product.product);

  const dispatch = useDispatch();
  const formatter = buildFormatter(frenchStrings)
  return (
    <div className="comment_box">
      <div className="comment_user">
        <img 
           src={comment.pofilePicture
           ? comment.pofilePicture
           : "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
       }
        alt="" />
      </div>
      <div className="comment_body">
        <div className="comment_date">
          <p>{comment.username}</p>
          <TimeAgo date={comment.date} formatter={formatter} />
        </div>

        <div className="comment_textOfComment">
          <p>{comment.textOfComment}</p>

          <div
            onClick={() => {
              if (comment.likes.find((like) => like.user === auth.user._id)) {
                dispatch(unlikeProductComment(prod._id, comment._id));
              } else {
                dispatch(likeProductComment(prod._id, comment._id));
              }
            }}
          >
            <i
              className={
                comment.likes.find((like) => like.user === auth.user._id)
                  ? "fas fa-heart"
                  : "far fa-heart"
              }
            ></i>

            <span>{comment.likes.length}</span>
          </div>
        </div>
      </div>
      <div className="comment_delete">
        <p onClick={() => dispatch(deleteComment(prod._id, comment._id))}>X</p>
      </div>
    </div>
  );
}

export default Comment;
