import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createCommentCart } from "../../JS/Actions/atelierCart";

function CreateCommentCD({ prodId }) {
  const [textOfComment, setTextOfComment] = useState("");
  const dispatch = useDispatch();
  const handleComment = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("textOfComment", textOfComment);
    dispatch(createCommentCart(prodId, form));
    setTextOfComment("");
  };

  return (
    <div className="createcommentcard">
      <form>
        <div className="createcommentcard_text">
          <textarea
            placeholder="create comment"
            name="text"
            onChange={(e) => setTextOfComment(e.target.value)}
            value={textOfComment}
            type="text"
          />
        </div>
        <button
          type="submit"
          className="createcommentcard_button"
          onClick={handleComment}
        >
          Add comment
        </button>
      </form>
    </div>
  );
}

export default CreateCommentCD;
