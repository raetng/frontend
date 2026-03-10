import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../api';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="loading">Loading products...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div>
      <h2>Products</h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="product-grid">
          {products.map((p) => (
            <div key={p.id} className="card">
              <h3>{p.name}</h3>
              <p className="price">${Number(p.price).toFixed(2)}</p>
              <p className="description">{p.description}</p>
              <Link to={`/products/${p.id}`} className="btn">View Details</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
