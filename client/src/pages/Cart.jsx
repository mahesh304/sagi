import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { clearCart, removeItem, selectCartTotal, setQty } from '../features/cart/cartSlice';

export default function Cart() {
	const items = useSelector((s) => s.cart.items);
	const total = useSelector(selectCartTotal);
	const user = useSelector((s) => s.auth.user);
	const token = useSelector((s) => s.auth.token);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [showOrderForm, setShowOrderForm] = useState(false);
	const [orderForm, setOrderForm] = useState({
		customerName: user?.name || '',
		customerPhone: user?.phone || '',
		customerEmail: user?.email || '',
		notes: ''
	});
	const [submitting, setSubmitting] = useState(false);

	const handleProceed = () => {
		if (!token) {
			navigate('/login');
			return;
		}
		setShowOrderForm(true);
	};

	const handleOrderSubmit = async (e) => {
		e.preventDefault();
		setSubmitting(true);
		
		try {
			const payload = { 
				items: items.map((i) => ({ itemId: i.item._id, qty: i.qty })),
				customerName: orderForm.customerName,
				customerPhone: orderForm.customerPhone,
				customerEmail: orderForm.customerEmail,
				notes: orderForm.notes
			};
			
			const { data } = await api.post('/api/orders', payload);
			alert(`Order ${data._id} created successfully!`);
			dispatch(clearCart());
			setShowOrderForm(false);
			navigate('/');
		} catch (error) {
			alert('Failed to create order. Please try again.');
			console.error('Order creation failed:', error);
		} finally {
			setSubmitting(false);
		}
	};

	const handleInputChange = (e) => {
		setOrderForm(prev => ({
			...prev,
			[e.target.name]: e.target.value
		}));
	};

	return (
		<div className="max-w-3xl mx-auto px-4 py-6">
			<h2 className="text-2xl font-bold mb-4">Cart</h2>
			{items.length === 0 ? (
				<div className="text-center py-12">
					<div className="text-6xl mb-4">🛒</div>
					<h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
					<p className="text-gray-600 mb-4">Add some delicious items to get started!</p>
					<p className="text-sm text-gray-500 mb-4">🍽️ Dine-in & Takeaway Orders Only</p>
					<button 
						onClick={() => navigate('/menu')}
						className="px-6 py-3 bg-brand-red text-white font-semibold rounded-xl hover:bg-red-700 transition-colors"
					>
						Browse Menu
					</button>
				</div>
			) : (
				<div className="space-y-6">
					{/* Cart Items */}
					<div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
						<h3 className="text-lg font-semibold text-gray-900 mb-4">Cart Items</h3>
						<div className="space-y-4">
							{items.map(({ item, qty }) => (
								<div key={item._id} className="flex items-center gap-3 border-b border-gray-100 pb-4 last:border-b-0">
									<img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-lg" loading="lazy" />
									<div className="flex-1">
										<div className="font-semibold text-gray-900">{item.name}</div>
										<div className="text-sm text-gray-600">₹{item.price.toFixed(2)}</div>
									</div>
									<div className="flex items-center gap-2">
										<input 
											type="number" 
											min="1" 
											value={qty} 
											onChange={(e) => dispatch(setQty({ id: item._id, qty: Number(e.target.value) }))} 
											className="w-16 border rounded-lg px-2 py-1 text-center" 
										/>
										<button 
											onClick={() => dispatch(removeItem(item._id))} 
											className="px-3 py-1 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
										>
											Remove
										</button>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Order Summary */}
					<div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
						<h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
						<div className="space-y-3">
							<div className="flex justify-between text-gray-600">
								<span>Subtotal:</span>
								<span>₹{total.toFixed(2)}</span>
							</div>
							<div className="border-t border-gray-200 pt-3">
								<div className="flex justify-between text-lg font-bold text-gray-900">
									<span>Total:</span>
									<span>₹{total.toFixed(2)}</span>
								</div>
							</div>
						</div>
						
						{/* Proceed Button */}
						<button 
							onClick={handleProceed}
							className="w-full mt-6 py-3 bg-brand-red text-white font-semibold rounded-xl hover:bg-red-700 transition-colors"
						>
							Proceed to Order
						</button>
					</div>

					{/* Order Form Modal */}
					{showOrderForm && (
						<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
							<div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
								<div className="p-6">
									<h3 className="text-xl font-bold text-gray-900 mb-4">Complete Your Order</h3>
									<p className="text-sm text-gray-500 mb-4 text-center">
										🍽️ This order is for dine-in or takeaway at our branches in Boduppal & Malkajgiri
									</p>
									<form onSubmit={handleOrderSubmit} className="space-y-4">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
											<input
												type="text"
												name="customerName"
												value={orderForm.customerName}
												onChange={handleInputChange}
												required
												className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-red focus:border-transparent"
											/>
										</div>
										
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
											<input
												type="tel"
												name="customerPhone"
												value={orderForm.customerPhone}
												onChange={handleInputChange}
												required
												className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-red focus:border-transparent"
											/>
										</div>
										
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
											<input
												type="email"
												name="customerEmail"
												value={orderForm.customerEmail}
												onChange={handleInputChange}
												className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-red focus:border-transparent"
											/>
										</div>
										
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">Special Instructions</label>
											<textarea
												name="notes"
												value={orderForm.notes}
												onChange={handleInputChange}
												rows="2"
												className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-red focus:border-transparent"
												placeholder="Any special requests or notes"
											/>
										</div>
										
										<div className="flex gap-3 pt-4">
											<button
												type="button"
												onClick={() => setShowOrderForm(false)}
												className="flex-1 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
											>
												Cancel
											</button>
											<button
												type="submit"
												disabled={submitting}
												className="flex-1 py-3 bg-brand-red text-white font-semibold rounded-xl hover:bg-red-700 disabled:opacity-50 transition-colors"
											>
												{submitting ? 'Placing Order...' : 'Place Order'}
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
}






