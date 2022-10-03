// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

export const getAllData = createAsyncThunk('appClients/getAllData', async () => {
  const response = await axios.get('/api/client/list/all-data')
  return response.data
})

export const getData = createAsyncThunk('appUsers/getData', async params => {
  const response = await axios.get('/api/client/list/data', params)
  return {
    params,
    data: response.data.clients,
    totalPages: response.data.total
  }
})

export const getClient = createAsyncThunk('appUsers/getUser', async id => {
  const response = await axios.get('/api/client', { id })
  return response.data.client
})

export const addClient = createAsyncThunk('appClients/addUser', async (client, { dispatch, getState }) => {
  await axios.post('/apps/clients/add-client', client)
  await dispatch(getData(getState().clients.params))
  await dispatch(getAllData())
  return client
})

export const deleteClient = createAsyncThunk('appClients/deleteUser', async (id, { dispatch, getState }) => {
  await axios.delete('/apps/clients/delete', { id })
  await dispatch(getData(getState().clients.params))
  await dispatch(getAllData())
  return id
})

export const appUsersSlice = createSlice({
  name: 'appClients',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    selectedClient: null
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
      .addCase(getUser.fulfilled, (state, action) => {
        console.log(action)
        state.selectedClient = action.payload
      })
  }
})

export default appUsersSlice.reducer
