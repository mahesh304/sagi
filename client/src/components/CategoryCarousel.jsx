import { useEffect, useRef } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

const CATEGORIES = [
	{ id: 'burgers', label: 'Burgers', img: 'https://img.icons8.com/color/96/hamburger.png' },
	{ id: 'drinks', label: 'Drinks', img: 'https://img.icons8.com/color/96/cocktail.png' },
	{ id: 'sauces', label: 'Sauces', img: 'https://img.icons8.com/color/96/sauce.png' },
	{ id: 'snacks', label: 'Snacks', img: 'https://img.icons8.com/color/96/french-fries.png' },
	{ id: 'combos', label: 'Combos', img: 'https://img.icons8.com/color/96/meal.png' },
	{ id: 'buckets', label: 'Buckets', img: 'https://img.icons8.com/color/96/bucket.png' },
	{ id: 'sides', label: 'Sides', img: 'https://img.icons8.com/color/96/hot-dog.png' },
	{ id: 'desserts', label: 'Desserts', img: 'https://img.icons8.com/color/96/ice-cream-bowl.png' },
];

export default function CategoryCarousel({ active, onChange }) {
	const containerRef = useRef(null);
	const [sliderRef, instanceRef] = useKeenSlider({
		mode: 'free-snap',
		slides: { perView: 4.5, spacing: 10 },
		breakpoints: {
			'(min-width: 640px)': { slides: { perView: 6, spacing: 12 } },
			'(min-width: 1024px)': { slides: { perView: 8, spacing: 14 } },
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
		<div ref={containerRef} tabIndex={0} aria-label="Categories" className="outline-none">
			<div ref={sliderRef} className="keen-slider">
				{CATEGORIES.map((c) => (
					<button
						key={c.id}
						onClick={() => onChange(c.id)}
						className={`keen-slider__slide flex flex-col items-center justify-center gap-2 p-2 border rounded-lg bg-white ${active === c.id ? 'ring-2 ring-[color:var(--color-brand-red)] scale-95 shadow' : ''}`}
						aria-pressed={active === c.id}
					>
						<img src={c.img} alt={`${c.label} icon`} className="w-12 h-12" loading="lazy" />
						<span className="text-sm font-medium">{c.label}</span>
					</button>
				))}
			</div>
		</div>
	);
}