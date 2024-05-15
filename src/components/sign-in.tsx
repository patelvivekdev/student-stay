import { signIn, signOut } from "@/auth"
import { Button } from './ui/button';
export function SignIn({ provider, ...props }: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
    return (
      <form
        action={async () => {
          "use server"
          await signIn(provider || "google", {
            callbackUrl: "/",
          })
        }}
      >
        <Button {...props}> Login with {provider || "Google"}</Button>
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