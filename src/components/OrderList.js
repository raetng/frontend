import React, { useState, useEffect } from 'react';
import { fetchOrders, updateOrderStatus } from '../api';

const STATUS_OPTIONS = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadOrders = () => {
    setLoading(true);
    fetchOrders()
      .then(setOrders)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadOrders(); }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const updated = await updateOrderStatus(orderId, newStatus);
      setOrders((prev) => prev.map((o) => (o.id === updated.id ? updated : o)));
    } catch (err) {
      const msg = err.response?.data?.error || err.message;
      alert(`Failed to update status: ${msg}`);
    }
  };

  if (loading) return <p className="loading">Loading orders...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div>
      <div className="page-header">
        <h2>Orders</h2>
        <button className="btn btn-secondary" onClick={loadOrders}>Refresh</button>
      </div>

      {orders.length === 0 ? (
        <p>No orders yet. Go to Products to place an order.</p>
      ) : (
        <table className="order-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Product ID</th>
              <th>Qty</th>
              <th>Total</th>
              <th>Status</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.product_id}</td>
                <td>{o.quantity}</td>
                <td>${Number(o.total).toFixed(2)}</td>
                <td>
                  <select
                    value={o.status}
                    onChange={(e) => handleStatusChange(o.id, e.target.value)}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </td>
                <td>{new Date(o.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OrderList;
