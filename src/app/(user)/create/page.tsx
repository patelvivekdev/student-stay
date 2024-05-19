import { redirect } from "next/navigation";
import AddForm from "./AddForm";
import { auth } from "@/auth";

export default async function CreateAccommodation(){
    const session = await auth();
    const user = session?.user;
    if(!user || !user.id){
        redirect("/login");
    }
    return(
        <AddForm userId={(user.id)}/>
    )
}