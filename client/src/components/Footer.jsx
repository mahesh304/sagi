export default function Footer() {
	return (
		<footer className="mt-10 border-t bg-white/70">
			<div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-600 flex items-center justify-between">
				<p>© {new Date().getFullYear()} SFC — Sagi Fried Chickens</p>
				<nav className="flex gap-4">
					<a href="/menu">Menu</a>
					<a href="/cart">Cart</a>
				</nav>
			</div>
		</footer>
	);
}