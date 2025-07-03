import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';
import logo from '../assets/logo.png';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart} = useCart();
  const [showPopup, setShowPopup] = useState(false);
  const navigate =useNavigate();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    setShowPopup(true);
    clearCart();
    setTimeout(() => setShowPopup(false), 4000);
  };

  const logout =() => {
    localStorage.removeItem('token');
    navigate('/login') 
  }

  return (
    <>
    <div className='heading'>
        <span className='side'>
        <span className='logo-shop' onClick={ () =>navigate('/products')}><img src={logo} alt="" /></span>
        <h3>ShopFront</h3>
        </span>
        <nav>
            <span onClick= {() => navigate('/products')}>HOME</span>
            <span onClick= {logout}>LOGOUT</span>
        </nav>
    </div>
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in the cart.</p>
      ) : (
        cartItems.map((item) => (
          <div className="cart-item" key={item.id}>
            <img src={item.image} onClick= {()=> navigate(`/products/${item.id}`)} alt={item.title} />
            <div>
              <h4>{item.title}</h4>
              <p>${item.price}</p>
              <input
                type="number"
                value={item.quantity}
                min="1"
                onChange={(e) => updateQuantity(item.id, +e.target.value)}
              />
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          </div>
        ))
      )}
      {cartItems.length > 0 && (
        <>
          <h3>Total: ${total.toFixed(2)}</h3>
          <button className="checkout" onClick={handleCheckout}>Checkout</button>
        </>
      )}
      {showPopup && <div className="popupp">Order placed successfully!</div>}
    </div>
    </>
  );
}

export default Cart;
