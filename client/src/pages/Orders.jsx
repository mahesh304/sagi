import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function Orders() {
	const user = useSelector((s) => s.auth.user);
	const navigate = useNavigate();
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(false);

	// Check if user is logged in
	useEffect(() => {
		if (!user) {
			navigate('/login');
		} else {
			loadUserOrders();
		}
	}, [user, navigate]);

	const loadUserOrders = async () => {
		setLoading(true);
		try {
			const { data } = await api.get(`${import.meta.env.VITE_API_BASE_URL}/api/orders/my-orders`);
			setOrders(data);
		} catch (error) {
			console.error('Failed to load orders:', error);
		} finally {
			setLoading(false);
		}
	};

	const getStatusColor = (status) => {
		switch (status) {
			case 'pending': return 'bg-yellow-100 text-yellow-800';
			case 'preparing': return 'bg-blue-100 text-blue-800';
			case 'ready': return 'bg-green-100 text-green-800';
			case 'delivered': return 'bg-gray-100 text-gray-800';
			case 'cancelled': return 'bg-red-100 text-red-800';
			default: return 'bg-gray-100 text-gray-800';
		}
	};

	const getStatusText = (status) => {
		switch (status) {
			case 'pending': return '⏳ Pending';
			case 'preparing': return '👨‍🍳 Preparing';
			case 'ready': return '✅ Ready';
			case 'delivered': return '🎉 Delivered';
			case 'cancelled': return '❌ Cancelled';
			default: return status;
		}
	};

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<div className="bg-white border-b border-gray-200 sticky top-16 z-30">
				<div className="max-w-6xl mx-auto px-4 py-4">
					<h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
					<p className="text-gray-600 mt-1">View your order history and track current orders</p>
				</div>
			</div>

			<div className="max-w-6xl mx-auto px-4 py-6">
				{loading ? (
					<div className="text-center py-12">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-red mx-auto"></div>
						<p className="text-gray-600 mt-4">Loading your orders...</p>
					</div>
				) : orders.length === 0 ? (
					<div className="text-center py-12">
						<div className="text-6xl mb-4">📋</div>
						<h3 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h3>
						<p className="text-gray-600 mb-4">Start ordering delicious food from our menu!</p>
						<button 
							onClick={() => navigate('/menu')}
							className="px-6 py-3 bg-brand-red text-white font-semibold rounded-xl hover:bg-red-700 transition-colors"
						>
							Browse Menu
						</button>
					</div>
				) : (
					<div className="space-y-4">
						{orders.map((order) => (
							<div key={order._id} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
								<div className="flex items-center justify-between mb-4">
									<div>
										<h3 className="font-semibold text-gray-900">Order #{order._id.slice(-6)}</h3>
										<p className="text-sm text-gray-600">
											{new Date(order.createdAt).toLocaleDateString('en-IN', {
												year: 'numeric',
												month: 'long',
												day: 'numeric',
												hour: '2-digit',
												minute: '2-digit'
											})}
										</p>
									</div>
									<div className="text-right">
										<span className="text-lg font-bold text-brand-red">
											₹{order.total.toFixed(2)}
										</span>
										<div className="mt-2">
											<span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
												{getStatusText(order.status)}
											</span>
										</div>
									</div>
								</div>
								
								<div className="border-t border-gray-100 pt-4">
									<h4 className="font-medium text-gray-900 mb-2">Order Items:</h4>
									<div className="space-y-2">
										{order.items.map((item, index) => (
											<div key={index} className="flex items-center justify-between text-sm">
												<span className="text-gray-700">{item.name} × {item.qty}</span>
												<span className="text-gray-600">₹{(item.priceAtPurchase * item.qty).toFixed(2)}</span>
											</div>
										))}
									</div>
								</div>

								{order.notes && (
									<div className="border-t border-gray-100 pt-4 mt-4">
										<h4 className="font-medium text-gray-900 mb-2">Special Instructions:</h4>
										<p className="text-sm text-gray-600">{order.notes}</p>
									</div>
								)}

								<div className="border-t border-gray-100 pt-4 mt-4">
									<div className="flex items-center justify-between text-sm text-gray-600">
										<span>Order Type:</span>
										<span className="font-medium">Dine-in / Takeaway</span>
									</div>
									<div className="flex items-center justify-between text-sm text-gray-600 mt-1">
										<span>Branch:</span>
										<span className="font-medium">Boduppal / Malkajgiri</span>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
