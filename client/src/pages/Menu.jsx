import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import api from '../api/axios';
import BottomOfferBox from '../components/BottomOfferBox';
import CategoryCarousel from '../components/CategoryCarousel';
import ItemCard from '../components/ItemCard';

export default function Menu() {
	const [active, setActive] = useState('burgers');
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		let ignore = false;
		async function load() {
			setLoading(true);
			try {
				if (active === 'all') {
					// Load all items without category filter
					const { data } = await api.get('/api/menu');
					if (!ignore) setItems(data);
				} else {
					// Load items by category
					const { data } = await api.get('/api/menu', { params: { category: active } });
					if (!ignore) setItems(data);
				}
			} catch (error) {
				console.error('Failed to load menu items:', error);
			} finally {
				if (!ignore) setLoading(false);
			}
		}
		load();
		return () => { ignore = true; };
	}, [active]);

	const offer = items[0]
		? { id: `offer-${items[0]._id}`, title: 'Chef\'s Pick', description: items[0].description || 'Fan favorite', price: items[0].price, item: items[0] }
		: null;

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<div className="bg-white border-b border-gray-100 sticky top-16 z-30">
				<div className="max-w-6xl mx-auto px-4 py-4">
					<h1 className="text-2xl font-bold text-gray-900 mb-4">Our Menu</h1>
					<CategoryCarousel active={active} onChange={setActive} />
				</div>
			</div>

			{/* Menu Items */}
			<div className="max-w-6xl mx-auto px-4 py-6">
				{loading ? (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{Array.from({ length: 8 }).map((_, i) => (
							<div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
								<div className="h-48 bg-gray-200" />
								<div className="p-4 space-y-3">
									<div className="h-4 bg-gray-200 rounded w-3/4" />
									<div className="h-3 bg-gray-200 rounded w-1/2" />
									<div className="h-10 bg-gray-200 rounded" />
								</div>
							</div>
						))}
					</div>
				) : items.length === 0 ? (
					<div className="text-center py-12">
						<div className="text-6xl mb-4">🍽️</div>
						<h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
						<p className="text-gray-600">Try selecting a different category</p>
					</div>
				) : (
					<AnimatePresence mode="popLayout">
						<motion.div 
							layout 
							className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
						>
							{items.map((item) => (
								<motion.div 
									key={item._id} 
									layout 
									initial={{ opacity: 0, y: 20 }} 
									animate={{ opacity: 1, y: 0 }} 
									exit={{ opacity: 0, y: -20 }}
									transition={{ duration: 0.3 }}
								>
									<ItemCard item={item} />
								</motion.div>
							))}
						</motion.div>
					</AnimatePresence>
				)}
			</div>

			{/* Bottom Offer */}
{/* 			{offer && <BottomOfferBox offer={offer} />} */}
		</div>
	);
}

