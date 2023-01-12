// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from '@src/configs/axios/axiosConfig'

export const invitationsList = createAsyncThunk('appUsers/invitationsList', async params => {
  const response = await axios.post('/invitations/list', params)
  return {
    params,
    data: response.data.invitations,
    totalPages: response.data.total
  }
})

export const getInvitation = createAsyncThunk('appUsers/getInvitation', async id => {
  const response = await axios.post('/invitations/get', { id })
  return response.data.invitation
})

export const inviteMail = createAsyncThunk('appUsers/inviteMail', async id => {
  await axios.post('/invitations/invitationmail', { id })
  return ''
})

export const userList = createAsyncThunk('appUsers/userList', async params => {
  const response = await axios.post('/organizationusers/list', params)
  return {
    params,
    data: response.data.organizationusers,
    totalPages: response.data.total
  }
})

export const getUser = createAsyncThunk('appUsers/getUser', async id => {
  const response = await axios.post('/organizationusers/get', { id })
  return response.data.user
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

export const appUsersSlice = createSlice({
  name: 'appUsers',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    selectedUser: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(invitationsList.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.totalPages
      })
      .addCase(userList.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.totalPages
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.selectedUser = action.payload
      })
  }
})

export default appUsersSlice.reducer
