import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarHeader as ShadcnSidebarHeader } from "@/components/ui/sidebar";
import { capitalize } from "lodash";
import { User } from "lucide-react";
import { useSession } from "next-auth/react";
export const SidebarHeader = () => {
  const { data: session } = useSession();
  return (
    <ShadcnSidebarHeader>
      <div className="border rounded-md flex flex-row items-center p-2 gap-4">
        <Avatar className="h-8 w-8 rounded-lg">
          <AvatarImage alt={session?.user.name} />
          <AvatarFallback className="rounded-lg">
            <User size={20} />
          </AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">{session?.user.name}</span>
          <span className="truncate text-xs">
            {capitalize(session?.user.role)}
          </span>
        </div>
      </div>
    </ShadcnSidebarHeader>
  );
};
