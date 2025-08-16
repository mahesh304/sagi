import { useEffect, useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { addItem } from '../features/cart/cartSlice';

export default function BottomOfferBox({ offer }) {
	const [dismissed, setDismissed] = useState(() => localStorage.getItem('sfc_offer_dismissed') === '1');
	const dispatch = useDispatch();
	const ref = useRef(null);

	useEffect(() => {
		if (!dismissed && ref.current) ref.current.focus();
	}, [dismissed, offer]);

	function close() {
		setDismissed(true);
		localStorage.setItem('sfc_offer_dismissed', '1');
	}

	if (!offer || dismissed) return null;

	return (
		<AnimatePresence>
			<motion.div
				key={offer.id}
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: 50 }}
				transition={{ type: 'spring', stiffness: 300, damping: 24 }}
				ref={ref}
				tabIndex={0}
				aria-live="polite"
				className="fixed bottom-4 left-1/2 -translate-x-1/2 sm:right-4 sm:left-auto sm:translate-x-0 z-40 bg-white/90 backdrop-blur rounded-xl shadow-2xl border p-4 w-[95%] sm:w-96"
			>
				<div className="flex items-start gap-3">
					<div className="flex-1">
						<h3 className="text-lg font-bold">{offer.title}</h3>
						<p className="text-sm text-gray-600">{offer.description}</p>
						<div className="mt-2 flex items-center justify-between">
							<span className="text-base font-semibold text-brand-red">₹{offer.price.toFixed(2)}</span>
							<button
								onClick={() => dispatch(addItem({ item: offer.item, qty: 1 }))}
								className="px-3 py-1 rounded bg-brand-red text-white"
							>
								Add
							</button>
						</div>
					</div>
					<button aria-label="Dismiss offer" onClick={close} className="ml-2 px-2 py-1 rounded bg-gray-100">✕</button>
				</div>
			</motion.div>
		</AnimatePresence>
	);
}


