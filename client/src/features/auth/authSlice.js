import { createSlice } from '@reduxjs/toolkit';

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
		logout(state) {
			state.user = null;
			state.token = null;
			localStorage.removeItem('sfc_token');
			localStorage.removeItem('sfc_user');
		},
	},
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;