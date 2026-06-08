import { Menu, Bell } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface PageHeaderProps {
  title: string;
  onMenuClick: () => void;
}

export function PageHeader({ title, onMenuClick }: PageHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center gap-4 px-6">
        <button
          onClick={onMenuClick}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border bg-background text-muted-foreground shadow-sm transition-colors hover:bg-accent hover:text-foreground lg:hidden"
        >
          <Menu className="h-4 w-4" />
        </button>

        <div className="flex-1">
          <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
        </div>

        <div className="flex items-center gap-2">
          <button className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
            <Bell className="h-4 w-4" />
          </button>
          <Separator orientation="vertical" className="h-6" />
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
            A
          </div>
        </div>
      </div>
    </header>
  );
}
