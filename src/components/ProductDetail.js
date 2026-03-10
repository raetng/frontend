import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProduct, createOrder } from '../api';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ordering, setOrdering] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  useEffect(() => {
    fetchProduct(id)
      .then(setProduct)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleOrder = async () => {
    setOrdering(true);
    setError(null);
    try {
      const order = await createOrder({ product_id: product.id, quantity });
      setOrderSuccess(order);
    } catch (err) {
      const msg = err.response?.data?.error || err.message;
      setError(msg);
    } finally {
      setOrdering(false);
    }
  };

  if (loading) return <p className="loading">Loading product...</p>;
  if (error && !product) return <p className="error">Error: {error}</p>;

  return (
    <div>
      <button className="btn btn-secondary" onClick={() => navigate('/')}>
        Back to Products
      </button>

      <div className="product-detail">
        <h2>{product.name}</h2>
        <p className="price">${Number(product.price).toFixed(2)}</p>
        <p className="description">{product.description}</p>

        <div className="order-form">
          <h3>Place an Order</h3>
          <label>
            Quantity:
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            />
          </label>
          <p>Total: ${(product.price * quantity).toFixed(2)}</p>
          <button className="btn" onClick={handleOrder} disabled={ordering}>
            {ordering ? 'Placing Order...' : 'Place Order'}
          </button>
        </div>

        {error && <p className="error">{error}</p>}

        {orderSuccess && (
          <div className="success">
            Order #{orderSuccess.id} placed successfully! Total: ${Number(orderSuccess.total).toFixed(2)}
            <br />
            <button className="btn btn-secondary" onClick={() => navigate('/orders')}>
              View Orders
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
