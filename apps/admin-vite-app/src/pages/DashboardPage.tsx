import { Film, Video, Clapperboard, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdmin } from "@/context/admin-context";

export function DashboardPage() {
  const { state } = useAdmin();

  const stats = [
    {
      label: "Wedding Highlights",
      value: state.highlights.items.length,
      icon: Film,
    },
    {
      label: "Wedding Reels",
      value: state.reels.items.length,
      icon: Clapperboard,
    },
    {
      label: "Traditional Films",
      value: state.films.items.length,
      icon: Video,
    },
    {
      label: "Happy Couples",
      value: state.about.stats.find((s) => s.label === "Happy Couples")?.value || "0",
      icon: Users,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
