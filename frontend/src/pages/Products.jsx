import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import logo from '../assets/logo.png'
import './Products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const cart = useCart();

  const fetchProducts = async () => {
    const res = await fetch('https://fakestoreapi.com/products');
    const data = await res.json();
    setProducts(data);
    setFiltered(data);
  };

  const fetchCategories = async () => {
    const res = await fetch('https://fakestoreapi.com/products/categories');
    const data = await res.json();
    setCategories(data);
  };

  const filterByCategory = async (category) => {
    if (category === 'all') return setFiltered(products);

    const res = await fetch(`https://fakestoreapi.com/products/category/${category}`);
    const data = await res.json();
    setFiltered(data);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    const query = e.target.value.toLowerCase();
    const filteredItems = products.filter((product) =>
      product.title.toLowerCase().includes(query)
    );
    setFiltered(filteredItems);
  };

  return (
    <div className="products-wrapper">
      <header className="header">
        <div className="logo-area" onClick={ () =>navigate('/products')}>
          <img src={logo} alt="Logo" className="logo-img" />
        </div>
        <nav className="nav-links">
          <span onClick={() => navigate('/cart')}>CART</span>
          <span onClick={handleLogout}>LOGOUT</span>
        </nav>
      </header>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={handleSearch}
        />
        <select onChange={(e) => filterByCategory(e.target.value)}>
          <option value="all">All</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="product-grid">
        {filtered.map((product) => (
          <div className="product-card" key={product.id} onClick={() => navigate(`/products/${product.id}`)} style={{ cursor: 'pointer' }}>
            <img src={product.image} alt={product.title} />
            <h4>{product.title}</h4>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
