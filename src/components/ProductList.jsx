import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";
import { fetchProducts } from "../features/shopCart/productSlice";
import { addToCart } from "../features/shopCart/cartSlice";
import {
  updateTempQuantity,
  applyTempUpdate,
} from "../features/shopCart/cartSlice";

const ProductList = () => {
  const { items: products, status } = useSelector((state) => state.products);
  const {
    items: cartItems,
    tempItems,
    totalPrice,
  } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleUpdateQuantity = (id, quantity) => {
    console.log(tempItems);
    dispatch(updateTempQuantity({ id, quantity })); // we are passing two values, so contained in curly brackets
  };

  // const handleApplyUpdate = (id) => {
  //   // tempItems.forEach((item) => {
  //   //   dispatch(applyTempUpdate(item.id));
  //   // });
  //   dispatch(applyTempUpdate(id));
  // };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status]);

  if (status === "loading") return <p>Loading Products...</p>;
  if (status === "failed")
    return <p>Failed to load Products...Please try again</p>;
  return (
    <>
      <Navbar />
      <div className="product-list">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.title} />
            <h2>
              {product.title.length > 20
                ? `${product.title.slice(0, 20)}...`
                : product.title}
            </h2>
            <p>{product.price}</p>
            <input
              type="number"
              min={1}
              value={
                tempItems.find((tempItem) => tempItem.id === product.id)
                  ?.quantity || product.quantity
              }
              onChange={(e) =>
                handleUpdateQuantity(product.id, parseInt(e.target.value))
              }
            />

            {/* <button onClick={() => handleApplyUpdate(product.id)}>
              Update
            </button> */}
            <button onClick={() => dispatch(addToCart(product))}>
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductList;
