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
    <Card className="group relative h-full overflow-hidden border-0 bg-gradient-to-br from-white via-white to-gray-50/80 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700/80 backdrop-blur-md transition-all duration-700 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.05] hover:-translate-y-3 glass-card">
      {/* Animated background gradient */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-10 animate-gradient`} />
      </div>

      {/* Subtle border animation */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-purple-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
           style={{ padding: '1px' }}>
        <div className="h-full w-full rounded-xl bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-gray-900/90 dark:to-gray-800/90 backdrop-blur-sm" />
      </div>

      <CardHeader className="relative pb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`relative p-4 rounded-2xl bg-gradient-to-br ${gradientClass} group-hover:scale-125 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-xl`}>
              <IconComponent className="h-7 w-7 text-white drop-shadow-sm" />
              <div className="absolute inset-0 rounded-2xl bg-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
            </div>
            <div>
              <CardTitle className={`text-xl font-bold ${colorClass} group-hover:text-opacity-90 transition-all duration-300 tracking-tight`}>
                {title}
              </CardTitle>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary" className="text-xs px-3 py-1 font-semibold">
                  {toolsCount} tools
                </Badge>
                {status !== "stable" && (
                  <Badge variant={status === "beta" ? "secondary" : "outline"} className="text-xs font-semibold">
                    {status}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
        <CardDescription className="text-muted-foreground/80 mt-4 group-hover:text-foreground/90 transition-colors duration-300 leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="relative space-y-8">
        <div className="space-y-4">
          <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground/80 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
            Features
          </h4>
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li
                key={index}
                className="flex items-center gap-3 text-sm group/item hover:text-foreground transition-all duration-300 hover:translate-x-1"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CheckCircle2 className={`h-4 w-4 ${colorClass} opacity-70 group-hover/item:opacity-100 group-hover/item:scale-110 transition-all duration-300`} />
                <span className="text-muted-foreground/80 group-hover/item:text-foreground transition-colors duration-300 font-medium">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <Button
          asChild
          className={`w-full relative overflow-hidden bg-gradient-to-r ${gradientClass} hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-500 group-hover:scale-110 border-0 font-bold text-base py-3 h-12`}
        >
          <Link href={href} className="relative z-10">
            <span className="relative z-10 flex items-center gap-2">
              Explore {title}
              <div className="w-2 h-2 rounded-full bg-white/80 group-hover:scale-150 transition-transform duration-300"></div>
            </span>
            <div className="absolute inset-0 bg-white/30 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
          </Link>
        </Button>
      </CardContent>

      {/* Subtle shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1500">
        <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12 group-hover:left-[100%] transition-all duration-1500 ease-out" />
      </div>
      
      {/* Additional glow effect */}
      <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-lg -z-10"></div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-60 animate-float"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </Card>
  )
}