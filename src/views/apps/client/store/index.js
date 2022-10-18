// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

const api_url = process.env.REACT_APP_API_URL

export const getData = createAsyncThunk('appUsers/getData', async params => {
  const response = await axios.post(`${api_url}/clients/list`, params)
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
  await axios.post(`${api_url}/clients/create`, client)
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

export const appServicesSlice = createSlice({
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
      .addCase(getData.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.totalPages
      })
      .addCase(getClient.fulfilled, (state, action) => {
        state.selectedClient = action.payload
      })
  }
})

export default appServicesSlice.reducer
