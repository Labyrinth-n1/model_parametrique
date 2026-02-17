import { Shield, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  userRole?: "Administrator" | "Operator" | "Auditor";
}

const Header = ({ userRole = "Administrator" }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-base font-semibold leading-tight text-foreground md:text-lg">
              Parametric Insurance Administration Platform
            </h1>
            <p className="hidden text-xs text-muted-foreground md:block">
              Automated monitoring and indemnification system
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full bg-muted px-3 py-1.5 md:flex">
            <div className="h-2 w-2 rounded-full bg-success animate-pulse-soft" />
            <span className="text-xs font-medium text-muted-foreground">Secure Session</span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div className="hidden flex-col items-start md:flex">
                  <span className="text-sm font-medium text-foreground">{userRole}</span>
                  <span className="text-xs text-muted-foreground">Active</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
