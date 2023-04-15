import React, { useState } from 'react';
import '../component/ShoppingCart.css';

const ShoppingCart = (props) => {
  const [cartItems, setCartItems] = useState(props.cartItems);

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
    props.setCartItems(cartItems.filter(item => item.id !== itemId));
  }

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cartItems.map(item => (
        <div key={item.id} className="cart-item">
          <img className="card-img-top" src={item.image} style={{width:"250px"}} alt={item.name} />
          <div className="item-details">
            <h5>{item.title.split(' ').slice(0,5).join(' ')}</h5>
            <p>${item.price.toFixed(2)}</p>
            <p>Quantity: {item.quantity}</p>
          </div>
          <button className="remove-button" onClick={() => removeFromCart(item.id)}>Remove from Cart</button>
        </div>
      ))}
      <p className="total-price">Total Price: ${getTotalPrice().toFixed(2)}</p>
    </div>
  );
}

export default ShoppingCart;
