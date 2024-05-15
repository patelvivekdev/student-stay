import { signIn } from "@/auth"
 
export function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("github", {
          callbackUrl: "/",
        })
      }}
    >
      <button type="submit">Signin with GitHub</button>
    </form>
  )
} 