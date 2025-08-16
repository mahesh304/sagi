import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import MobileAdminNav from '../components/MobileAdminNav';

export default function Admin() {
	const user = useSelector((s) => s.auth.user);
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = useState('menu');
	const [menuItems, setMenuItems] = useState([]);
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(false);
	const [newItem, setNewItem] = useState({
		name: '',
		description: '',
		category: 'burgers',
		price: '',
		imageUrl: '',
		isVeg: false,
		isAvailable: true
	});
	const [showManualOrder, setShowManualOrder] = useState(false);
	const [manualOrder, setManualOrder] = useState({
		customerName: '',
		customerPhone: '',
		customerEmail: '',
		items: [{ itemId: '', qty: 1 }],
		notes: ''
	});
	const [editingItem, setEditingItem] = useState(null);
	const [showEditForm, setShowEditForm] = useState(false);

	// Check if user is admin
	useEffect(() => {
		if (!user || user.role !== 'admin') {
			navigate('/login');
		}
	}, [user, navigate]);

	// Load menu items
	useEffect(() => {
		if (activeTab === 'menu') {
			loadMenuItems();
		} else if (activeTab === 'orders') {
			loadOrders();
		}
	}, [activeTab]);

	const loadMenuItems = async () => {
		setLoading(true);
		try {
			const { data } = await api.get('/api/menu');
			setMenuItems(data);
		} catch (error) {
			console.error('Failed to load menu items:', error);
		} finally {
			setLoading(false);
		}
	};

	const loadOrders = async () => {
		setLoading(true);
		try {
			const { data } = await api.get('/api/orders');
			setOrders(data);
		} catch (error) {
			console.error('Failed to load orders:', error);
		} finally {
			setLoading(false);
		}
	};

	const handleStatusUpdate = async (orderId, newStatus) => {
		try {
			await api.put(`/api/orders/${orderId}/status`, { status: newStatus });
			loadOrders(); // Reload orders to show updated status
			alert('Order status updated successfully!');
		} catch (error) {
			alert('Failed to update order status. Please try again.');
			console.error('Status update failed:', error);
		}
	};

	const handleAddItem = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			await api.post('/api/menu', newItem);
			setNewItem({
				name: '',
				description: '',
				category: 'burgers',
				price: '',
				imageUrl: '',
				isVeg: false,
				isAvailable: true
			});
			loadMenuItems();
		} catch (error) {
			console.error('Failed to add item:', error);
		} finally {
			setLoading(false);
		}
	};

	const handleDeleteItem = async (itemId) => {
		if (window.confirm('Are you sure you want to delete this item?')) {
			try {
				await api.delete(`/api/menu/${itemId}`);
				loadMenuItems();
			} catch (error) {
				console.error('Failed to delete item:', error);
			}
		}
	};

	const handleEditItem = (item) => {
		setEditingItem({ ...item });
		setShowEditForm(true);
	};

	const handleUpdateItem = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			await api.put(`/api/menu/${editingItem._id}`, editingItem);
			setShowEditForm(false);
			setEditingItem(null);
			loadMenuItems();
			alert('Item updated successfully!');
		} catch (error) {
			console.error('Failed to update item:', error);
			alert('Failed to update item. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	const cancelEdit = () => {
		setShowEditForm(false);
		setEditingItem(null);
	};

	const handleManualOrder = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const payload = {
				items: manualOrder.items.filter(item => item.itemId && item.qty > 0),
				customerName: manualOrder.customerName,
				customerPhone: manualOrder.customerPhone,
				customerEmail: manualOrder.customerEmail,
				notes: manualOrder.notes
			};
			
			await api.post('/api/orders', payload);
			alert('Manual order created successfully!');
			setShowManualOrder(false);
			setManualOrder({
				customerName: '',
				customerPhone: '',
				customerEmail: '',
				items: [{ itemId: '', qty: 1 }],
				notes: ''
			});
			loadOrders();
		} catch (error) {
			alert('Failed to create manual order. Please try again.');
			console.error('Manual order creation failed:', error);
		} finally {
			setLoading(false);
		}
	};

	const addManualOrderItem = () => {
		setManualOrder(prev => ({
			...prev,
			items: [...prev.items, { itemId: '', qty: 1 }]
		}));
	};

	const removeManualOrderItem = (index) => {
		setManualOrder(prev => ({
			...prev,
			items: prev.items.filter((_, i) => i !== index)
		}));
	};

	const updateManualOrderItem = (index, field, value) => {
		setManualOrder(prev => ({
			...prev,
			items: prev.items.map((item, i) => 
				i === index ? { ...item, [field]: value } : item
			)
		}));
	};

	const categories = [
		{ id: 'all', label: 'All Items', icon: '🍽️' },
		{ id: 'burgers', label: 'Burgers', icon: '🍔' },
		{ id: 'chicken-fries', label: 'Chicken Fries', icon: '🍗' },
		{ id: 'snacks', label: 'Snacks', icon: '🍟' },
		{ id: 'combos', label: 'Combos', icon: '🍽️' },
		{ id: 'buckets', label: 'Buckets', icon: '🪣' },
		{ id: 'sides', label: 'Sides', icon: '🥗' },
		{ id: 'sauces', label: 'Sauces', icon: '🧂' },
		{ id: 'drinks', label: 'Drinks', icon: '🥤' },
		{ id: 'desserts', label: 'Desserts', icon: '🍦' },
	];

	return (
		<div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
			{/* Header */}
			<div className="bg-white border-b border-gray-200 sticky top-16 z-30">
				<div className="max-w-6xl mx-auto px-4 py-4">
					<h1 className="text-2xl font-bold text-gray-900 mb-4">Admin Panel</h1>
					
					{/* Desktop Tabs */}
					<div className="hidden md:flex gap-4">
						<button
							onClick={() => setActiveTab('menu')}
							className={`px-4 py-2 rounded-lg font-medium transition-colors ${
								activeTab === 'menu' ? 'bg-brand-red text-white' : 'text-gray-600 hover:bg-gray-100'
							}`}
						>
							Menu Management
						</button>
						<button
							onClick={() => setActiveTab('orders')}
							className={`px-4 py-2 rounded-lg font-medium transition-colors ${
								activeTab === 'orders' ? 'bg-brand-red text-white' : 'text-gray-600 hover:bg-gray-100'
							}`}
						>
							Order Management
						</button>
					</div>

					{/* Mobile Tabs */}
					<div className="md:hidden flex gap-2 overflow-x-auto">
						<button
							onClick={() => setActiveTab('menu')}
							className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
								activeTab === 'menu' ? 'bg-brand-red text-white' : 'text-gray-600 hover:bg-gray-100'
							}`}
						>
							🍽️ Menu
						</button>
						<button
							onClick={() => setActiveTab('orders')}
							className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
								activeTab === 'orders' ? 'bg-brand-red text-white' : 'text-gray-600 hover:bg-gray-100'
							}`}
						>
							📋 Orders
						</button>
					</div>
				</div>
			</div>

			<div className="max-w-6xl mx-auto px-4 py-6">
				{/* Menu Management */}
				{activeTab === 'menu' && (
					<div className="space-y-6">
						{/* Add New Item Form */}
						<div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
							<h2 className="text-xl font-bold text-gray-900 mb-4">Add New Item</h2>
							<form onSubmit={handleAddItem} className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
									<input
										type="text"
										value={newItem.name}
										onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
										required
										className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
									<select
										value={newItem.category}
										onChange={(e) => setNewItem(prev => ({ ...prev, category: e.target.value }))}
										className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent"
									>
										{categories.map(cat => (
											<option key={cat.id} value={cat.id}>{cat.icon} {cat.label}</option>
										))}
									</select>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
									<input
										type="number"
										step="0.01"
										value={newItem.price}
										onChange={(e) => setNewItem(prev => ({ ...prev, price: e.target.value }))}
										required
										className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
									<input
										type="url"
										value={newItem.imageUrl}
										onChange={(e) => setNewItem(prev => ({ ...prev, imageUrl: e.target.value }))}
										required
										className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent"
									/>
								</div>
								<div className="md:col-span-2">
									<label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
									<textarea
										value={newItem.description}
										onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
										required
										rows="3"
										className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent"
									/>
								</div>
								<div className="md:col-span-2 flex gap-4">
									<label className="flex items-center">
										<input
											type="checkbox"
											checked={newItem.isVeg}
											onChange={(e) => setNewItem(prev => ({ ...prev, isVeg: e.target.checked }))}
											className="w-4 h-4 text-brand-red border-gray-300 rounded focus:ring-brand-red"
										/>
										<span className="ml-2 text-sm text-gray-700">Vegetarian</span>
									</label>
									<label className="flex items-center">
										<input
											type="checkbox"
											checked={newItem.isAvailable}
											onChange={(e) => setNewItem(prev => ({ ...prev, isAvailable: e.target.checked }))}
											className="w-4 h-4 text-brand-red border-gray-300 rounded focus:ring-brand-red"
										/>
										<span className="ml-2 text-sm text-gray-700">Available</span>
									</label>
								</div>
								<div className="md:col-span-2">
									<button
										type="submit"
										disabled={loading}
										className="w-full py-3 bg-brand-red text-white font-semibold rounded-xl hover:bg-red-700 disabled:opacity-50 transition-colors"
									>
										{loading ? 'Adding...' : 'Add Item'}
									</button>
								</div>
							</form>
						</div>

						{/* Menu Items List */}
						<div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
							<h2 className="text-xl font-bold text-gray-900 mb-4">Current Menu Items</h2>
							{loading ? (
								<div className="text-center py-8">Loading...</div>
							) : (
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
									{menuItems.map((item) => (
										<div key={item._id} className="border border-gray-200 rounded-lg p-4 relative">
											{item.isVeg && (
												<div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
													🌱 Veg
												</div>
											)}
											<img 
												src={item.imageUrl} 
												alt={item.name} 
												className="w-full h-32 object-cover rounded-lg mb-3"
											/>
											<h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
											<p className="text-sm text-gray-600 mb-2">{item.description}</p>
											<div className="flex items-center justify-between">
												<span className="font-bold text-brand-red">₹{item.price}</span>
												<div className="flex gap-2">
													<button
														onClick={() => handleEditItem(item)}
														className="text-blue-600 hover:text-blue-800 text-sm px-2 py-1 rounded border border-blue-200 hover:bg-blue-50"
													>
														Edit
													</button>
													<button
														onClick={() => handleDeleteItem(item._id)}
														className="text-red-600 hover:text-red-800 text-sm px-2 py-1 rounded border border-red-200 hover:bg-red-50"
													>
														Delete
													</button>
												</div>
											</div>
										</div>
									))}
								</div>
							)}
						</div>

						{/* Edit Item Modal */}
						{showEditForm && editingItem && (
							<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
								<div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
									<div className="p-6">
										<h2 className="text-xl font-bold text-gray-900 mb-4">Edit Menu Item</h2>
										<form onSubmit={handleUpdateItem} className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<div>
												<label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
												<input
													type="text"
													value={editingItem.name}
													onChange={(e) => setEditingItem(prev => ({ ...prev, name: e.target.value }))}
													required
													className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent"
												/>
											</div>
											<div>
												<label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
												<select
													value={editingItem.category}
													onChange={(e) => setEditingItem(prev => ({ ...prev, category: e.target.value }))}
													className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent"
												>
													{categories.map(cat => (
														<option key={cat.id} value={cat.id}>{cat.icon} {cat.label}</option>
													))}
												</select>
											</div>
											<div>
												<label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
												<input
													type="number"
													step="0.01"
													value={editingItem.price}
													onChange={(e) => setEditingItem(prev => ({ ...prev, price: e.target.value }))}
													required
													className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent"
												/>
											</div>
											<div>
												<label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
												<input
													type="url"
													value={editingItem.imageUrl}
													onChange={(e) => setEditingItem(prev => ({ ...prev, imageUrl: e.target.value }))}
													required
													className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent"
												/>
											</div>
											<div className="md:col-span-2">
												<label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
												<textarea
													value={editingItem.description}
													onChange={(e) => setEditingItem(prev => ({ ...prev, description: e.target.value }))}
													required
													rows="3"
													className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent"
												/>
											</div>
											<div className="md:col-span-2 flex gap-4">
												<label className="flex items-center">
													<input
														type="checkbox"
														checked={editingItem.isVeg}
														onChange={(e) => setEditingItem(prev => ({ ...prev, isVeg: e.target.checked }))}
														className="w-4 h-4 text-brand-red border-gray-300 rounded focus:ring-brand-red"
													/>
													<span className="ml-2 text-sm text-gray-700">Vegetarian</span>
												</label>
												<label className="flex items-center">
													<input
														type="checkbox"
														checked={editingItem.isAvailable}
														onChange={(e) => setEditingItem(prev => ({ ...prev, isAvailable: e.target.checked }))}
														className="w-4 h-4 text-brand-red border-gray-300 rounded focus:ring-brand-red"
													/>
													<span className="ml-2 text-sm text-gray-700">Available</span>
												</label>
											</div>
											<div className="md:col-span-2 flex gap-3 pt-4">
												<button
													type="button"
													onClick={cancelEdit}
													className="flex-1 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
												>
													Cancel
												</button>
												<button
													type="submit"
													disabled={loading}
													className="flex-1 py-3 bg-brand-red text-white font-semibold rounded-xl hover:bg-red-700 disabled:opacity-50 transition-colors"
												>
													{loading ? 'Updating...' : 'Update Item'}
												</button>
											</div>
										</form>
									</div>
								</div>
							</div>
						)}
					</div>
				)}

				{/* Order Management */}
				{activeTab === 'orders' && (
					<div className="space-y-6">
						{/* Manual Order Creation */}
						<div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
							<div className="flex items-center justify-between mb-4">
								<h2 className="text-xl font-bold text-gray-900">Manual Order Creation</h2>
								<button
									onClick={() => setShowManualOrder(!showManualOrder)}
									className="px-4 py-2 bg-brand-red text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
								>
									{showManualOrder ? 'Cancel' : 'Create Manual Order'}
								</button>
							</div>
							
							{showManualOrder && (
								<form onSubmit={handleManualOrder} className="space-y-4 border-t border-gray-200 pt-4">
									<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">Customer Name *</label>
											<input
												type="text"
												value={manualOrder.customerName}
												onChange={(e) => setManualOrder(prev => ({ ...prev, customerName: e.target.value }))}
												required
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
											<input
												type="tel"
												value={manualOrder.customerPhone}
												onChange={(e) => setManualOrder(prev => ({ ...prev, customerPhone: e.target.value }))}
												required
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
											<input
												type="email"
												value={manualOrder.customerEmail}
												onChange={(e) => setManualOrder(prev => ({ ...prev, customerEmail: e.target.value }))}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent"
											/>
										</div>
									</div>
									
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
										<textarea
											value={manualOrder.notes}
											onChange={(e) => setManualOrder(prev => ({ ...prev, notes: e.target.value }))}
											rows="2"
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent"
											placeholder="Special instructions or notes"
										/>
									</div>
									
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">Order Items</label>
										<div className="space-y-3">
											{manualOrder.items.map((item, index) => (
												<div key={index} className="flex gap-3 items-center">
													<select
														value={item.itemId}
														onChange={(e) => updateManualOrderItem(index, 'itemId', e.target.value)}
														required
														className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent"
													>
														<option value="">Select Item</option>
														{menuItems.map(menuItem => (
															<option key={menuItem._id} value={menuItem._id}>
																{menuItem.name} - ₹{menuItem.price}
															</option>
														))}
													</select>
													<input
														type="number"
														min="1"
														value={item.qty}
														onChange={(e) => updateManualOrderItem(index, 'qty', Number(e.target.value))}
														required
														className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent text-center"
													/>
													{manualOrder.items.length > 1 && (
														<button
															type="button"
															onClick={() => removeManualOrderItem(index)}
															className="px-3 py-2 text-red-600 hover:text-red-800 border border-red-200 rounded-lg hover:bg-red-50"
														>
															Remove
														</button>
													)}
												</div>
											))}
											<button
												type="button"
												onClick={addManualOrderItem}
												className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
											>
												+ Add Item
											</button>
										</div>
									</div>
									
									<button
										type="submit"
										disabled={loading}
										className="w-full py-3 bg-brand-red text-white font-semibold rounded-xl hover:bg-red-700 disabled:opacity-50 transition-colors"
									>
										{loading ? 'Creating Order...' : 'Create Manual Order'}
									</button>
								</form>
							)}
						</div>

						{/* Recent Orders */}
						<div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
							<h2 className="text-xl font-bold text-gray-900 mb-4">Recent Orders</h2>
							{loading ? (
								<div className="text-center py-8">Loading...</div>
							) : orders.length === 0 ? (
								<div className="text-center py-8 text-gray-500">No orders found</div>
							) : (
								<div className="space-y-4">
									{orders.map((order) => (
										<div key={order._id} className="border border-gray-200 rounded-lg p-4">
											<div className="flex items-center justify-between mb-3">
												<div>
													<h3 className="font-semibold text-gray-900">Order #{order._id.slice(-6)}</h3>
													<div className="text-sm text-gray-600 space-y-1">
														<p><strong>Customer:</strong> {order.customerName || order.user?.name || 'N/A'}</p>
														<p><strong>Phone:</strong> {order.customerPhone || order.user?.phone || 'N/A'}</p>
														{order.customerEmail && <p><strong>Email:</strong> {order.customerEmail}</p>}
														{order.user?.email && <p><strong>Email:</strong> {order.user.email}</p>}
													</div>
												</div>
												<div className="text-right">
													<span className="text-lg font-bold text-brand-red">
														₹{order.total.toFixed(2)}
													</span>
													<div className="text-xs text-gray-500 mt-1">
														{new Date(order.createdAt).toLocaleString()}
													</div>
												</div>
											</div>
											<div className="text-sm text-gray-600">
												<strong>Items:</strong> {order.items.map(item => `${item.name || 'Unknown Item'} (${item.qty})`).join(', ')}
											</div>
											{order.notes && (
												<div className="text-sm text-gray-600 mt-2">
													<strong>Notes:</strong> {order.notes}
												</div>
											)}
											<div className="flex items-center justify-end mt-4">
												<select
													value={order.status}
													onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
													className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent"
												>
													<option value="pending">Pending</option>
													<option value="preparing">Preparing</option>
													<option value="ready">Ready</option>
													<option value="delivered">Delivered</option>
													<option value="cancelled">Cancelled</option>
												</select>
											</div>
										</div>
									))}
								</div>
							)}
						</div>
					</div>
				)}
			</div>

			{/* Mobile Admin Navigation */}
			<MobileAdminNav />
		</div>
	);
}


