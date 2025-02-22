import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.items);
  return (
    <nav>
      <h1>Shopping cart</h1>
      <div>
        <Link to="/">Home</Link>
        <Link to="/cart">Cart({cartItems.length})</Link>
      </div>
    </nav>
  );
};

export default Navbar;
