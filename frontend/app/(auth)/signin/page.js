// pages/login.js
'use client'; // Marking this as a client component

import { useState } from 'react';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [rememberMe, setRememberMe] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setErrorMessage('Passwords do not match');
			return;
		}
		// Handle successful login here (e.g., API call)

		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						email,
						password,
					}),
				}
			);

			if (response.ok) {
				// Handle successful signup
				window.location.href = '/login';
			} else {
				setErrorMessage('Signin failed. Please try again.');
			}
		} catch (error) {
			setErrorMessage('An error occurred. Please try again.');
		}

		console.log('Email:', email);
		console.log('Password:', password);
		console.log('Remember Me:', rememberMe);
		setErrorMessage('');
	};

	return (
		<div className='min-h-screen bg-gray-100 flex items-center justify-center p-4'>
			<div className='max-w-md w-full bg-white rounded-xl shadow-lg p-8'>
				<h2 className='text-2xl font-bold text-gray-900 mb-6 text-center'>
					Sign In
				</h2>

				{errorMessage && <p className='text-red-500 mb-4'>{errorMessage}</p>}

				<form onSubmit={handleSubmit} className='space-y-4'>
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
							className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all'
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
							className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all'
							placeholder='••••••••'
						/>
					</div>

					<div className='flex items-center justify-between'>
						<label className='flex items-center'>
							<input
								type='checkbox'
								checked={rememberMe}
								onChange={() => setRememberMe(!rememberMe)}
								className='rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
							/>
							<span className='ml-2 text-sm text-gray-600'>Remember me</span>
						</label>
						{/* Uncomment if you want to add a "Forgot password?" link */}
						{/* <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500">Forgot password?</a> */}
					</div>

					<button
						type='submit'
						className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors'
					>
						Sign In
					</button>
				</form>

				<div className='mt-6 text-center text-sm text-gray-600'>
					Don&apos;t have an account?
					<a
						href='/signup'
						className='text-indigo-600 hover:text-indigo-500 font-medium'
					>
						{' '}
						Sign up
					</a>
				</div>
			</div>
		</div>
	);
};

export default Login;
