import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

export default function MobileBottomNav() {
	const cartCount = useSelector((s) => s.cart.items.reduce((n, i) => n + i.qty, 0));
	const [showMore, setShowMore] = useState(false);
	const location = useLocation();

	// Hide bottom navigation on login and register pages
	if (location.pathname === '/login' || location.pathname === '/register') {
		return null;
	}

	const navItems = [
		{ path: '/', label: 'Home', icon: '🏠' },
		{ path: '/menu', label: 'Menu', icon: '🍽️' },
		{ path: '/cart', label: 'Cart', icon: '🛒' },
	];

	return (
		<>
			{/* Main Floating Navigation */}
			<div className="md:hidden fixed bottom-4 left-4 right-4 z-50">
				<div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-2">
					<div className="flex items-center justify-around">
						{navItems.map((item) => (
							<Link
								key={item.path}
								to={item.path}
								className={`flex flex-col items-center p-3 rounded-xl transition-all ${
									location.pathname === item.path
										? 'bg-brand-red text-white'
										: 'text-gray-600 hover:bg-gray-100'
								}`}
							>
								<div className="relative">
									<span className="text-xl">{item.icon}</span>
									{item.path === '/cart' && cartCount > 0 && (
										<span className="absolute -top-2 -right-2 bg-white text-brand-red text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold border border-brand-red">
											{cartCount}
										</span>
									)}
								</div>
								<span className="text-xs mt-1 font-medium">{item.label}</span>
							</Link>
						))}
						
						{/* More Button */}
						<button
							onClick={() => setShowMore(!showMore)}
							className={`flex flex-col items-center p-3 rounded-xl transition-all ${
								showMore ? 'bg-brand-red text-white' : 'text-gray-600 hover:bg-gray-100'
							}`}
						>
							<span className="text-xl">⋯</span>
							<span className="text-xs mt-1 font-medium">More</span>
						</button>
					</div>
				</div>
			</div>

			{/* More Details Popup */}
			{showMore && (
				<div className="md:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setShowMore(false)}>
					<div className="absolute bottom-20 left-4 right-4 bg-white rounded-2xl shadow-lg border border-gray-200 p-6" onClick={(e) => e.stopPropagation()}>
						<h3 className="text-lg font-bold text-gray-900 mb-4">More Options</h3>
						
						{/* Quick Links */}
						<div className="space-y-3 mb-6">
							<a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
								<span className="text-xl">❓</span>
								<span className="text-gray-700">Get Help</span>
							</a>
							<a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
								<span className="text-xl">📞</span>
								<span className="text-gray-700">Contact Us</span>
							</a>
							<a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
								<span className="text-xl">ℹ️</span>
								<span className="text-gray-700">About SFC</span>
							</a>
						</div>

						{/* Social Media */}
						<div className="mb-6">
							<h4 className="font-semibold text-gray-900 mb-3">Follow Us</h4>
							<div className="flex gap-4">
								<a 
									href="https://www.facebook.com/" 
									target="_blank" 
									rel="noopener noreferrer"
									className="flex items-center gap-2 p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
								>
									<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
										<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
									</svg>
									<span className="text-sm">Facebook</span>
								</a>
								<a 
									href="https://www.instagram.com/sagi_fried_chicken/" 
									target="_blank" 
									rel="noopener noreferrer"
									className="flex items-center gap-2 p-2 rounded-lg bg-pink-50 text-pink-600 hover:bg-pink-100 transition-colors"
								>
									<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
										<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
									</svg>
									<span className="text-sm">Instagram</span>
								</a>
								<a 
									href="https://www.youtube.com/" 
									target="_blank" 
									rel="noopener noreferrer"
									className="flex items-center gap-2 p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
								>
									<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
										<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
									</svg>
									<span className="text-sm">YouTube</span>
								</a>
							</div>
						</div>

						{/* Branch Locations */}
						<div className="mb-6">
							<h4 className="font-semibold text-gray-900 mb-3">Our Locations</h4>
							<div className="space-y-3">
								<a 
									href="https://www.google.com/maps/place/SAGI+FRIED+CHICKEN/@17.4620422,78.5368465,17z/data=!3m1!4b1!4m6!3m5!1s0x3bcb9b5833b61df5:0xf05074ec96f928aa!8m2!3d17.4620422!4d78.5368465!16s%2Fg%2F11flt228wd?entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3D" 
									target="_blank" 
									rel="noopener noreferrer"
									className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
								>
									<span className="text-lg">📍</span>
									<div>
										<span className="text-sm font-medium text-gray-700">Malkajgiri Branch</span>
										<p className="text-xs text-gray-500">Click to view on Google Maps</p>
									</div>
								</a>
								<a 
									href="https://www.google.com/maps/place/Sagi+Fried+Chicken/@17.4235862,78.5807919,17z/data=!3m1!4b1!4m6!3m5!1s0x3bcb9fa417ad08eb:0x94fc881c85cc8544!8m2!3d17.4235862!4d78.5833668!16s%2Fg%2F11vh_c2cng?entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3D" 
									target="_blank" 
									rel="noopener noreferrer"
									className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
								>
									<span className="text-lg">📍</span>
									<div>
										<span className="text-sm font-medium text-gray-700">Boduppal Branch</span>
										<p className="text-xs text-gray-500">Click to view on Google Maps</p>
									</div>
								</a>
							</div>
						</div>

						{/* Delivery Partners */}
						<div className="mb-6">
							<h4 className="font-semibold text-gray-900 mb-3">Order via</h4>
							<div className="grid grid-cols-2 gap-3">
								<a 
									href="https://www.swiggy.com/city/hyderabad/sfc-sagi-fried-chicken-indhira-nagar-uppal-rest792488" 
									target="_blank" 
									rel="noopener noreferrer"
									className="flex items-center gap-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
								>
									<span className="text-lg">🟡</span>
									<span className="text-sm font-medium">Swiggy</span>
								</a>
								<a 
									href="https://www.zomato.com/hyderabad/sfc-sagi-fried-chicken-boduppal" 
									target="_blank" 
									rel="noopener noreferrer"
									className="flex items-center gap-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
								>
									<span className="text-lg">🟠</span>
									<span className="text-sm font-medium">Zomato</span>
								</a>
							</div>
						</div>

						{/* Close Button */}
						<button
							onClick={() => setShowMore(false)}
							className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
						>
							Close
						</button>
					</div>
				</div>
			)}
		</>
	);
}
