import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CategoryCarousel from '../components/CategoryCarousel';
import ItemCard from '../components/ItemCard';
import api from '../api/axios';
import BottomOfferBox from '../components/BottomOfferBox';

export default function Menu() {
	const [active, setActive] = useState('burgers');
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		let ignore = false;
		async function load() {
			setLoading(true);
			try {
				const { data } = await api.get('/api/menu', { params: { category: active } });
				if (!ignore) setItems(data);
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
		<div className="max-w-6xl mx-auto px-4 py-4">
			<CategoryCarousel active={active} onChange={setActive} />
			<div className="mt-6">
				{loading && <div className="text-gray-500">Loading...</div>}
				<AnimatePresence mode="popLayout">
					<motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
						{items.map((item) => (
							<motion.div key={item._id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
								<ItemCard item={item} />
							</motion.div>
						))}
					</motion.div>
				</AnimatePresence>
			</div>
			<BottomOfferBox offer={offer} />
		</div>
	);
}