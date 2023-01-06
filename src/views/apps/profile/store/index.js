// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from '@src/configs/axios/axiosConfig'

export const getInvitations = createAsyncThunk('appUsers/getInvitations', async params => {
  const response = await axios.post('/invitations/list', params)
  return {
    params,
    data: response.data.invitations,
    totalPages: response.data.total
  }
})

export const inviteMail = createAsyncThunk('appUsers/inviteMail', async id => {
  await axios.post('/invitations/invitationmail', { id })
  return ''
})

export const getUser = createAsyncThunk('appUsers/getUser', async id => {
  const response = await axios.post('/organizationusers/get', { id })
  return response.data.organizationusers
})

export const addUser = createAsyncThunk('appUsers/addUser', async (user, { dispatch, getState }) => {
  const res = await axios.post('/invitations/create', user)
  await dispatch(getData(getState().team.params))
  return res.data.invitation
})

export const deleteUser = createAsyncThunk('appUsers/deleteUser', async (id, { dispatch, getState }) => {
  await axios.delete('/apps/users/delete', { id })
  await dispatch(getData(getState().team.params))
  return id
})

export const attendaceList = createAsyncThunk('appUsers/attendaceList', async (params, { }) => {
  const response = await axios.post('/employeeattendances/list', params)
  return {
    params,
    data: response.data.employeeattendances.employeeattendances,
    totalPages: response.data.employeeattendances.total
  }
})

export const leaveList = createAsyncThunk('appUsers/leaveList', async (params, { }) => {
  const response = await axios.post('/employeesleaves/list', params)
  return response.data.employeesleaves
})

export const applyLeave = createAsyncThunk('appUsers/applyLeave', async (data, { dispatch }) => {
  await axios.post('/employeesleaves/create', data)
  await dispatch(leaveList())
  return id
})

export const appUsersSlice = createSlice({
  name: 'appUsers',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    selectedUser: null,
    employeeLeaves: [],
    employeeAttendances: []
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getInvitations.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.totalPages
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.selectedUser = action.payload
      })
      .addCase(leaveList.fulfilled, (state, action) => {
        state.employeeLeaves = action.payload
      })
      .addCase(attendaceList.fulfilled, (state, action) => {
        state.employeeAttendances = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.totalPages
      })
  }
})

export default appUsersSlice.reducer
