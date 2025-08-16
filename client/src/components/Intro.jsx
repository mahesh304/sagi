import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Intro() {
	const [show, setShow] = useState(() => localStorage.getItem('sfc_intro_seen') !== '1');
	const [phase, setPhase] = useState(0);

	useEffect(() => {
		if (!show) return;
		const t1 = setTimeout(() => setPhase(1), 1000);
		const t2 = setTimeout(() => {
			localStorage.setItem('sfc_intro_seen', '1');
			setShow(false);
		}, 2000);
		return () => { clearTimeout(t1); clearTimeout(t2); };
	}, [show]);

	if (!show) return null;

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className="fixed inset-0 z-50 bg-white flex items-center justify-center"
				aria-label="Intro animation"
			>
				<div className="absolute top-4 right-4">
					<button onClick={() => { localStorage.setItem('sfc_intro_seen', '1'); setShow(false); }} className="px-3 py-1 rounded border">Skip</button>
				</div>
				<div className="text-3xl sm:text-5xl font-extrabold">
					<AnimatePresence mode="wait">
						{phase === 0 ? (
							<motion.div key="sagi" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
								Sagi Fried Chickens
							</motion.div>
						) : (
							<motion.div key="sfc" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-brand-red">
								SFC
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</motion.div>
		</AnimatePresence>
	);
}


