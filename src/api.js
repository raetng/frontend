import axios from 'axios';

// In production (nginx), requests to /products and /orders are proxied to backend services.
// In local dev (react-scripts), we need to hit the backend directly.
const api = axios.create({
  baseURL: '',
});

export async function fetchProducts() {
  const res = await api.get('/products');
  return res.data;
}

export async function fetchProduct(id) {
  const res = await api.get(`/products/${id}`);
  return res.data;
}

export async function createProduct(product) {
  const res = await api.post('/products', product);
  return res.data;
}

export async function fetchOrders() {
  const res = await api.get('/orders');
  return res.data;
}

export async function createOrder(order) {
  const res = await api.post('/orders', order);
  return res.data;
}

export async function updateOrderStatus(id, status) {
  const res = await api.patch(`/orders/${id}`, { status });
  return res.data;
}
