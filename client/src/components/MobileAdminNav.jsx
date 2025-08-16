import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function MobileAdminNav() {
	const location = useLocation();
	const [showMore, setShowMore] = useState(false);

	const navItems = [
		{ path: '/', label: 'Home', icon: '🏠' },
		{ path: '/menu', label: 'Menu', icon: '🍽️' },
		{ path: '/admin', label: 'Admin', icon: '⚙️' },
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
								<span className="text-xl">{item.icon}</span>
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
						<h3 className="text-lg font-bold text-gray-900 mb-4">Admin Options</h3>
						
						{/* Quick Links */}
						<div className="space-y-3 mb-6">
							<a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
								<span className="text-xl">📊</span>
								<span className="text-gray-700">Analytics</span>
							</a>
							<a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
								<span className="text-xl">👥</span>
								<span className="text-gray-700">Manage Users</span>
							</a>
							<a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
								<span className="text-xl">📈</span>
								<span className="text-gray-700">Reports</span>
							</a>
						</div>

						{/* Settings */}
						<div className="mb-6">
							<h4 className="font-semibold text-gray-900 mb-3">Settings</h4>
							<div className="space-y-3">
								<a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
									<span className="text-xl">🔧</span>
									<span className="text-gray-700">Restaurant Settings</span>
								</a>
								<a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
									<span className="text-xl">💰</span>
									<span className="text-gray-700">Pricing</span>
								</a>
								<a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
									<span className="text-xl">📱</span>
									<span className="text-gray-700">App Settings</span>
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
