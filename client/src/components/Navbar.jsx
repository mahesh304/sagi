import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

export default function Navbar() {
	const cartCount = useSelector((s) => s.cart.items.reduce((n, i) => n + i.qty, 0));
	const user = useSelector((s) => s.auth.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	return (
		<nav className="w-full bg-white/90 backdrop-blur border-b border-gray-100 sticky top-0 z-40">
			<div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
				<Link to="/" className="text-xl font-extrabold text-[color:var(--color-brand-red)]">SFC</Link>
				<div className="flex-1" />
				<div className="hidden sm:flex items-center gap-4">
					<NavLink to="/menu" className={({ isActive }) => `px-3 py-1 rounded ${isActive ? 'bg-gray-100' : ''}`}>Menu</NavLink>
					{user?.role === 'admin' && (
						<NavLink to="/admin" className={({ isActive }) => `px-3 py-1 rounded ${isActive ? 'bg-gray-100' : ''}`}>Admin</NavLink>
					)}
				</div>
				<Link to="/cart" aria-label={`Cart with ${cartCount} items`} className="relative px-3 py-1 rounded border">
					<span>Cart</span>
					{cartCount > 0 && (
						<span className="absolute -top-2 -right-2 text-xs bg-[color:var(--color-brand-red)] text-white rounded-full px-1">{cartCount}</span>
					)}
				</Link>
				{user ? (
					<button onClick={() => { dispatch(logout()); navigate('/'); }} className="ml-2 px-3 py-1 rounded border">Logout</button>
				) : (
					<div className="flex gap-2">
						<Link to="/login" className="px-3 py-1 rounded border">Login</Link>
						<Link to="/register" className="px-3 py-1 rounded bg-[color:var(--color-brand-red)] text-white">Register</Link>
					</div>
				)}
			</div>
		</nav>
	);
}