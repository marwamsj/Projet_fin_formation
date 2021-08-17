import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createComment } from "../../JS/Actions/product";

function CreateComment({ prodId }) {
  const [textOfComment, setTextOfComment] = useState("");
  const dispatch = useDispatch();
  const handleComment = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("textOfComment", textOfComment);
    dispatch(createComment(prodId, form));
    setTextOfComment("");
  };

  return (
    <div className="createcomment">
      <form>
        <div className="createcomment_text">
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
          className="createcomment_button"
          onClick={handleComment}
        >
          Add comment
        </button>
      </form>
    </div>
  );
}

export default CreateComment;
