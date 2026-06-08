import { Film, Video, Clapperboard, Users, TrendingUp, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAdmin } from "@/context/admin-context";

export function DashboardPage() {
  const { state } = useAdmin();

  const stats = [
    {
      label: "Wedding Highlights",
      value: state.highlights.items.length,
      icon: Film,
      description: "Total highlight videos",
      color: "text-blue-600 bg-blue-50",
    },
    {
      label: "Wedding Reels",
      value: state.reels.items.length,
      icon: Clapperboard,
      description: "Short-form reels",
      color: "text-purple-600 bg-purple-50",
    },
    {
      label: "Traditional Films",
      value: state.films.items.length,
      icon: Video,
      description: "Long-form films",
      color: "text-amber-600 bg-amber-50",
    },
    {
      label: "Happy Couples",
      value: state.about.stats.find((s) => s.label === "Happy Couples")?.value || "0",
      icon: Users,
      description: "Satisfied clients",
      color: "text-emerald-600 bg-emerald-50",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Welcome back</h2>
        <p className="text-muted-foreground">Here's an overview of your content.</p>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <div className={`rounded-lg p-2 ${stat.color}`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className="mt-1 text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick info */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-base">Content Overview</CardTitle>
            </div>
            <CardDescription>Manage your website sections from the sidebar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2">
                <span className="text-sm">Total videos</span>
                <span className="text-sm font-semibold">
                  {state.highlights.items.length + state.reels.items.length + state.films.items.length}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2">
                <span className="text-sm">Years Experience</span>
                <span className="text-sm font-semibold">
                  {state.about.stats.find((s) => s.label === "Years Experience")?.value || "N/A"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </div>
            <CardDescription>Common tasks you can perform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2">
                <span className="text-sm">Add new highlight video</span>
                <span className="text-xs text-muted-foreground">Wedding Highlights →</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2">
                <span className="text-sm">Update footer info</span>
                <span className="text-xs text-muted-foreground">Footer →</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
