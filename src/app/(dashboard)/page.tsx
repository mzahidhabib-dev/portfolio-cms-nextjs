import { Briefcase, MessageSquare, Code2, Globe } from "lucide-react"

export default function DashboardPage() {
  const stats = [
    { label: "Live Projects", value: "12", icon: Briefcase, color: "text-blue-600" },
    { label: "Tech Stack", value: "18", icon: Code2, color: "text-purple-600" },
    { label: "Messages", value: "3 New", icon: MessageSquare, color: "text-orange-600" },
    { label: "Site Status", value: "Online", icon: Globe, color: "text-green-600" },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Portfolio Overview</h1>
        <p className="text-muted-foreground">Welcome back, Mohammad. Here is what's happening with your portfolio.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
            <div className="text-2xl font-bold">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Recent Activity Placeholder */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h3 className="font-semibold mb-4">Recent Portfolio Updates</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0">
              <div className="flex flex-col">
                <span className="text-sm font-medium">Updated project "Famocare"</span>
                <span className="text-xs text-muted-foreground">Modified tech stack and live demo link</span>
              </div>
              <span className="text-xs text-muted-foreground">2 hours ago</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}