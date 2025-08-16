import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { login } from '../features/auth/authSlice';

export default function Login() {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const [isAdmin, setIsAdmin] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError('');

		try {
			const { data } = await api.post('/api/auth/login', formData);
			
			// Check if user is trying to login as admin
			if (isAdmin && data.user.role !== 'admin') {
				setError('Access denied! You are not an admin user.');
				return;
			}
			
			// Check if admin is trying to login without checkbox
			if (data.user.role === 'admin' && !isAdmin) {
				setError('Please check the "Login as Admin" checkbox to access admin panel.');
				return;
			}
			
			dispatch(login(data));
			// Navigate to admin panel if user is admin, otherwise to home
			navigate(data.user.role === 'admin' ? '/admin' : '/');
		} catch (err) {
			setError(err.response?.data?.message || 'Login failed. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	const handleChange = (e) => {
		setFormData(prev => ({
			...prev,
			[e.target.name]: e.target.value
		}));
	};

	return (
		<div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
			<div className="w-full max-w-md">
				{/* Header */}
				<div className="text-center mb-8">
					<Link to="/" className="text-3xl font-extrabold text-brand-red mb-2 block">
						SFC
					</Link>
					<h1 className="text-2xl font-bold text-gray-900">
						{isAdmin ? 'Admin Login' : 'Welcome Back'}
					</h1>
					<p className="text-gray-600 mt-2">
						{isAdmin ? 'Access admin panel' : 'Sign in to your account'}
					</p>
				</div>

				{/* Login Form */}
				<div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
					<form onSubmit={handleSubmit} className="space-y-6">
						{/* Email Field */}
						<div>
							<label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
								Email Address
							</label>
							<input
								type="email"
								id="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								required
								className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-red focus:border-transparent transition-colors"
								placeholder="Enter your email"
							/>
						</div>

						{/* Password Field */}
						<div>
							<label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
								Password
							</label>
							<input
								type="password"
								id="password"
								name="password"
								value={formData.password}
								onChange={handleChange}
								required
								className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-red focus:border-transparent transition-colors"
								placeholder="Enter your password"
							/>
						</div>

						{/* Admin Toggle */}
						<div className="flex items-center justify-between">
							<label className="flex items-center">
								<input
									type="checkbox"
									checked={isAdmin}
									onChange={(e) => setIsAdmin(e.target.checked)}
									className="w-4 h-4 text-brand-red border-gray-300 rounded focus:ring-brand-red"
								/>
								<span className="ml-2 text-sm text-gray-700">Login as Admin</span>
							</label>
						</div>

						{/* Error Message */}
						{error && (
							<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
								{error}
							</div>
						)}

						{/* Submit Button */}
						<button
							type="submit"
							disabled={loading}
							className="w-full py-3 bg-brand-red text-white font-semibold rounded-xl hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
						>
							{loading ? (
								<div className="flex items-center justify-center gap-2">
									<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
									Signing in...
								</div>
							) : (
								'Sign In'
							)}
						</button>
					</form>

					{/* Divider */}
					<div className="my-6 flex items-center">
						<div className="flex-1 border-t border-gray-200"></div>
						<span className="px-4 text-sm text-gray-500">or</span>
						<div className="flex-1 border-t border-gray-200"></div>
					</div>

					{/* Create Account Link */}
					<div className="text-center">
						<p className="text-sm text-gray-600">
							Don't have an account?{' '}
							<Link to="/register" className="text-brand-red font-semibold hover:underline">
								Create one
							</Link>
						</p>
					</div>
				</div>

				{/* Back to Home */}
				<div className="text-center mt-6">
					<Link to="/" className="text-sm text-gray-500 hover:text-gray-700">
						← Back to Home
					</Link>
				</div>
			</div>
		</div>
	);
}


