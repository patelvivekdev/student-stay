import '@/assets/styles/globals.css'

export const metadata = {
	title: 'Student Stay | Find your roommates',
	description: 'Find the best student accommodation in the KWC area',
	keywords: 'student, accommodation, KWC, roommates',
}

export default function RootLayout({children}) {
	return (
		<html lang='en'>
			<body>
				<h1>Student Stay</h1>
				{children}
			</body>
		</html>
	)
}
