'use client';

import { useState, useEffect } from 'react';
import { UploadDropzone } from '@/utils/uploadthing';
import { HexColorPicker } from 'react-colorful';

export default function CollegeManagement() {
	const [colleges, setColleges] = useState([]);
	const [isEditing, setIsEditing] = useState(false);
	const [currentCollege, setCurrentCollege] = useState({
		id: '',
		name: '',
		location: '',
		email: '',
		logo: '',
		brandingColors: '#000000',
		placementPolicy: '',
	});
	const [isLoading, setIsLoading] = useState(false);

	// Fetch Colleges
	const fetchColleges = async () => {
		setIsLoading(true);
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/api/super-admin/college`
			);
			if (!response.ok) throw new Error('Failed to fetch colleges');
			const data = await response.json();
			setColleges(data);
		} catch (error) {
			console.error('Fetch error:', error);
			alert('Failed to fetch colleges');
		}
		setIsLoading(false);
	};

	const handleSubmit = async (logoUrl = currentCollege.logo) => {
		setIsLoading(true);
		try {
			const endpoint = isEditing
				? `${process.env.NEXT_PUBLIC_API_URL}/api/super-admin/college/${currentCollege.id}`
				: `${process.env.NEXT_PUBLIC_API_URL}/api/super-admin/college`;

			const method = isEditing ? 'PUT' : 'POST';

			const response = await fetch(endpoint, {
				method,
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					...currentCollege,
					logo: logoUrl,
				}),
			});

			if (!response.ok) throw new Error('Failed to save college data');

			await response.json();
			await fetchColleges(); // Explicitly fetch colleges after submission
			resetForm();
			alert(`College ${isEditing ? 'updated' : 'created'} successfully`);
		} catch (error) {
			console.error('Submit error:', error);
			alert('Failed to save college data');
		}
		setIsLoading(false);
	};

	const handleDelete = async (id) => {
		if (!window.confirm('Are you sure you want to delete this college?'))
			return;

		setIsLoading(true);
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/api/super-admin/college/${id}`,
				{
					method: 'DELETE',
				}
			);

			if (!response.ok) throw new Error('Failed to delete college');

			await fetchColleges();
			alert('College deleted successfully');
		} catch (error) {
			console.error('Delete error:', error);
			alert('Failed to delete college');
		}
		setIsLoading(false);
	};

	const resetForm = () => {
		setCurrentCollege({
			id: '',
			name: '',
			location: '',
			email: '',
			logo: '',
			brandingColors: '#000000',
			placementPolicy: '',
		});
		setIsEditing(false);
	};

	useEffect(() => {
		fetchColleges();
	}, []);

	return (
		<div className='container mx-auto p-6 min-h-screen'>
			<h1 className='text-3xl font-bold mb-6 text-center'>
				{isEditing ? 'Edit College' : 'Add New College'}
			</h1>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
				{/* Form Section */}
				<div className='bg-white shadow-md rounded-lg p-6'>
					<div className='grid grid-cols-1 gap-4'>
						<input
							type='text'
							placeholder='College Name'
							value={currentCollege.name}
							onChange={(e) =>
								setCurrentCollege({
									...currentCollege,
									name: e.target.value,
								})
							}
							className='w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
							required
						/>
						<input
							type='text'
							placeholder='Location'
							value={currentCollege.location}
							onChange={(e) =>
								setCurrentCollege({
									...currentCollege,
									location: e.target.value,
								})
							}
							className='w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
							required
						/>
						<input
							type='email'
							placeholder='College Email'
							value={currentCollege.email}
							onChange={(e) =>
								setCurrentCollege({
									...currentCollege,
									email: e.target.value,
								})
							}
							className='w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
							required
						/>

						<textarea
							placeholder='Placement Policy'
							value={currentCollege.placementPolicy}
							onChange={(e) =>
								setCurrentCollege({
									...currentCollege,
									placementPolicy: e.target.value,
								})
							}
							className='w-full p-3 border rounded-md h-24 focus:outline-none focus:ring-2 focus:ring-blue-500'
						/>

						{/* Color Picker Section */}
						<div className='mb-4'>
							<label className='block mb-2 text-sm font-medium'>
								Branding Color
							</label>
							<div className='flex items-center space-x-4'>
								<HexColorPicker
									color={currentCollege.brandingColors}
									onChange={(color) =>
										setCurrentCollege({
											...currentCollege,
											brandingColors: color,
										})
									}
									className='w-48 h-48'
								/>
								<div
									className='w-24 h-24 border-2 rounded-lg shadow-md'
									style={{ backgroundColor: currentCollege.brandingColors }}
								>
									<p className='text-xs text-center mt-2 text-white'>
										{currentCollege.brandingColors}
									</p>
								</div>
							</div>
						</div>

						{/* Logo Upload */}
						<UploadDropzone
							endpoint='imageUploader'
							onClientUploadComplete={(res) => {
								if (res && res[0]?.url) {
									setCurrentCollege({
										...currentCollege,
										logo: res[0].url,
									});
									handleSubmit(res[0].url);
								}
							}}
							onUploadError={(error) => {
								alert(`ERROR! ${error.message}`);
							}}
						/>
					</div>
				</div>

				{/* Colleges List Section */}
				<div>
					<h2 className='text-2xl font-semibold mb-4'>Existing Colleges</h2>
					{isLoading ? (
						<p className='text-center'>Loading...</p>
					) : (
						<div className='bg-white text-gray-700 shadow-md rounded-lg overflow-hidden'>
							<table className='w-full'>
								<thead className='bg-gray-100'>
									<tr>
										<th className='p-3 text-left'>Name</th>
										<th className='p-3 text-left'>Location</th>
										<th className='p-3 text-center'>Actions</th>
									</tr>
								</thead>
								<tbody>
									{colleges?.map((college) => (
										<tr key={college.id} className='border-b hover:bg-gray-50'>
											<td className='p-3'>{college.name}</td>
											<td className='p-3'>{college.location}</td>
											<td className='p-3 text-center'>
												<button
													onClick={() => {
														setCurrentCollege(college);
														setIsEditing(true);
													}}
													className='mr-2 text-blue-500 hover:text-blue-700'
												>
													Edit
												</button>
												<button
													onClick={() => handleDelete(college.id)}
													className='text-red-500 hover:text-red-700'
												>
													Delete
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
