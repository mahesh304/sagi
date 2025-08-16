import api from '../api/axios';
import { useState } from 'react';

export default function ImageUploader({ value, onUploaded }) {
	const [file, setFile] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	async function upload() {
		if (!file) return;
		setLoading(true);
		setError('');
		try {
			const formData = new FormData();
			formData.append('image', file);
			const { data } = await api.post('/api/menu/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
			onUploaded?.(data.imageUrl);
		} catch (e) {
			setError(e.response?.data?.message || 'Upload failed');
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="space-y-2">
			<div className="flex items-center gap-2">
				<input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
				<button type="button" onClick={upload} disabled={loading || !file} className="px-3 py-1 rounded border disabled:opacity-50">{loading ? 'Uploading...' : 'Upload'}</button>
			</div>
			{value && <div className="text-xs text-gray-600 break-all">Uploaded: {value}</div>}
			{error && <div className="text-xs text-red-600">{error}</div>}
		</div>
	);
}






