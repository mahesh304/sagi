import { useState } from 'react';
import api from '../api/axios';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Register() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [password, setPassword] = useState('');
	const [adminCode, setAdminCode] = useState('');
	const [error, setError] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();

	async function submit(e) {
		e.preventDefault();
		setError('');
		try {
			const { data } = await api.post('/api/auth/register', { name, email: email || undefined, phone: phone || undefined, password, adminCode: adminCode || undefined });
			dispatch(setCredentials(data));
			navigate('/');
		} catch (err) {
			setError(err.response?.data?.message || 'Registration failed');
		}
	}

	return (
		<div className="max-w-sm mx-auto px-4 py-8">
			<h2 className="text-2xl font-bold mb-4">Register</h2>
			<form onSubmit={submit} className="space-y-3">
				<input required placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded px-3 py-2" />
				<input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border rounded px-3 py-2" />
				<input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border rounded px-3 py-2" />
				<input required type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border rounded px-3 py-2" />
				<input placeholder="Admin Code (optional)" value={adminCode} onChange={(e) => setAdminCode(e.target.value)} className="w-full border rounded px-3 py-2" />
				{error && <div className="text-red-600 text-sm">{error}</div>}
				<button className="w-full px-4 py-2 rounded bg-[color:var(--color-brand-red)] text-white">Create account</button>
			</form>
		</div>
	);
}