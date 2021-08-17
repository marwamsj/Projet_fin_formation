import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductByCategory, getProducts } from "../../JS/Actions/product";
import Loading from "../../utils/loading/Loading";
import ProductCard from "./ProductCard";
import "./index.css";
import { getAllCategory } from "../../JS/Actions/category";

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const loading = useSelector((state) => state.product.loading);
  const categories = useSelector((state) => state.category.categories);
  const [textOfSearch, setTextOfSearch] = useState("");
  const [category, setCategory] = useState("");
 

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getAllCategory());
  }, []);

  const handleCategory = (e) => {
    setCategory(e.target.value);
    dispatch(getProductByCategory(e.target.value));

    setTextOfSearch("");
  };

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );
  return (
    <div className="products">
      <div className="row_products">
        <input
          type="text"
          value={textOfSearch}
          placeholder="Enter your search!"
          onChange={(e) => setTextOfSearch(e.target.value)}
        />

        <div className="filter_menu">
          <select name="category" value={category} onChange={handleCategory}>
            <option value="">All Products</option>
            {categories.map((category, index) => (
              <option value={category._id} key={index}>
                {category.nameCategory}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="product_map">
        {products.filter((el)=>{
          if (textOfSearch===""){
            return el
          }else if(el.name.toLowerCase().includes(textOfSearch.toLowerCase())){
            return el
          }
        }).map((el) => {
          return <ProductCard key={el._id} prod={el} />
        })}
      </div>
    </div>
  );
};

export default Products;
