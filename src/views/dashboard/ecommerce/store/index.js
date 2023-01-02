// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from '@src/configs/axios/axiosConfig'

export const punchIn = createAsyncThunk('appDashboard/punchIn', async (data, { }) => {
  const response = await axios.post('employeeattendances/punchin', data)
  return response.data.employeeattendances
})

export const punchOut = createAsyncThunk('appDashboard/punchOut', async (data, { }) => {
  const response = await axios.post('employeeattendances/punchout', data)
  return response.data.employeeattendances
})

export const getAttendance = createAsyncThunk('appDashboard/getAttendance', async (data, { }) => {
  const response = await axios.post('employeeattendances/flagget', data)
  return response.data.employeeattendances
})

export const appDashboardSlice = createSlice({
  name: 'appInvoice',
  initialState: {
    data: {}
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(punchIn.fulfilled, (state, action) => {
      state.data = action.payload
    })
    builder.addCase(punchOut.fulfilled, (state, action) => {
      state.data = action.payload
    })
    builder.addCase(getAttendance.fulfilled, (state, action) => {
      state.data = action.payload
    })

  }
})

export default appDashboardSlice.reducer
