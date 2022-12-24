// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from '@src/configs/axios/axiosConfig'

export const getData = createAsyncThunk('appServices/getData', async params => {
  const response = await axios.post('/services/list', params)
  return {
    params,
    data: response.data.services.services,
    totalPages: response.data.services.total
  }
})

export const getService = createAsyncThunk('appServices/getService', async id => {
  const response = await axios.post('/services/get', { id })
  return response.data.services
})

export const addService = createAsyncThunk('appServices/addService', async (service, { }) => {
  const response = await axios.post('/services/create', service)
  return response.data.services
})

export const updateService = createAsyncThunk('appServices/updateService', async (service, { }) => {
  const response = await axios.post(`/services/update`, service)
  return { service: response.data.services }
})

export const deleteService = createAsyncThunk('appServices/deleteService', async (id, { dispatch, getState }) => {
  await axios.post('/services/delete', { id })
  await dispatch(getData(getState().users.params))
  return id
})

export const updateStatus = createAsyncThunk('appServices/updateStatus', async (data, { dispatch, getState }) => {
  await axios.post(`/services/statusupdate`, data)
  console.log(getState().service)
  await dispatch(getData(getState().Service.service))
  return ''
})

export const addWokflow = createAsyncThunk('appServices/addWokflow', async (rows, { }) => {
  const response = await axios.post('/workflows/create', rows)
  return response.data.workflows
})

export const listWokflow = createAsyncThunk('appServices/listWokflow', async ({ id }, { }) => {
  const response = await axios.post('/workflows/list', { serviceId : id })
  return response.data.workflows
})

export const appServicesSlice = createSlice({
  name: 'appServices',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    selectedService: null,
    workFlowLists: []
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getData.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.totalPages
      })
      .addCase(getService.fulfilled, (state, action) => {
        state.selectedService = action.payload
      })
      .addCase(addWokflow.fulfilled, (state, action) => {
        state.workFlowLists = action.payload
      })
      .addCase(listWokflow.fulfilled, (state, action) => {
        state.workFlowLists = action.payload
      })
  }
})

export default appServicesSlice.reducer
