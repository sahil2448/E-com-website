import React, { useEffect, useState } from "react";
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

  const [quantity, setQuantity] = useState(1);

  const handleUpdateQuantity = (id, quantity) => {
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
  }, [status, dispatch]);

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
            <p>Price: {product.price}</p>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <input
                type="number"
                min={1}
                style={{ width: "4rem", marginBottom: "1rem" }}
                value={
                  cartItems.find((item) => item.id === product.id)?.quantity
                }
                onChange={(e) => {
                  handleUpdateQuantity(product.id, parseInt(e.target.value)),
                    setQuantity(e.target.value);
                }}
              />
              <p>
                {cartItems.find((item) => item.id === product.id)?.quantity *
                  product.price || 1 * product.price}
              </p>
            </div>

            <button onClick={() => dispatch(addToCart({ product, quantity }))}>
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductList;
