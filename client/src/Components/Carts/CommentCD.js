import React from "react";
import { useDispatch, useSelector } from "react-redux";

import TimeAgo from "react-timeago";
import frenchStrings from "react-timeago/lib/language-strings/fr";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import {
  deleteCommentCart,
  likeCartComment,
  unlikeCartComment,
} from "../../JS/Actions/atelierCart";

function CommentCD({ comment }) {
  const auth = useSelector((state) => state.auth);
  const card = useSelector((state) => state.atelierCart.cardRed);

  const dispatch = useDispatch();

  const formatter = buildFormatter(frenchStrings);
  return (
    <div className="commentcard_box">
      <div className="commentcard_user">
        <img
          src={
            comment.pofilePicture
              ? comment.pofilePicture
              : "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
          }
          alt=""
        />
      </div>
      <div className="commentcard_body">
        <div className="commentcard_date">
          <p>{comment.username}</p>
          <span>
            <TimeAgo date={comment.date} formatter={formatter} />
          </span>
        </div>

        <div className="commentcard_textOfComment">
          <p>{comment.textOfComment}</p>

          <div
            onClick={() => {
              if (comment.likes.find((like) => like.user === auth.user._id)) {
                dispatch(unlikeCartComment(card._id, comment._id));
              } else {
                dispatch(likeCartComment(card._id, comment._id));
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
      <div className="commentcard_delete">
        <p onClick={() => dispatch(deleteCommentCart(card._id, comment._id))}>
          X
        </p>
      </div>
    </div>
  );
}

export default CommentCD;
