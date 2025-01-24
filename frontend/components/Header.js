import Link from 'next/link';

export default function Header() {
	return (
		<nav className='flex justify-between items-center p-4 bg-gray-800 text-white'>
			<h1 className='font-xl'>Direc Hire</h1>
			<ul className='flex gap-4'>
				<li>
					<Link href='/'>Home</Link>
				</li>
				<li>
					<Link href='/admin'>Admin Dashboard</Link>
				</li>
				<li>
					<Link href='/login'>Login</Link>
				</li>
				<li>
					<Link href='/signup'>Signup</Link>
				</li>
			</ul>
		</nav>
	);
}
