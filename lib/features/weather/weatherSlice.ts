import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

interface WeatherState {
  data: any
  loading: boolean
  error: string | null
}

const initialState: WeatherState = {
  data: null,
  loading: false,
  error: null,
}

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async () => {
    try {
      if (!API_KEY) {
        throw new Error('OpenWeather API key is not configured')
      }

      // Get user's location
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 10000,
          maximumAge: 0,
          enableHighAccuracy: true
        })
      })

      const { latitude, longitude } = position.coords
      
      const response = await fetch(
        `${BASE_URL}/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
      )
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(
          errorData.message || `Weather API error: ${response.status} ${response.statusText}`
        )
      }

      const data = await response.json()
      return data
    } catch (error: any) {
      // Convert GeolocationPositionError to readable message
      if (error instanceof GeolocationPositionError) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            throw new Error('Please enable location access to get weather information')
          case error.POSITION_UNAVAILABLE:
            throw new Error('Location information is unavailable')
          case error.TIMEOUT:
            throw new Error('Location request timed out')
          default:
            throw new Error('Failed to get location')
        }
      }
      throw new Error(error.message || 'Failed to fetch weather data')
    }
  }
)

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.error = null
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch weather data'
      })
  },
})

export default weatherSlice.reducer

