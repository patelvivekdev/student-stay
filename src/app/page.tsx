import { SignIn } from "@/components/sign-in";

export default function Home() {
	return (
		<div className="min-h-screen bg-gray-100 mx-auto flex flex-col items-center justify-center">
			<h1>Home</h1>
			<SignIn />
		</div>
	)
}
