import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [currentFoodSlide, setCurrentFoodSlide] = useState(0);
	
	const offer = useMemo(() => ({
		id: 'welcome-bucket',
		title: 'Welcome Bucket',
		description: 'Try our family bucket today and save 15%!',
		price: 299,
		item: { _id: 'offer-bucket', name: 'Welcome Bucket', category: 'buckets', price: 299, imageUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=60' },
	}), []);

	const combos = useMemo(() => [
		{
			id: 'combo-1',
			name: 'Chicken Combo',
			description: '2 pieces chicken + fries + drink',
			price: 199,
			imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=800&q=60'
		},
		{
			id: 'combo-2',
			name: 'Family Feast',
			description: '4 pieces chicken + 2 sides + 2 drinks',
			price: 399,
			imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=800&q=60'
		},
		{
			id: 'combo-3',
			name: 'Student Special',
			description: '1 piece chicken + fries + drink',
			price: 149,
			imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=800&q=60'
		}
	], []);

	const heroSliderImages = useMemo(() => [
		'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=60',
		'https://th.bing.com/th/id/OIP.3M5lHRl-zGKFzNYEzg27LQHaE7?w=260&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
		'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=60',
		'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=1200&q=60',
		'https://th.bing.com/th/id/OIP.L4N-hGMbRSzHyzkJt7T-4QAAAA?w=258&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3'
	], []);

	const foodSliderItems = useMemo(() => [
		{
			id: 'chicken-legs',
			name: 'Crispy Chicken Legs',
			description: 'Juicy, crispy fried chicken legs with our secret spice blend',
			price: 89,
			imageUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=60'
		},
		{
			id: 'chicken-strips',
			name: 'Chicken Strips',
			description: 'Tender chicken strips with crispy coating and dipping sauce',
			price: 129,
			imageUrl: 'data:image/webp;base64,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'
		},
		{
			id: 'chicken-wings',
			name: 'Spicy Wings',
			description: 'Hot & spicy chicken wings with tangy sauce',
			price: 99,
			imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=60'
		},
		{
			id: 'chicken-burger',
			name: 'Chicken Burger',
			description: 'Classic chicken burger with fresh veggies and special sauce',
			price: 149,
			imageUrl: 'https://th.bing.com/th/id/OIP.s-7OBI-1nsce-2y_MnLJcgHaE8?w=257&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3'
		},
		{
			id: 'chicken-bucket',
			name: 'Family Bucket',
			description: 'Perfect for sharing with family and friends',
			price: 299,
			imageUrl: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=800&q=60'
		}
	], []);

	// Auto-slide functionality for hero slider
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % heroSliderImages.length);
		}, 5000);

		return () => clearInterval(interval);
	}, [heroSliderImages.length]);

	// Auto-slide functionality for food slider
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentFoodSlide((prev) => (prev + 1) % foodSliderItems.length);
		}, 3000);

		return () => clearInterval(interval);
	}, [foodSliderItems.length]);

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Hero Section with Slider */}
			<section className="relative bg-gradient-to-br from-brand-red to-red-700 text-white overflow-hidden">
				<div className="absolute inset-0 bg-black/30" />
				<div className="relative max-w-6xl mx-auto px-4 py-16 sm:py-24">
					<div className="text-center">
						<div className="mb-8">
							<div className="text-8xl sm:text-9xl mb-4">🍗</div>
							<h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold mb-4 bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
								SAGI FRIED CHICKENS
							</h1>
						</div>
						<p className="text-2xl sm:text-3xl mb-8 opacity-90 font-semibold">
							Crispy. Juicy. Legendary.
						</p>
						<p className="text-lg mb-8 opacity-80">
							📍 Hyderabad's Favorite Fried Chicken
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Link 
								to="/menu" 
								className="px-8 py-4 bg-white text-brand-red font-bold rounded-xl hover:bg-gray-100 transition-colors text-lg"
							>
								View Menu
							</Link>
							<Link 
								to="/cart" 
								className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-brand-red transition-colors text-lg"
							>
								Order Now
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* Hero Image Slider */}
			<section className="py-12 bg-white">
				<div className="max-w-6xl mx-auto px-4">
					<h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Our Delicious Creations</h2>
					<div className="relative overflow-hidden rounded-2xl shadow-2xl">
						<div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
							{heroSliderImages.map((image, index) => (
								<div key={index} className="w-full flex-shrink-0">
									<img 
										src={image} 
										alt={`SFC Special ${index + 1}`}
										className="w-full h-64 md:h-80 object-cover"
									/>
								</div>
							))}
						</div>
						<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
							{heroSliderImages.map((_, index) => (
								<button
									key={index}
									onClick={() => setCurrentSlide(index)}
									className={`w-3 h-3 rounded-full transition-all ${
										index === currentSlide ? 'bg-white scale-125' : 'bg-white/40'
									}`}
								/>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Food Items Slider */}
			<section className="py-12 bg-gray-50">
				<div className="max-w-6xl mx-auto px-4">
					<h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Our Signature Items</h2>
					<div className="relative overflow-hidden rounded-2xl shadow-2xl bg-white">
						<div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentFoodSlide * 100}%)` }}>
							{foodSliderItems.map((item, index) => (
								<div key={index} className="w-full flex-shrink-0 p-8">
									<div className="flex flex-col md:flex-row items-center gap-8">
										<div className="flex-1">
											<h3 className="text-3xl font-bold text-gray-900 mb-4">{item.name}</h3>
											<p className="text-lg text-gray-600 mb-6">{item.description}</p>
											<div className="text-3xl font-bold text-brand-red mb-6">₹{item.price}</div>
											<Link 
												to="/menu" 
												className="inline-block px-6 py-3 bg-brand-red text-white font-semibold rounded-xl hover:bg-red-700 transition-colors"
											>
												Order Now
											</Link>
										</div>
										<div className="flex-1">
											<img 
												src={item.imageUrl} 
												alt={item.name}
												className="w-full h-64 md:h-80 object-cover rounded-xl"
											/>
										</div>
									</div>
								</div>
							))}
						</div>
						<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
							{foodSliderItems.map((_, index) => (
								<button
									key={index}
									onClick={() => setCurrentFoodSlide(index)}
									className={`w-3 h-3 rounded-full transition-all ${
										index === currentFoodSlide ? 'bg-brand-red scale-125' : 'bg-gray-400'
									}`}
								/>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Combos Section */}
			<section className="py-12 bg-white">
				<div className="max-w-6xl mx-auto px-4">
					<h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Special Combos</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{combos.map((combo) => (
							<div key={combo.id} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow">
								<img 
									src={combo.imageUrl} 
									alt={combo.name}
									className="w-full h-48 object-cover"
								/>
								<div className="p-6">
									<h3 className="text-xl font-bold text-gray-900 mb-2">{combo.name}</h3>
									<p className="text-gray-600 mb-4">{combo.description}</p>
									<div className="flex items-center justify-between">
										<span className="text-2xl font-bold text-brand-red">₹{combo.price}</span>
										<Link 
											to="/menu" 
											className="px-4 py-2 bg-brand-red text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
										>
											Order Now
										</Link>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* About Section */}
			<section className="py-12 bg-gray-50">
				<div className="max-w-6xl mx-auto px-4">
					<div className="text-center">
						<h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose SFC?</h2>
						<p className="text-gray-600 text-lg mb-8">
							Experience the authentic taste of Hyderabad's finest fried chicken. 
							Made with premium ingredients and traditional recipes.
						</p>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
							<div className="text-center">
								<div className="text-4xl mb-4">🏆</div>
								<h3 className="text-xl font-semibold text-gray-900 mb-2">Premium Quality</h3>
								<p className="text-gray-600">Fresh ingredients, hygienic preparation, and consistent taste.</p>
							</div>
							<div className="text-center">
								<div className="text-4xl mb-4">🍗</div>
								<h3 className="text-xl font-semibold text-gray-900 mb-2">Authentic Recipe</h3>
								<p className="text-gray-600">Traditional recipes passed down through generations.</p>
							</div>
							<div className="text-center">
								<div className="text-4xl mb-4">🚚</div>
								<h3 className="text-xl font-semibold text-gray-900 mb-2">Fast Service</h3>
								<p className="text-gray-600">Quick service for dine-in and takeaway orders.</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Delivery Partners Section */}
			<section className="py-12 bg-white">
				<div className="max-w-6xl mx-auto px-4">
					<h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Order Through Our Partners</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<a 
							href="https://www.swiggy.com/city/hyderabad/sfc-sagi-fried-chicken-indhira-nagar-uppal-rest792488" 
							target="_blank" 
							rel="noopener noreferrer"
							className="text-center p-8 border border-gray-200 rounded-2xl hover:shadow-lg transition-all hover:scale-105"
						>
							<div className="text-6xl mb-4">🛵</div>
							<h3 className="text-2xl font-bold text-gray-900 mb-4">Swiggy</h3>
							<p className="text-gray-600 mb-4">Order through Swiggy for home delivery</p>
							<div className="inline-block px-6 py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-colors">
								Order on Swiggy
							</div>
						</a>
						<a 
							href="https://www.zomato.com/hyderabad/sfc-sagi-fried-chicken-boduppal" 
							target="_blank" 
							rel="noopener noreferrer"
							className="text-center p-8 border border-gray-200 rounded-2xl hover:shadow-lg transition-all hover:scale-105"
						>
							<div className="text-6xl mb-4">🚚</div>
							<h3 className="text-2xl font-bold text-gray-900 mb-4">Zomato</h3>
							<p className="text-gray-600 mb-4">Order through Zomato for home delivery</p>
							<div className="inline-block px-6 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-colors">
								Order on Zomato
							</div>
						</a>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-12 bg-brand-red text-white">
				<div className="max-w-6xl mx-auto px-4 text-center">
					<h2 className="text-3xl font-bold mb-4">Ready to Taste the Difference?</h2>
					<p className="text-xl mb-8 opacity-90">
						Visit our branches in Boduppal and Malkajgiri for the best fried chicken experience
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Link 
							to="/menu" 
							className="inline-block px-8 py-4 bg-white text-brand-red font-bold rounded-xl hover:bg-gray-100 transition-colors"
						>
							Explore Our Menu
						</Link>
						<Link 
							to="/cart" 
							className="inline-block px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-brand-red transition-colors"
						>
							Order Now
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
}

