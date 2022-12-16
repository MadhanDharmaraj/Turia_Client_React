// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from '@src/configs/axios/axiosConfig'


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

export const addClient = createAsyncThunk('appClients/addClient', async (client, { rejectWithValue }) => {
  try {
    const response = await axios.post(`/clients/create`, client)
    return { client: response.data.clients }
  } catch (ex) {
    return rejectWithValue(getExceptionPayload(ex))
  }
})

export const updateClient = createAsyncThunk('appClients/updateClient', async (client, { }) => {
  const response = await axios.post(`/clients/update`, client)
  return { client: response.data.clients }
})

export const addContactInfo = createAsyncThunk('appClients/addContactInfo', async (rows, { }) => {
  const response = await axios.post(`/contactinformation/create`, rows)
  return { clientInfos: response.data.clients }
})

export const updateContactInfo = createAsyncThunk('appClients/updateContactInfo', async (rows, { }) => {
  const response = await axios.post(`/contactinformation/update`, rows)
  return { clientInfos: response.data.clients }
})

export const getConatctInfo = createAsyncThunk('appClients/getClientInfo', async (contactid) => {
  const response = await axios.post(`/contactinformation/list`, { contactid })
  return { clientInfos: response.data.contactinformation }
})

export const deleteClient = createAsyncThunk('appClients/deleteClient', async (id, { dispatch, getState }) => {
  await axios.post('/clients/delete', { id })
  await dispatch(getData(getState().client.params))
  return id
})

export const deleteContactInfo = createAsyncThunk('appClients/deleteContactInfo', async (id, {}) => {
  await axios.post('/contactinformation/delete', { id })
  return null
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
    clientId: null,
    clientInformations: []
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getData.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.totalPages
      })
      .addCase(getConatctInfo.fulfilled, (state, action) => {
        state.clientInformations = action.payload.clientInfos
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
