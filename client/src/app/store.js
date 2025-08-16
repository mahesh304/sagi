import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import cartReducer from '../features/cart/cartSlice';

const persistMiddleware = (storeApi) => (next) => (action) => {
	const result = next(action);
	try {
		const state = storeApi.getState();
		localStorage.setItem('sfc_cart', JSON.stringify(state.cart));
		localStorage.setItem('sfc_user', JSON.stringify(state.auth.user));
		if (state.auth.token) localStorage.setItem('sfc_token', state.auth.token);
		else localStorage.removeItem('sfc_token');
	} catch {}
	return result;
};

export const store = configureStore({
	reducer: {
		auth: authReducer,
		cart: cartReducer,
	},
	middleware: (getDefault) => getDefault().concat(persistMiddleware),
});






