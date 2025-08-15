import { useDispatch } from 'react-redux';
import { addItem } from '../features/cart/cartSlice';

export default function ItemCard({ item }) {
	const dispatch = useDispatch();
	return (
		<div className="rounded-xl border bg-white shadow-sm overflow-hidden hover:shadow-md transition">
			<button className="block" onClick={() => {}} aria-label={`Preview ${item.name}`}>
				<img src={item.imageUrl} alt={item.name} className="w-full h-40 object-cover" loading="lazy" />
			</button>
			<div className="p-3 flex items-start gap-2">
				<div className="flex-1">
					<h4 className="font-semibold">{item.name}</h4>
					<p className="text-xs text-gray-600">{item.category}</p>
				</div>
				<div className="text-right">
					<div className="font-bold text-[color:var(--color-brand-red)]">${item.price.toFixed(2)}</div>
					<button onClick={() => dispatch(addItem({ item, qty: 1 }))} className="mt-1 px-3 py-1 rounded bg-[color:var(--color-brand-red)] text-white text-sm">Add</button>
				</div>
			</div>
		</div>
	);
}