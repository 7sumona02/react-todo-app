"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchWeather } from "@/lib/features/weather/weatherSlice"
import type { RootState } from "@/lib/store"
import { Card, CardContent } from "@/components/ui/card"
import { Cloud, CloudRain, Sun, Loader2, CloudSnow, CloudLightning, Wind } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function WeatherWidget() {
  const dispatch = useDispatch()
  const { data, loading, error } = useSelector((state: RootState) => state.weather)

  useEffect(() => {
    dispatch(fetchWeather())
  }, [dispatch])

  const handleRefresh = () => {
    dispatch(fetchWeather())
  }

  const getWeatherIcon = () => {
    if (!data) return <Cloud className="h-5 w-5" />

    const condition = data.weather[0].main.toLowerCase()

    if (condition.includes("rain") || condition.includes("drizzle")) {
      return <CloudRain className="h-5 w-5" />
    } else if (condition.includes("clear")) {
      return <Sun className="h-5 w-5" />
    } else if (condition.includes("snow")) {
      return <CloudSnow className="h-5 w-5" />
    } else if (condition.includes("thunder")) {
      return <CloudLightning className="h-5 w-5" />
    } else if (condition.includes("wind") || condition.includes("gust")) {
      return <Wind className="h-5 w-5" />
    } else {
      return <Cloud className="h-5 w-5" />
    }
  }

  if (loading) {
    return (
      <Card className="w-full sm:w-auto">
        <CardContent className="p-3 flex items-center justify-center">
          <Loader2 className="h-5 w-5 animate-spin mr-2" />
          <span>Loading weather...</span>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="w-full sm:w-auto">
        <CardContent className="p-3 flex items-center justify-between">
          <div className="flex items-center">
            <Cloud className="h-5 w-5 mr-2" />
            <span>Weather unavailable</span>
          </div>
          <Button size="sm" variant="ghost" onClick={handleRefresh}>
            Retry
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (!data) return null

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card className="w-full sm:w-auto cursor-pointer" onClick={handleRefresh}>
            <CardContent className="p-3 flex items-center">
              {getWeatherIcon()}
              <div className="ml-2">
                <span className="font-medium">{Math.round(data.main.temp)}°C</span>
                <span className="ml-1 text-muted-foreground">{data.name}</span>
              </div>
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent>
          <div className="space-y-1">
            <p className="font-medium">{data.weather[0].description}</p>
            <p>Feels like: {Math.round(data.main.feels_like)}°C</p>
            <p>Humidity: {data.main.humidity}%</p>
            {data.wind && <p>Wind: {Math.round(data.wind.speed * 3.6)} km/h</p>}
            <p className="text-xs text-muted-foreground">Click to refresh</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

