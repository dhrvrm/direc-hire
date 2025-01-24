'use client';

import { useState } from 'react';

const SignUp = () => {
	const [role, setRole] = useState('STUDENT');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [organisation, setOrganisation] = useState('');
	const [college, setCollege] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setErrorMessage('Passwords do not match');
			return;
		}

		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						name,
						email,
						password,
						role,
						college,
						organisation,
					}),
				}
			);

			if (response.ok) {
				// Handle successful signup
				window.location.href = '/login';
			} else {
				setErrorMessage('Signup failed. Please try again.');
			}
		} catch (error) {
			setErrorMessage('An error occurred. Please try again.');
		}
	};

	return (
		<div className='min-h-screen bg-gray-100 flex items-center justify-center p-4'>
			<div className='max-w-md w-full bg-white rounded-xl shadow-lg p-8'>
				<h2 className='text-2xl font-bold text-gray-900 mb-6 text-center'>
					Sign Up
				</h2>

				{/* Role Selection Tabs */}
				<div className='flex mb-6 border-b'>
					<button
						className={`flex-1 py-2 px-4 text-center ${
							role === 'STUDENT'
								? 'border-b-2 border-indigo-600 text-indigo-600'
								: 'text-gray-500'
						}`}
						onClick={() => setRole('STUDENT')}
					>
						Student
					</button>
					<button
						className={`flex-1 py-2 px-4 text-center ${
							role === 'RECRUITER'
								? 'border-b-2 border-indigo-600 text-indigo-600'
								: 'text-gray-500'
						}`}
						onClick={() => setRole('RECRUITER')}
					>
						Recruiter
					</button>
				</div>

				{errorMessage && <p className='text-red-500 mb-4'>{errorMessage}</p>}

				<form onSubmit={handleSubmit} className='space-y-4'>
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>
							Name
						</label>
						<input
							type='text'
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
							className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all'
							placeholder='Your Name'
						/>
					</div>

					{role === 'RECRUITER' && (
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-1'>
								Organisation Name
							</label>
							<input
								type='text'
								value={organisation}
								onChange={(e) => setOrganisation(e.target.value)}
								required
								className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all'
								placeholder='Company/ Institution Name'
							/>
						</div>
					)}

					{role === 'STUDENT' && (
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-1'>
								College Name
							</label>
							<input
								type='text'
								value={college}
								onChange={(e) => setCollege(e.target.value)}
								required
								className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all'
								placeholder='College/ University Name'
							/>
						</div>
					)}

					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>
							Email
						</label>
						<input
							type='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all'
							placeholder='your@email.com'
						/>
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>
							Password
						</label>
						<input
							type='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className='w-full px-4 py-2 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all'
							placeholder='••••••••'
						/>
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>
							Confirm Password
						</label>
						<input
							type='password'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
							className='w-full px-4 py-2 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all'
							placeholder='••••••••'
						/>
					</div>

					<button
						type='submit'
						className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors'
					>
						Sign Up as {role === 'STUDENT' ? 'Student' : 'Recruiter'}
					</button>
				</form>

				<div className='mt-6 text-center text-sm text-gray-600'>
					Already have an account?
					<a
						href='/login'
						className='text-indigo-600 hover:text-indigo-500 font-medium'
					>
						{' '}
						Sign in
					</a>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
