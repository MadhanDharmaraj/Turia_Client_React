// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from '../../../../configs/axios/axiosConfig'

export const getData = createAsyncThunk('appUsers/getData', async params => {
  const response = await axios.post(`/clients/list`, params)
  return {
    params,
    data: response.data.clients.clients,
    totalPages: response.data.clients.total
  }
})

export const getClient = createAsyncThunk('appClients/getClient', async id => {
  const response = await axios.post('/clients/get', { id })
  return response.data.clients
})

export const addClient = createAsyncThunk('appClients/addClient', async (client, { }) => {
  const response = await axios.post(`/clients/create`, client)
  return { client: response.data.clients }
})

export const updateClient = createAsyncThunk('appClients/addClient', async (client, { }) => {
  const response = await axios.post(`/clients/update`, client)
  return { client: response.data.clients }
})

export const addContactInfo = createAsyncThunk('appClients/addClientInfo', async (rows, { }) => {
  const response = await axios.post(`/contactinformation/create`, rows)
  return { clientInfos: response.data.clients }
})

export const getConatctInfo = createAsyncThunk('appClients/getClientInfo', async (id) => {
  const response = await axios.post(`/conatctinformation/list`, { id })
  return { clientInfos: response.data.clients }
})

export const deleteClient = createAsyncThunk('appClients/deleteClient', async (id, { dispatch, getState }) => {
  await axios.post('/clients/delete', { id })
  await dispatch(getData(getState().client.params))
  return id
})

export const updateStatus = createAsyncThunk('appClients/updateStatus', async (data, { dispatch, getState }) => {
  await axios.post(`/clients/statusupdate`, data)
  console.log(getState().client)
  await dispatch(getData(getState().client.params))
  return ''
})


export const appClientsSlice = createSlice({
  name: 'appClients',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    selectedClient: null,
    clientId: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getData.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.totalPages
      })
      .addCase(addClient.fulfilled, (state, action) => {
        state.clientId = action.payload.client.id
      })
      .addCase(getClient.fulfilled, (state, action) => {
        state.selectedClient = action.payload
      })
  }
})

export default appClientsSlice.reducer
