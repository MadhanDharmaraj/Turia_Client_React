// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

export const getAllData = createAsyncThunk('appUsers/getAllData', async () => {
  const response = await axios.get('/api/digital-signature/list/all-data')
  return response.data
})

export const getData = createAsyncThunk('appUsers/getData', async params => {
  const response = await axios.get('/api/digital-signature/list/data', params)
  return {
    params,
    data: response.data.users,
    totalPages: response.data.total
  }
})

export const getDsc = createAsyncThunk('appUsers/getUser', async id => {
  const response = await axios.get('/api/digital-signature', { id })
  return response.data.user
})

export const addUser = createAsyncThunk('appUsers/addUser', async (user, { dispatch, getState }) => {
  await axios.post('/apps/digital-signature/add', user)
  await dispatch(getData(getState().users.params))
  await dispatch(getAllData())
  return user
})

export const deleteUser = createAsyncThunk('appUsers/deleteUser', async (id, { dispatch, getState }) => {
  await axios.delete('/apps/digital-signature/delete', { id })
  await dispatch(getData(getState().users.params))
  await dispatch(getAllData())
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
      .addCase(getAllData.fulfilled, (state, action) => {
        state.allData = action.payload
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.totalPages
      })
      .addCase(getDsc.fulfilled, (state, action) => {
        state.selectedUser = action.payload
      })
  }
})

export default appUsersSlice.reducer
