import BottomOfferBox from '../components/BottomOfferBox';
import { useMemo } from 'react';

export default function Home() {
	const offer = useMemo(() => ({
		id: 'welcome-bucket',
		title: 'Welcome Bucket',
		description: 'Try our family bucket today and save 15%!',
		price: 19.99,
		item: { _id: 'offer-bucket', name: 'Welcome Bucket', category: 'buckets', price: 19.99, imageUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=60' },
	}), []);

	return (
		<div>
			<section className="max-w-6xl mx-auto px-4 py-10">
				<h1 className="text-3xl sm:text-4xl font-extrabold">Sagi Fried Chickens</h1>
				<p className="mt-2 text-gray-600">Crispy. Juicy. Legendary.</p>
			</section>
			<BottomOfferBox offer={offer} />
		</div>
	);
}