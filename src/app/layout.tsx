import "@/app/styles/globals.css"
import type { Metadata } from "next";

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
				<h1>Student Stay</h1>
				{children}
			</body>
		</html>
	)
}
