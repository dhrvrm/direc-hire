// import { NextResponse } from 'next/server';
// import { verify } from 'jsonwebtoken';

// const JWT_SECRET = process.env.JWT_SECRET;

// export function middleware(req) {
// 	const token = req.cookies.get('auth_token')?.value;

// 	// Admin dashboard protection
// 	if (req.nextUrl.pathname.startsWith('/admin')) {
// 		if (!token) {
// 			return NextResponse.redirect(new URL('/admin/login', req.url));
// 		}

// 		try {
// 			const decoded = verify(token, JWT_SECRET);
// 			if (decoded.role !== 'ADMIN') {
// 				return NextResponse.redirect(new URL('/admin/login', req.url));
// 			}
// 		} catch (error) {
// 			return NextResponse.redirect(new URL('/admin/login', req.url));
// 		}
// 	}

// 	// Student/Recruiter route protection (optional)
// 	if (req.nextUrl.pathname.startsWith('/dashboard')) {
// 		if (!token) {
// 			return NextResponse.redirect(new URL('/login', req.url));
// 		}

// 		try {
// 			const decoded = verify(token, JWT_SECRET);
// 			if (!['STUDENT', 'RECRUITER'].includes(decoded.role)) {
// 				return NextResponse.redirect(new URL('/login', req.url));
// 			}
// 		} catch (error) {
// 			return NextResponse.redirect(new URL('/login', req.url));
// 		}
// 	}

// 	return NextResponse.next();
// }

// export const config = {
// 	matcher: ['/admin/:path*', '/dashboard/:path*'],
// };
