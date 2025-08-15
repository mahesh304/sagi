import { useSelector, useDispatch } from 'react-redux';
import { setQty, removeItem, clearCart, selectCartTotal } from '../features/cart/cartSlice';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
	const items = useSelector((s) => s.cart.items);
	const total = useSelector(selectCartTotal);
	const token = useSelector((s) => s.auth.token);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	async function proceed() {
		if (!token) {
			navigate('/login');
			return;
		}
		const payload = { items: items.map((i) => ({ itemId: i.item._id, qty: i.qty })) };
		const { data } = await api.post('/api/orders', payload);
		alert(`Order ${data._id} created!`);
		dispatch(clearCart());
	}

	return (
		<div className="max-w-3xl mx-auto px-4 py-6">
			<h2 className="text-2xl font-bold mb-4">Cart</h2>
			{items.length === 0 ? (
				<p>Your cart is empty.</p>
			) : (
				<div className="space-y-4">
					{items.map(({ item, qty }) => (
						<div key={item._id} className="flex items-center gap-3 border p-3 rounded">
							<img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded" loading="lazy" />
							<div className="flex-1">
								<div className="font-semibold">{item.name}</div>
								<div className="text-sm text-gray-600">${item.price.toFixed(2)}</div>
							</div>
							<div className="flex items-center gap-2">
								<input type="number" min="1" value={qty} onChange={(e) => dispatch(setQty({ id: item._id, qty: Number(e.target.value) }))} className="w-16 border rounded px-2 py-1" />
								<button onClick={() => dispatch(removeItem(item._id))} className="px-2 py-1 rounded border">Remove</button>
							</div>
						</div>
					))}
					<div className="flex items-center justify-between pt-2 border-t">
						<div className="text-lg font-bold">Total: ${total.toFixed(2)}</div>
						<button onClick={proceed} className="px-4 py-2 rounded bg-[color:var(--color-brand-red)] text-white">Proceed</button>
					</div>
				</div>
			)}
		</div>
	);
}