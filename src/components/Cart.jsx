import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "./Navbar";
import {
  removeFromCart,
  updateTempQuantity,
  applyTempUpdate,
} from "../features/shopCart/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const { items: cartItems, totalPrice } = useSelector((state) => state.cart);

  const navigate = useNavigate();
  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };
  // const handleUpdateQuantity = (id, quantity) => {
  //   console.log(tempItems);
  //   dispatch(updateTempQuantity({ id, quantity })); // we are passing two values, so contained in curly brackets
  // };

  // const handleApplyUpdate = (id) => {
  //   // tempItems.forEach((item) => {
  //   //   dispatch(applyTempUpdate(item.id));
  //   // });
  //   dispatch(applyTempUpdate(id));
  // };
  return (
    <div className="wrapper">
      <div className="cart-page-container">
        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <h3>Your cart is empty</h3>
            <button onClick={() => navigate("/")}>Back to home</button>
          </div>
        ) : (
          <div className="cart-container">
            <h2>Your cart</h2>
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.title} />
                <div className="cart-item-details">
                  <h3>{item.title}</h3>
                  <p>price: ${item.price.toFixed(2)}</p>
                  <p>Quantity: {item.quantity}</p>
                  <div>
                    <button onClick={() => handleRemoveItem(item.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="cart-total">
              <p>Total: ${totalPrice.toFixed(2)}</p>
            </div>
            <button className="back-button" onClick={() => navigate("/")}>
              Back to shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
