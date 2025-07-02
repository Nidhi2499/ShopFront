import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import {useNavigate} from 'react-router-dom';
import logo from '../assets/logo.png';
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const [showPopupp, setShowPopup] = useState(false);
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return <p>Product details not available...</p>;

  const showPopup =() => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 1000);
  }

  return (
    <>
    <div className='navbar'>
      <span className='logo' onClick={ () =>navigate('/products')}>
        <img src={logo}  alt="logo" />
        <h2>ShopFront</h2>
      </span>
      <span><nav>
        <span onClick= {() => navigate('/products')}>HOME</span>
        <span onClick={() => navigate('/cart')}>CART</span>
        <span onClick= { () => navigate('/login')  }>LOGOUT</span>
      </nav></span>
    </div>
    <div className="page-wrapper">
    <div className="detail-container">
      <img src={product.image} alt={product.title} />
      <div className="detail-info">
        <h2>{product.title}</h2>
        <p className="price">Price: ${product.price}</p>
        <p>{product.description}</p>
        <button onClick={() => {addToCart(product); showPopup();}}>Add to Cart</button>
      </div>
    </div>
    {showPopupp && <div className="popup">Product added to the cart successfully!</div>}
    </div>
    </>
  );
}

export default ProductDetail;
