import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { addItem } from '../features/cart/cartSlice'

export default function OfferBox({ offers }) {
	const dispatch = useDispatch()
	const [visible, setVisible] = React.useState(true)
	const currentOffer = offers?.[0]

	if (!currentOffer || !visible) return null

	return (
		<div aria-live="polite">
			<AnimatePresence>
				<motion.div
					key={currentOffer.id || currentOffer._id}
					initial={{ y: 100, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{ y: 100, opacity: 0 }}
					transition={{ type: 'spring', stiffness: 120 }}
					className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-xl w-[92%] md:w-[640px] rounded-xl shadow-2xl p-4 bg-white/95 backdrop-blur"
					role="dialog"
					aria-label="Current special offer"
				>
					<div className="flex items-center gap-4">
						<img src={currentOffer.imageUrl} alt={currentOffer.name} className="w-20 h-20 rounded-lg object-cover" loading="lazy" />
						<div className="flex-1">
							<div className="font-semibold">{currentOffer.name}</div>
							<div className="text-sm text-gray-600">{currentOffer.description}</div>
						</div>
						<div className="flex flex-col items-end gap-2">
							<div className="font-bold">₹{Number(currentOffer.price).toFixed(2)}</div>
							<div className="flex gap-2">
								<button className="px-3 py-1 rounded bg-[color:var(--color-brand-red)] text-white" onClick={() => dispatch(addItem({ item: currentOffer, qty: 1 }))}>Add</button>
								<button className="px-3 py-1 rounded border" onClick={() => setVisible(false)} aria-label="Dismiss offer">Close</button>
							</div>
						</div>
					</div>
				</motion.div>
			</AnimatePresence>
		</div>
	)
}






