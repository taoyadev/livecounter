import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Youtube, Users, Play, CheckCircle2 } from "lucide-react"
import Link from "next/link"

interface PlatformCardProps {
  platform: "youtube" | "tiktok" | "instagram"
  title: string
  description: string
  features: string[]
  toolsCount: number
  href: string
  status?: "stable" | "beta" | "experimental"
}

const platformIcons = {
  youtube: Youtube,
  tiktok: Play,
  instagram: Users,
}

const platformGradients = {
  youtube: "from-red-500 to-red-600",
  tiktok: "from-black to-gray-800",
  instagram: "from-purple-500 via-pink-500 to-orange-500",
}

const platformColors = {
  youtube: "text-red-500",
  tiktok: "text-black dark:text-white",
  instagram: "text-purple-500",
}

export function PlatformCard({
  platform,
  title,
  description,
  features,
  toolsCount,
  href,
  status = "stable"
}: PlatformCardProps) {
  const IconComponent = platformIcons[platform]
  const gradientClass = platformGradients[platform]
  const colorClass = platformColors[platform]

  return (
    <Card className="group relative h-full overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 backdrop-blur-sm transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 hover:scale-[1.02] hover:-translate-y-1">
      {/* Animated background gradient */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-5`} />
      </div>

      {/* Subtle border animation */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
           style={{ padding: '1px' }}>
        <div className="h-full w-full rounded-lg bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50" />
      </div>

      <CardHeader className="relative pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`relative p-3 rounded-xl bg-gradient-to-br ${gradientClass} group-hover:scale-110 transition-transform duration-300`}>
              <IconComponent className="h-6 w-6 text-white" />
              <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div>
              <CardTitle className={`text-xl font-bold ${colorClass} group-hover:text-opacity-80 transition-colors duration-300`}>
                {title}
              </CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="text-xs px-2 py-0.5">
                  {toolsCount} tools
                </Badge>
                {status !== "stable" && (
                  <Badge variant={status === "beta" ? "secondary" : "outline"} className="text-xs">
                    {status}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
        <CardDescription className="text-muted-foreground mt-3 group-hover:text-foreground/80 transition-colors duration-300">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="relative space-y-6">
        <div className="space-y-3">
          <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
            Features
          </h4>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li
                key={index}
                className="flex items-center gap-3 text-sm group/item hover:text-foreground transition-colors duration-200"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CheckCircle2 className={`h-4 w-4 ${colorClass} opacity-70 group-hover/item:opacity-100 transition-opacity duration-200`} />
                <span className="text-muted-foreground group-hover/item:text-foreground transition-colors duration-200">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <Button
          asChild
          className={`w-full relative overflow-hidden bg-gradient-to-r ${gradientClass} hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 group-hover:scale-105 border-0`}
        >
          <Link href={href} className="relative z-10">
            <span className="relative z-10">Explore {title}</span>
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
          </Link>
        </Button>
      </CardContent>

      {/* Subtle shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
        <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform skew-x-12 group-hover:left-[100%] transition-all duration-1000 ease-out" />
      </div>
    </Card>
  )
}