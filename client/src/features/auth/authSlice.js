import { createSlice } from '@reduxjs/toolkit';
import { clearCart } from '../cart/cartSlice';

const storedUser = (() => {
	try { return JSON.parse(localStorage.getItem('sfc_user')); } catch { return null; }
})();
const storedToken = localStorage.getItem('sfc_token') || null;

const authSlice = createSlice({
	name: 'auth',
	initialState: { user: storedUser, token: storedToken },
	reducers: {
		setCredentials(state, action) {
			state.user = action.payload.user;
			state.token = action.payload.token;
		},
		login(state, action) {
			state.user = action.payload.user;
			state.token = action.payload.token;
		},
		logout(state) {
			state.user = null;
			state.token = null;
			localStorage.removeItem('sfc_token');
			localStorage.removeItem('sfc_user');
		},
	},
});

// Export actions and thunk for logout with cart clearing
export const { setCredentials, login, logout } = authSlice.actions;

// Thunk for logout that also clears cart
export const logoutAndClearCart = () => (dispatch) => {
	dispatch(logout());
	dispatch(clearCart());
	localStorage.removeItem('sfc_cart');
};

export default authSlice.reducer;


