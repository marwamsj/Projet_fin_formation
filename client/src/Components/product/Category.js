import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Spinner } from "react-bootstrap";
import "./index.css";
import {
  deleteCategory,
  getAllCategory,
  createCategory,
  editCategory,
  editTrue,
  getCategoryById,
} from "../../JS/Actions/category";

function Category() {
  const dispatch = useDispatch();
  const [nameCategory, setNameCategory] = useState("");

  const categories = useSelector((state) => state.category.categories);
  const loading = useSelector((state) => state.category.loading);
  const edit = useSelector((state) => state.category.edit);
  const getOne = useSelector((state) => state.category.getOne);

  useEffect(() => {
    if (edit) {
      setNameCategory(getOne.nameCategory);
    } else {
      setNameCategory("");
    }
    dispatch(getAllCategory());
  }, [edit, getOne]);

  const handleCategory = () => {
    const form = new FormData();
    form.append("nameCategory", nameCategory);
    if (!edit) {
      dispatch(createCategory(form));
    } else {
      dispatch(editCategory(getOne._id, form));
    }
  };

  return (
    <>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <div className="categories">
          <form>
            <label htmlFor="category">Category</label>
            <input
              type="text"
              name="category"
              value={nameCategory}
              required
              onChange={(e) => setNameCategory(e.target.value)}
            />

            <button type="submit" onClick={handleCategory}>
              {edit ? "Edit" : "Create"}
            </button>
          </form>

          <div className="col">
            {categories.map((el) => (
              <div className="row" key={el._id}>
                <p>{el.nameCategory}</p>
                <div>
                  <button
                    onClick={() => {
                      dispatch(getCategoryById(el._id));
                      dispatch(editTrue());
                    }}
                  >
                    Edit
                  </button>

                  <button onClick={() => dispatch(deleteCategory(el._id))}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Category;
