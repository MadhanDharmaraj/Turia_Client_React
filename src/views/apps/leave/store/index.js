// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from '@src/configs/axios/axiosConfig'

export const leaveList = createAsyncThunk('appUsers/leaveList', async (params, { }) => {
  const response = await axios.post('/employeesleaves/list', params)
  return  response.data.employeesleaves
})

export const assignLeave = createAsyncThunk('appUsers/assignLeave', async (data, { dispatch }) => {
  await axios.post('/employeesleaves/create', data)
  await dispatch(leaveList())
  return id
})

export const getUser = createAsyncThunk('appEmployeeLeave/getUser', async id => {
  const response = await axios.post('/api/users/user', { id })
  return response.data.user
})

export const addUser = createAsyncThunk('appEmployeeLeave/addUser', async (user, { dispatch, getState }) => {
  const res = await axios.post('/invitations/create', user)
  await dispatch(getData(getState().team.params))
  return res.data.invitation
})

export const deleteUser = createAsyncThunk('appEmployeeLeave/deleteUser', async (id, { dispatch, getState }) => {
  await axios.post('/apps/users/delete', { id })
  await dispatch(getData(getState().team.params))
  return id
})

export const appEmployeeLeaveSlice = createSlice({
  name: 'appEmployeeLeave',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    employeeLeaves : [],
    selectedUser: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(leaveList.fulfilled, (state, action) => {
        state.employeeLeaves = action.payload
        state.params = action.payload.params
        state.total = action.payload.totalPages
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.selectedUser = action.payload
      })
  }
})

export default appEmployeeLeaveSlice.reducer
