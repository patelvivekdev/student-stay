import { signIn, signOut } from "@/auth"
import { Button } from './ui/button';
import { Github } from "lucide-react";

export function SignIn({ provider, ...props }: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
    return (
      <form
        action={async () => {
          "use server"
          await signIn("github", {
            callbackUrl: "/",
          })
        }}
      >
        <Button {...props}><span><Github/></span> Login with GitHub</Button>
      </form>
    )
}

export function SignOut(props: React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
      className='w-full'
    >
      <Button variant='destructive' className='w-full' {...props}>
        Sign Out
      </Button>
    </form>
  );
}