import "@/app/styles/globals.css"
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import { Toaster } from 'react-hot-toast';

export const metadata:Metadata = {
	title: 'Student Stay | Find your roommates',
	description: 'Find the best student accommodation in the KWC area',
	keywords: 'student, accommodation, KWC, roommates',
}

export default function RootLayout({
	children,
  }: Readonly<{
	children: React.ReactNode;
  }>) {
	return (
		<html lang='en'>
			<body>
				<Navbar/>
				{children}
				<Toaster position="bottom-center" />
			</body>
		</html>
	)
}
