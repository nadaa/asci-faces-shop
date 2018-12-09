import React from "react";
import "./product.css";
const dateFormat = d => {
  const weekMs = 7 * 24 * 60 * 60 * 1000;
  const currDate = Date.now();
  const productDate = Date.parse(d);
  const diff = currDate - productDate;
  if (diff < weekMs) {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return `${days} days ago`;
  } else {
    return d;
  }
};
const Product = ({ prod }) => {
  return (
    <div className="product-div">
      <div className="face-div">{prod.face}</div>
      <div className="price-div">
        <b>Price: </b>${prod.price}
      </div>
      <div className="size-div">
        <b>Size: </b>
        {prod.size}px
      </div>
      <div className="date-div">
        <b>Date: </b>
        {dateFormat(prod.date)}
      </div>
    </div>
  );
};

export default Product;
