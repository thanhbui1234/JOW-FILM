import { Menu } from "lucide-react";

interface PageHeaderProps {
  title: string;
  onMenuClick: () => void;
}

export function PageHeader({ title, onMenuClick }: PageHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-6">
      <button
        onClick={onMenuClick}
        className="rounded-md p-1.5 hover:bg-accent lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>
      <h1 className="text-lg font-semibold">{title}</h1>
    </header>
  );
}
