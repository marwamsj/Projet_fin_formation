import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProductById } from "../../JS/Actions/product";

function AllComments({ comments, id }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductById(id));
  }, []);

  return <div>{comments.length}</div>;
}

export default AllComments;
