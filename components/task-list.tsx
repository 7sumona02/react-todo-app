"use client"

import { useSelector } from "react-redux"
import type { RootState } from "@/lib/store"
import TaskItem from "@/components/task-item"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import type { Task } from "@/lib/features/tasks/tasksSlice"

export default function TaskList() {
  const { tasks } = useSelector((state: RootState) => state.tasks)
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all")

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.done
    if (filter === "completed") return task.done
    return true
  })

  // Sort tasks by priority (high -> medium -> low) and then by creation date (newest first)
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 }
    const priorityA = priorityOrder[a.priority as keyof typeof priorityOrder]
    const priorityB = priorityOrder[b.priority as keyof typeof priorityOrder]

    if (priorityA !== priorityB) {
      return priorityA - priorityB
    }

    // If priorities are the same, sort by creation date (newest first)
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full" onValueChange={(value) => setFilter(value as any)}>
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            {renderTaskList(sortedTasks)}
          </TabsContent>

          <TabsContent value="active" className="mt-0">
            {renderTaskList(sortedTasks)}
          </TabsContent>

          <TabsContent value="completed" className="mt-0">
            {renderTaskList(sortedTasks)}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function renderTaskList(tasks: Task[]) {
  if (tasks.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No tasks found. Add some tasks to get started!</div>
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  )
}

