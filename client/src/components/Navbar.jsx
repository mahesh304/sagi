import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { logoutAndClearCart } from '../features/auth/authSlice';

export default function Navbar() {
	const cartCount = useSelector((s) => s.cart.items.reduce((n, i) => n + i.qty, 0));
	const user = useSelector((s) => s.auth.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isProfileOpen, setIsProfileOpen] = useState(false);
	const profileRef = useRef(null);

	// Check if we're on auth pages
	const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

	// Close profile popup when clicking outside
	useEffect(() => {
		function handleClickOutside(event) {
			if (profileRef.current && !profileRef.current.contains(event.target)) {
				setIsProfileOpen(false);
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<nav className="w-full bg-white/95 backdrop-blur border-b border-gray-100 sticky top-0 z-50">
			<div className="max-w-6xl mx-auto px-4 py-3">
				{/* Desktop Navigation */}
				<div className="hidden md:flex items-center gap-4">
					<Link to="/" className="text-3xl font-extrabold text-brand-red hover:text-red-700 transition-colors">
						🍗 SFC
					</Link>
					<div className="flex-1" />
					<div className="flex items-center gap-4">
						<NavLink to="/menu" className={({ isActive }) => `px-4 py-2 rounded-lg transition-colors ${isActive ? 'bg-brand-red text-white' : 'hover:bg-gray-100'}`}>Menu</NavLink>
						{user?.role === 'admin' && (
							<NavLink to="/admin" className={({ isActive }) => `px-4 py-2 rounded-lg transition-colors ${isActive ? 'bg-brand-red text-white' : 'hover:bg-gray-100'}`}>Admin</NavLink>
						)}
					</div>
					{!isAuthPage && (
						<Link to="/cart" aria-label={`Cart with ${cartCount} items`} className="relative px-4 py-2 rounded-lg border hover:bg-gray-50 transition-colors">
							<span>Cart</span>
							{cartCount > 0 && (
								<span className="absolute -top-2 -right-2 text-xs bg-brand-red text-white rounded-full w-5 h-5 flex items-center justify-center font-bold">{cartCount}</span>
							)}
						</Link>
					)}
					{user ? (
						<div className="flex items-center gap-3">
							<span className="text-sm text-gray-600">Welcome, {user.name || user.email}</span>
							<button onClick={() => { dispatch(logoutAndClearCart()); navigate('/'); }} className="px-4 py-2 rounded-lg border hover:bg-gray-50 transition-colors">Logout</button>
						</div>
					) : (
						<div className="flex gap-2">
							<Link to="/login" className="px-4 py-2 rounded-lg border hover:bg-gray-50 transition-colors">Login</Link>
							<Link to="/register" className="px-4 py-2 rounded-lg bg-brand-red text-white hover:bg-red-700 transition-colors">Register</Link>
						</div>
					)}
				</div>

				{/* Mobile Navigation */}
				<div className="md:hidden flex items-center justify-between">
					<Link to="/" className="text-2xl font-extrabold text-brand-red hover:text-red-700 transition-colors">
						🍗 SFC
					</Link>
					
					<div className="flex items-center gap-3">
						{/* Profile Button */}
						<div className="relative" ref={profileRef}>
							<button 
								onClick={() => setIsProfileOpen(!isProfileOpen)}
								className="p-2 rounded-lg border"
								aria-label="Profile menu"
							>
								<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
								</svg>
							</button>
							
							{/* Profile Popup */}
							{isProfileOpen && (
								<div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
									{user ? (
										<>
											<div className="px-4 py-2 border-b border-gray-100">
												<div className="font-semibold text-gray-900">{user.name || user.email}</div>
												<div className="text-sm text-gray-500">{user.email}</div>
											</div>
											<Link 
												to="/orders" 
												onClick={() => setIsProfileOpen(false)}
												className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
											>
												📋 My Orders
											</Link>
											{user.role === 'admin' && (
												<Link 
													to="/admin" 
													onClick={() => setIsProfileOpen(false)}
													className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
												>
													Admin Panel
												</Link>
											)}
											<button 
												onClick={() => { dispatch(logoutAndClearCart()); navigate('/'); setIsProfileOpen(false); }} 
												className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
											>
												Logout
											</button>
										</>
									) : (
										<>
											<Link 
												to="/login" 
												onClick={() => setIsProfileOpen(false)}
												className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
											>
												Login
											</Link>
											<Link 
												to="/register" 
												onClick={() => setIsProfileOpen(false)}
												className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
											>
												Register
											</Link>
										</>
									)}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
}

