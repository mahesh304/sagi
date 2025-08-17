import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import AnimationIntro from "./components/AnimationIntro";
import LiveAnnouncer from "./components/LiveAnnouncer";
import MobileBottomNav from "./components/MobileBottomNav";
import Navbar from "./components/Navbar";
import Admin from "./pages/Admin";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import Orders from "./pages/Orders";
import Register from "./pages/Register";

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroFinish = () => {
    setShowIntro(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {showIntro ? (
        <AnimationIntro onFinish={handleIntroFinish} />
      ) : (
        <>
          <LiveAnnouncer />
          <Navbar />
          <main className="flex-1 pb-20 md:pb-0">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/orders" element={<Orders />} />
            </Routes>
          </main>
          {/* Footer only on desktop */}
          <div className="hidden md:block">
            <Footer />
          </div>
          {/* Mobile bottom navigation */}
          <MobileBottomNav />
        </>
      )}
    </div>
  );
}
