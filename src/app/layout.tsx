// src/app/layout.tsx
import type { Metadata } from 'next';
import { Vazirmatn } from 'next/font/google';
import './globals.css';

const vazirmatn = Vazirmatn({ subsets: ['arabic'] });

export const metadata: Metadata = {
	title: 'صفحه ورود',
	description: 'لاگین ساده با ذخیره در LocalStorage',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='fa' dir='rtl'>
			<body
				className={`${vazirmatn.className} bg-zinc-950 text-zinc-100 antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
