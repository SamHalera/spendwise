import { User2Icon, UserCircle2 } from "lucide-react";
import { SidebarTrigger } from "../ui/sidebar";

export function HeaderLogged({ userName }: { userName: string | null | undefined }) {
    return (
        <header className="flex justify-between w-full px-5 bg-white">
            <SidebarTrigger className="my-4 text-2xl" />

            <div className="flex items-center gap-2 my-5">
                <UserCircle2 />
                <span className="">{userName}</span>
            </div>
        </header>
    )

}