"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateTask, deleteTask, type Task } from "@/lib/features/tasks/tasksSlice"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Trash, Edit, Save, X, CloudSun } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { RootState } from "@/lib/store"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface TaskItemProps {
  task: Task
}

type Priority = "low" | "medium" | "high"
type Category = "general" | "work" | "personal" | "outdoor" | "shopping"

export default function TaskItem({ task }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(task.text)
  const [editPriority, setEditPriority] = useState<Priority>(task.priority as Priority)
  const [editCategory, setEditCategory] = useState<Category>((task.category || "general") as Category)
  const dispatch = useDispatch()
  const weatherData = useSelector((state: RootState) => state.weather.data)

  const handleToggle = () => {
    dispatch(updateTask({ ...task, done: !task.done }))
  }

  const handleEdit = () => {
    setIsEditing(true)
    setEditText(task.text)
    setEditPriority(task.priority as Priority)
    setEditCategory((task.category || "general") as Category)
  }

  const handleSave = () => {
    if (editText.trim()) {
      dispatch(
        updateTask({
          ...task,
          text: editText.trim(),
          priority: editPriority,
          category: editCategory,
          isOutdoor: editCategory === "outdoor",
        }),
      )
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditText(task.text)
    setEditPriority(task.priority as Priority)
    setEditCategory((task.category || "general") as Category)
  }

  const handleDelete = () => {
    dispatch(deleteTask(task.id))
  }

  const priorityColors = {
    low: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  }

  const categoryColors = {
    general: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
    work: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    personal: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    outdoor: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300",
    shopping: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
  }

  return (
    <div className={cn("flex flex-col p-3 rounded-md border", task.done ? "bg-muted/50" : "bg-card")}>
      {isEditing ? (
        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor={`edit-task-${task.id}`}>Task Description</Label>
            <Input
              id={`edit-task-${task.id}`}
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor={`edit-priority-${task.id}`}>Priority</Label>
              <Select value={editPriority} onValueChange={(value) => setEditPriority(value as Priority)}>
                <SelectTrigger id={`edit-priority-${task.id}`}>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`edit-category-${task.id}`}>Category</Label>
              <Select value={editCategory} onValueChange={(value) => setEditCategory(value as Category)}>
                <SelectTrigger id={`edit-category-${task.id}`}>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="work">Work</SelectItem>
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="outdoor">
                    <div className="flex items-center">
                      <CloudSun className="mr-2 h-4 w-4" />
                      Outdoor Activity
                    </div>
                  </SelectItem>
                  <SelectItem value="shopping">Shopping</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-2">
            <Button size="sm" variant="outline" onClick={handleCancel}>
              <X className="h-4 w-4 mr-1" /> Cancel
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-1" /> Save
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-2">
          <Checkbox checked={task.done} onCheckedChange={handleToggle} className="mt-1" />

          <div className="flex-1 min-w-0">
            <div className="flex flex-col gap-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className={cn("break-words", task.done && "line-through text-muted-foreground")}>
                  {task.text}
                </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  <Badge className={cn(priorityColors[task.priority as keyof typeof priorityColors])}>
                    {task.priority}
                  </Badge>

                  {task.category && (
                    <Badge className={cn(categoryColors[task.category as keyof typeof categoryColors])}>
                      {task.category}
                    </Badge>
                  )}
                </div>
              </div>

              <span className="text-xs text-muted-foreground">{new Date(task.createdAt).toLocaleString()}</span>

              {/* Weather information for outdoor tasks */}
              {task.isOutdoor && weatherData && (
                <div className="mt-2 p-2 bg-muted/50 rounded-md flex items-center text-sm">
                  <CloudSun className="h-4 w-4 mr-2" />
                  <span>
                    Current weather: {Math.round(weatherData.main.temp)}°C, {weatherData.weather[0].description}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-1">
            <Button size="icon" variant="ghost" onClick={handleEdit} title="Edit" disabled={task.done}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" onClick={handleDelete} title="Delete">
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

