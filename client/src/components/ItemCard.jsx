import { useDispatch } from 'react-redux';
import { addItem } from '../features/cart/cartSlice';

export default function ItemCard({ item }) {
	const dispatch = useDispatch();
	
	return (
		<div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-200 group">
			{/* Image Section */}
			<div className="relative overflow-hidden">
				<img 
					src={item.imageUrl} 
					alt={item.name} 
					className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
					loading="lazy" 
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
			</div>
			
			{/* Content Section */}
			<div className="p-4">
				<div className="flex items-start justify-between gap-3 mb-3">
					<div className="flex-1 min-w-0">
						<h3 className="font-bold text-lg text-gray-900 truncate">{item.name}</h3>
						<p className="text-sm text-gray-500 capitalize">{item.category}</p>
						{item.description && (
							<p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.description}</p>
						)}
					</div>
					<div className="text-right flex-shrink-0">
						<div className="text-xl font-bold text-brand-red">₹{item.price.toFixed(2)}</div>
					</div>
				</div>
				
				{/* Add to Cart Button */}
				<button 
					onClick={() => dispatch(addItem({ item, qty: 1 }))} 
					className="w-full py-3 px-4 bg-brand-red text-white font-semibold rounded-xl hover:bg-red-700 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
				>
					<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
					</svg>
					Add to Cart
				</button>
			</div>
		</div>
	);
}

