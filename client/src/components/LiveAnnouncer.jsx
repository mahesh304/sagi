import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

export default function LiveAnnouncer() {
	const items = useSelector((s) => s.cart.items);
	const [msg, setMsg] = useState('');
	const prevLen = useRef(items.length);

	useEffect(() => {
		if (items.length > prevLen.current) setMsg('Item added to cart');
		if (items.length < prevLen.current) setMsg('Item removed from cart');
		prevLen.current = items.length;
	}, [items.length]);

	return (
		<div className="sr-only" aria-live="polite">{msg}</div>
	);
}






