import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialCart = (() => {
	try { return JSON.parse(localStorage.getItem('sfc_cart')) || { items: [] }; } catch { return { items: [] }; }
})();

const cartSlice = createSlice({
	name: 'cart',
	initialState: initialCart,
	reducers: {
		addItem(state, action) {
			const { item, qty = 1 } = action.payload;
			const existing = state.items.find((i) => i.item._id === item._id);
			if (existing) existing.qty += qty;
			else state.items.push({ item, qty });
		},
		removeItem(state, action) {
			const id = action.payload;
			state.items = state.items.filter((i) => i.item._id !== id);
		},
		setQty(state, action) {
			const { id, qty } = action.payload;
			const target = state.items.find((i) => i.item._id === id);
			if (target) target.qty = Math.max(1, qty);
		},
		clearCart(state) {
			state.items = [];
		},
	},
});

export const selectCartTotal = createSelector(
	(state) => state.cart.items,
	(items) => items.reduce((sum, i) => sum + i.item.price * i.qty, 0)
);

export const { addItem, removeItem, setQty, clearCart } = cartSlice.actions;
export default cartSlice.reducer;






