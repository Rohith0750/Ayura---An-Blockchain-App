import { cn } from "@/lib/utils"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { UserNav } from "./user-nav"
import { Logo } from "../logo"

export function Header({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6",
        className
      )}
      {...props}
    >
      <SidebarTrigger className="md:hidden" />

      <div className="hidden md:block">
        <Logo />
      </div>

      <div className="flex flex-1 items-center justify-end gap-4">
        <UserNav />
      </div>
    </header>
  )
}
