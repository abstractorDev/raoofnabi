// src/app/page.tsx
'use client';

import { useState, useEffect, FormEvent } from 'react';

interface UserCredentials {
	email: string;
	password: string;
}

const STORAGE_KEY = 'user_auth_data';

export default function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [savedUser, setSavedUser] = useState<UserCredentials | null>(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [error, setError] = useState('');

	// خواندن اطلاعات از localStorage هنگام لود شدن کامپوننت در سمت کلاینت
	useEffect(() => {
		const storedData = localStorage.getItem(STORAGE_KEY);
		if (storedData) {
			try {
				setSavedUser(JSON.parse(storedData));
			} catch (e) {
				console.error('Failed to parse local storage data', e);
			}
		}
		setIsLoaded(true);
	}, []);

	// تابع ذخیره اطلاعات هنگام سابمیت فرم
	const handleLogin = (e: FormEvent) => {
		e.preventDefault();
		setError('');

		if (!email.trim() || !password.trim()) {
			setError('لطفاً هم ایمیل و هم رمز عبور را وارد کنید.');
			return;
		}

		const userData: UserCredentials = { email, password };

		// ذخیره در LocalStorage به صورت رشته JSON
		localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));

		// آپدیت استیت برای نمایش وضعیت لاگین
		setSavedUser(userData);
		setEmail('');
		setPassword('');
	};

	// تابع خروج و پاک کردن اطلاعات از LocalStorage
	const handleLogout = () => {
		localStorage.removeItem(STORAGE_KEY);
		setSavedUser(null);
	};

	// جلوگیری از پرش تصویر (Hydration Mismatch) قبل از بررسی لوکال استوریج
	if (!isLoaded) {
		return null;
	}

	return (
		<main className='flex min-h-screen items-center justify-center p-4'>
			<div className='w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 shadow-2xl backdrop-blur-sm'>
				{savedUser ? (
					// نمای کاربر لاگین شده (اطلاعات موجود در لوکال استوریج)
					<div className='space-y-6 text-center'>
						<div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth={2}
								stroke='currentColor'
								className='h-8 w-8'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M4.5 12.75l6 6 9-13.5'
								/>
							</svg>
						</div>

						<div className='space-y-2'>
							<h2 className='text-xl font-bold text-white'>شما وارد شده‌اید</h2>
							<p className='text-sm text-zinc-400'>
								اطلاعات شما در{' '}
								<code className='text-emerald-400'>localStorage</code> ذخیره شده
								است.
							</p>
						</div>

						<div className='rounded-xl bg-zinc-950 p-4 text-right text-sm border border-zinc-800/80 space-y-2'>
							<div className='flex justify-between items-center border-b border-zinc-800 pb-2'>
								<span className='text-zinc-500'>ایمیل:</span>
								<span className='font-mono text-zinc-200 dir-ltr'>
									{savedUser.email}
								</span>
							</div>
							<div className='flex justify-between items-center pt-1'>
								<span className='text-zinc-500'>پسورد ذخیره‌شده:</span>
								<span className='font-mono text-zinc-200 dir-ltr'>
									{savedUser.password}
								</span>
							</div>
						</div>

						<button
							onClick={handleLogout}
							className='w-full rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm font-medium text-red-400 transition hover:bg-red-500/20 active:scale-[0.99]'
						>
							خروج و پاک کردن LocalStorage
						</button>
					</div>
				) : (
					// نمای فرم لاگین
					<div className='space-y-6'>
						<div className='space-y-2 text-center'>
							<h1 className='text-2xl font-bold tracking-tight text-white'>
								ورود به حساب
							</h1>
							<p className='text-sm text-zinc-400'>
								ایمیل و رمز عبور خود را برای ذخیره در مرورگر وارد کنید
							</p>
						</div>

						<form onSubmit={handleLogin} className='space-y-4'>
							{error && (
								<div className='rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-center text-xs text-red-400'>
									{error}
								</div>
							)}

							<div className='space-y-2'>
								<label
									htmlFor='email'
									className='block text-sm font-medium text-zinc-300'
								>
									ایمیل
								</label>
								<input
									id='email'
									type='email'
									dir='ltr'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder='name@example.com'
									className='w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition'
									required
								/>
							</div>

							<div className='space-y-2'>
								<label
									htmlFor='password'
									className='block text-sm font-medium text-zinc-300'
								>
									رمز عبور
								</label>
								<input
									id='password'
									type='password'
									dir='ltr'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									placeholder='••••••••'
									className='w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition'
									required
								/>
							</div>

							<button
								type='submit'
								className='w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-500 active:scale-[0.99] cursor-pointer mt-2'
							>
								ورود و ذخیره
							</button>
						</form>
					</div>
				)}
			</div>
		</main>
	);
}
