import { useEffect, useState } from 'react';
import api from '../api/axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ImageUploader from '../components/ImageUploader';

export default function Admin() {
	const user = useSelector((s) => s.auth.user);
	const navigate = useNavigate();
	const [form, setForm] = useState({ name: '', description: '', category: 'burgers', price: '', imageUrl: '' });
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		if (!user || user.role !== 'admin') navigate('/');
	}, [user, navigate]);


	async function createItem(e) {
		e.preventDefault();
		const payload = { ...form, price: Number(form.price) };
		await api.post('/api/menu', payload);
		alert('Item created');
		setForm({ name: '', description: '', category: 'burgers', price: '', imageUrl: '' });
	}

	async function loadOrders() {
		const { data } = await api.get('/api/orders');
		setOrders(data);
	}

	useEffect(() => { loadOrders(); }, []);

	async function updateStatus(id, status) {
		await api.put(`/api/orders/${id}/status`, { status });
		await loadOrders();
	}

	return (
		<div className="max-w-5xl mx-auto px-4 py-6 space-y-8">
			<h2 className="text-2xl font-bold">Admin Panel</h2>
			<section className="border rounded p-4">
				<h3 className="font-semibold mb-2">Create Menu Item</h3>
				<form onSubmit={createItem} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
					<input required placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="border rounded px-2 py-1" />
					<select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="border rounded px-2 py-1">
						<option>burgers</option>
						<option>combos</option>
						<option>buckets</option>
						<option>drinks</option>
						<option>sides</option>
						<option>desserts</option>
						<option>sauces</option>
						<option>snacks</option>
					</select>
					<input type="number" step="0.01" required placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="border rounded px-2 py-1" />
					<input placeholder="Image URL (optional)" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} className="border rounded px-2 py-1 col-span-full" />
					<div className="col-span-full">
						<ImageUploader value={form.imageUrl} onUploaded={(url) => setForm((f) => ({ ...f, imageUrl: url }))} />
					</div>
					<button className="col-span-full px-4 py-2 rounded bg-[color:var(--color-brand-red)] text-white">Create</button>
				</form>
			</section>

			<section className="border rounded p-4">
				<h3 className="font-semibold mb-2">Orders</h3>
				<div className="space-y-3">
					{orders.map((o) => (
						<div key={o._id} className="border rounded p-3">
							<div className="font-semibold">Order {o._id.slice(-6)} • {o.user?.name || 'Guest'}</div>
							<div className="text-sm text-gray-600">{new Date(o.createdAt).toLocaleString()}</div>
							<div className="mt-2 flex items-center gap-2">
								<select value={o.status} onChange={(e) => updateStatus(o._id, e.target.value)} className="border rounded px-2 py-1">
									<option>pending</option>
									<option>processing</option>
									<option>completed</option>
								</select>
								<div className="ml-auto font-bold">${o.total.toFixed(2)}</div>
							</div>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}