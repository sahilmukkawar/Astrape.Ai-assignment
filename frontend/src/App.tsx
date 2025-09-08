import { BrowserRouter, Link, Route, Routes, Navigate } from 'react-router-dom'
import type { JSX } from 'react'
import './App.css'
import { AuthProvider, useAuth } from './context/AuthContext'
import { CartProvider, useCart } from './context/CartContext'
import { NotifyProvider } from './context/NotifyContext'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import CartPage from './pages/CartPage'
import AddressPage from './pages/AddressPage'
import PaymentPage from './pages/PaymentPage'
import OrdersPage from './pages/OrdersPage'

const CartBadge = () => {
  const { cart } = useCart()
  const count = (cart?.items || []).reduce((n, i) => n + i.quantity, 0)
  return (
    <span style={{
      background: 'white',
      color: '#1e3a8a',
      borderRadius: '999px',
      padding: '2px 8px',
      fontSize: 12,
      marginLeft: 6
    }}>{count}</span>
  )
}

const Nav = () => {
  const { user, logout } = useAuth()
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" style={{ fontWeight: 700, fontSize:30 }}>E-commerce</Link>
        <Link to="/">🏠 Home</Link>
        <Link to="/cart">🛒 Cart <CartBadge /></Link>
        <Link to="/orders">📦 My Orders</Link>
        <div className="spacer" />
        {user ? (
          <>
            <span>Hi, {user.name}</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">🔐 Login</Link>
            <Link to="/signup">🧾 Signup</Link>
          </>
        )}
      </div>
    </header>
  )
}

// no notify usage here

const AppRoutes = () => {
  const { user } = useAuth()
  const requireAuth = (element: JSX.Element) => {
    if (!user) {
      return <Navigate to="/login" replace />
    }
    return element
  }
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/cart" element={requireAuth(<CartPage />)} />
      <Route path="/checkout/address" element={requireAuth(<AddressPage />)} />
      <Route path="/checkout/payment" element={requireAuth(<PaymentPage />)} />
      <Route path="/orders" element={requireAuth(<OrdersPage />)} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

function App() {
  return (
    <NotifyProvider>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Nav />
            <div className="container">
              <AppRoutes />
            </div>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </NotifyProvider>
  )
}

export default App
