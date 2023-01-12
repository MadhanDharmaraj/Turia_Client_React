// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from '@src/configs/axios/axiosConfig'

export const getData = createAsyncThunk('appAttendance/getData', async params => {
  const response = await axios.post('/employeeattendances/list', params)
  return {
    params,
    data: response.data.employeeattendances.employeeattendances,
    totalPages: response.data.employeeattendances.total
  }
})

export const getMonthlySummaries = createAsyncThunk('appAttendance/getMonthlySummaries', async params => {
  const response = await axios.post('/employeeattendances/ ', params)
  return {
    params,
    data: response.data.employeeattendances.employeeattendances,
    totalPages: response.data.employeeattendances.total
  }
})

export const appAttendanceSlice = createSlice({
  name: 'appAttendance',
  initialState: {
    data: [],
    monthlySummaries: [],
    total: 1,
    params: {}
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getData.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.totalPages
      })
      .addCase(getMonthlySummaries.fulfilled, (state, action) => {
        state.monthlySummaries = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.totalPages
      })
  }
})

export default appAttendanceSlice.reducer
