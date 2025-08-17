import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { useEffect, useRef } from 'react';

const CATEGORIES = [
	{ id: 'all', label: 'All Items', icon: '🍽️', color: 'bg-gray-100 border-gray-200' },
	{ id: 'burgers', label: 'Burgers', icon: '🍔', color: 'bg-orange-100 border-orange-200' },
	{ id: 'chicken-fries', label: 'Chicken Fries', icon: '🍗', color: 'bg-red-100 border-red-200' },
	{ id: 'snacks', label: 'Snacks', icon: '🍟', color: 'bg-yellow-100 border-yellow-200' },
	{ id: 'combos', label: 'Combos', icon: '🍽️', color: 'bg-green-100 border-green-200' },
	{ id: 'buckets', label: 'Buckets', icon: '🪣', color: 'bg-purple-100 border-purple-200' },
	{ id: 'sides', label: 'Sides', icon: '🥗', color: 'bg-emerald-100 border-emerald-200' },
	{ id: 'sauces', label: 'Sauces', icon: '🧂', color: 'bg-red-100 border-red-200' },
	{ id: 'drinks', label: 'Drinks', icon: '🥤', color: 'bg-blue-100 border-blue-200' },
	{ id: 'desserts', label: 'Desserts', icon: '🍦', color: 'bg-pink-100 border-pink-200' },
];

export default function CategoryCarousel({ active, onChange }) {
	const containerRef = useRef(null);
	const [sliderRef, instanceRef] = useKeenSlider({
		mode: 'free-snap',
		slides: { perView: 3.2, spacing: 12 },
		breakpoints: {
			'(min-width: 480px)': { slides: { perView: 4.2, spacing: 12 } },
			'(min-width: 640px)': { slides: { perView: 5.2, spacing: 14 } },
			'(min-width: 768px)': { slides: { perView: 6.2, spacing: 16 } },
			'(min-width: 1024px)': { slides: { perView: 8, spacing: 18 } },
		},
		created() {
			// Auto-scroll to active category
			const activeIndex = CATEGORIES.findIndex(c => c.id === active);
			if (activeIndex > 0) {
				setTimeout(() => {
					instanceRef.current?.moveToIdx(activeIndex);
				}, 100);
			}
		},
	});

	useEffect(() => {
		const el = containerRef.current;
		if (!el) return;
		
		function onKey(e) {
			if (e.key === 'ArrowRight') instanceRef.current?.moveToIdx(instanceRef.current.track.details.rel + 1);
			if (e.key === 'ArrowLeft') instanceRef.current?.moveToIdx(instanceRef.current.track.details.rel - 1);
		}
		el.addEventListener('keydown', onKey);
		return () => el.removeEventListener('keydown', onKey);
	}, [instanceRef]);

	return (
		<div className="relative">
			<div ref={containerRef} tabIndex={0} aria-label="Food categories" className="outline-none">
				<div ref={sliderRef} className="keen-slider">
					{CATEGORIES.map((category) => (
										<button
											key={category.id}
											onClick={() => onChange(category.id)}
											className={`keen-slider__slide flex flex-col items-center justify-center gap-2 p-2 rounded-xl border-2 transition-all duration-200 min-h-[60px] ${
												active === category.id 
													? 'bg-brand-red border-brand-red text-white shadow-lg scale-105' 
													: `${category.color} hover:scale-105 hover:shadow-md`
											}`}
											aria-pressed={active === category.id}
										>
											<span className="text-xl">{category.icon}</span>
											<span className={`text-xs font-semibold ${active === category.id ? 'text-white' : 'text-gray-700'}`}>
												{category.label}
											</span>
										</button>
					))}
				</div>
			</div>
			
			{/* Scroll indicators */}
			<div className="flex justify-center mt-4 gap-1">
				{Array.from({ length: Math.ceil(CATEGORIES.length / 4) }).map((_, i) => (
					<div
						key={i}
						className="w-2 h-2 rounded-full bg-gray-300"
					/>
				))}
			</div>
		</div>
	);
}

