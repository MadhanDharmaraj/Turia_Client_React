// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

export const getAllData = createAsyncThunk('appUsers/getAllData', async () => {
  const response = await axios.get('/api/service/list/all-data')
  return response.data
})

export const getData = createAsyncThunk('appUsers/getData', async params => {
  const response = await axios.get('/api/service/list/data', params)
  return {
    params,
    data: response.data.services,
    totalPages: response.data.total
  }
})

export const getService = createAsyncThunk('appUsers/getService', async id => {
  const response = await axios.get('/api/service', { id })
  return response.data.service
})

export const addUser = createAsyncThunk('appUsers/addUser', async (service, { dispatch, getState }) => {
  await axios.post('/apps/service/add-service', service)
  await dispatch(getData(getState().users.params))
  await dispatch(getAllData())
  return service
})

export const deleteUser = createAsyncThunk('appUsers/deleteService', async (id, { dispatch, getState }) => {
  await axios.delete('/apps/service/delete', { id })
  await dispatch(getData(getState().users.params))
  await dispatch(getAllData())
  return id
})

export const appServicesSlice = createSlice({
  name: 'appServices',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    selectedService: null
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
      .addCase(getService.fulfilled, (state, action) => {
        state.selectedService = action.payload
      })
  }
})

export default appServicesSlice.reducer
