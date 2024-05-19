import { auth } from "@/auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Profile() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect("/");
  }

  return (
    <section className="mx-auto min-h-screen flex flex-col items-center justify-center gap-8">
      <h1 className="text-3xl font-bold">{user?.name} Profile</h1>
      <div className="flex flex-row gap-4 items-center">
        <Image
          className="rounded-full border-2 border-gray-600"
          src={user?.image!}
          alt={user?.name!}
          width={50}
          height={50}
        />
        <div>
          <p className="text-xl">Email: {user?.email}</p>
          <p className="text-xl">Name: {user?.name}</p>
        </div>
      </div>
    </section>
  );
}
