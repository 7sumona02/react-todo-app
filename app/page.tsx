"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import type { RootState } from "@/lib/store"
import TaskInput from "@/components/task-input"
import TaskList from "@/components/task-list"
import WeatherWidget from "@/components/weather-widget"
import { Button } from "@/components/ui/button"
import { logout } from "@/lib/features/auth/authSlice"
import { loadTasks } from "@/lib/features/tasks/tasksSlice"
import ThemeToggle from "@/components/theme-toggle"

export default function Home() {
  const dispatch = useDispatch()
  const router = useRouter()
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    } else {
      dispatch(loadTasks())
    }
  }, [isAuthenticated, router, dispatch])

  const handleLogout = () => {
    dispatch(logout())
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Task Manager</h1>
          <p className="text-muted-foreground">Welcome back, {user?.name}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <WeatherWidget />
          <ThemeToggle />
          <Button onClick={handleLogout} variant="outline" className="w-full sm:w-auto">
            Logout
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <TaskInput />
        <TaskList />
      </div>
    </div>
  )
}

