import { useState } from 'react';
import api from '../api/axios';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Login() {
	const [identifier, setIdentifier] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();

	async function submit(e) {
		e.preventDefault();
		setError('');
		try {
			const { data } = await api.post('/api/auth/login', { identifier, password });
			dispatch(setCredentials(data));
			navigate('/');
		} catch (err) {
			setError(err.response?.data?.message || 'Login failed');
		}
	}

	return (
		<div className="max-w-sm mx-auto px-4 py-8">
			<h2 className="text-2xl font-bold mb-4">Login</h2>
			<form onSubmit={submit} className="space-y-3">
				<input placeholder="Email or Phone" value={identifier} onChange={(e) => setIdentifier(e.target.value)} className="w-full border rounded px-3 py-2" />
				<input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border rounded px-3 py-2" />
				{error && <div className="text-red-600 text-sm">{error}</div>}
				<button className="w-full px-4 py-2 rounded bg-[color:var(--color-brand-red)] text-white">Login</button>
			</form>
		</div>
	);
}