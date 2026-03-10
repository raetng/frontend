import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import OrderList from './components/OrderList';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/orders" element={<OrderList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
// Phase 6 integration demo
// Phase 6 integration demo
// Phase 6 integration demo - Mon Mar  9 18:40:17 CDT 2026
// Phase 6 integration demo - Mon Mar  9 18:47:51 CDT 2026
// Phase 6 integration demo - Mon Mar  9 20:21:59 CDT 2026
// Phase 6 integration demo - Mon Mar  9 21:47:50 CDT 2026
echo // Phase 6 integration demo - Tue Mar 10 18:37:51 CDT 2026
echo // Phase 6 integration demo - Tue Mar 10 18:49:37 CDT 2026
