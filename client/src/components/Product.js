import React, { Component } from "react";

const formatDate = date => {
  return date;
};
const Product = props => {
  return (
    <div className="product-div">
      <div>{props.p.face}</div>
      <div>{props.p.price}</div>
      <div>{props.p.size}</div>
      <div>{props.p.date}</div>
    </div>
  );
};

export default Product;
