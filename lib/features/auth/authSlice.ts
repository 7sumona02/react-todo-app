import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface User {
  id: string
  name: string
  email: string
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  loading: boolean
}

// Check if user is already logged in from localStorage
const getUserFromStorage = (): User | null => {
  if (typeof window === "undefined") return null

  const storedUser = localStorage.getItem("user")
  if (storedUser) {
    try {
      return JSON.parse(storedUser)
    } catch (e) {
      return null
    }
  }
  return null
}

const initialState: AuthState = {
  isAuthenticated: typeof window !== "undefined" ? !!localStorage.getItem("user") : false,
  user: getUserFromStorage(),
  loading: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true
      state.user = action.payload
      state.loading = false

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(action.payload))
      }
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null

      // Remove from localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("user")
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
  },
})

export const { login, logout, setLoading } = authSlice.actions
export default authSlice.reducer

