import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Cart from './pages/Cart'
import Admin from './pages/Admin'
import Login from './pages/Login'
import Register from './pages/Register'
import Intro from './components/Intro'
import LiveAnnouncer from './components/LiveAnnouncer'

export default function App() {
  return (
    <div className="min-h-screen bg-[color:var(--color-brand-dark)]/5 text-[color:var(--color-brand-dark)]">
      <Intro />
      <LiveAnnouncer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )
}
