import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Task {
  id: string
  text: string
  done: boolean
  priority: string
  category?: string
  isOutdoor?: boolean
  createdAt: string
}

interface TasksState {
  tasks: Task[]
}

// Load tasks from localStorage
const getTasksFromStorage = (): Task[] => {
  if (typeof window === "undefined") return []

  const storedTasks = localStorage.getItem("tasks")
  if (storedTasks) {
    try {
      return JSON.parse(storedTasks)
    } catch (e) {
      return []
    }
  }
  return []
}

const initialState: TasksState = {
  tasks: [],
}

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    loadTasks: (state) => {
      state.tasks = getTasksFromStorage()
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload)

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("tasks", JSON.stringify(state.tasks))
      }
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id)
      if (index !== -1) {
        state.tasks[index] = action.payload

        // Save to localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("tasks", JSON.stringify(state.tasks))
        }
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload)

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("tasks", JSON.stringify(state.tasks))
      }
    },
  },
})

export const { loadTasks, addTask, updateTask, deleteTask } = tasksSlice.actions
export default tasksSlice.reducer

