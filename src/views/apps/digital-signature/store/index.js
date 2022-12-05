// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from '@src/configs/axios/axiosConfig'

export const getData = createAsyncThunk('appDigitalSignature/getData', async params => {
  const response = await axios.post('/digitalsignature/list', params)
  return {
    params,
    data: response.data.digitalsignature,
    totalPages: response.data.total
  }
})

export const getDsc = createAsyncThunk('appDigitalSignature/getDsc', async id => {
  const response = await axios.post('/digitalsignature/get', { id })
  return response.data.digitalsignature
})

export const DSCList = createAsyncThunk('appDigitalSignature/DSCList', async (contactid) => {
  const response = await axios.post(`/digitalsignature/listbyclient`, { contactid })
  return { data: response.data.digitalsignature }
})

export const addDsc = createAsyncThunk('appDigitalSignature/addDsc', async (dsc, { dispatch, getState }) => {
  await axios.post('/digitalsignature/create', dsc)
  await dispatch(getData(getState().digitalsignature.params))
  await dispatch(getAllData())
  return user
})

export const updateDsc = createAsyncThunk('appDigitalSignature/updateDsc', async (dsc, { dispatch, getState }) => {
  await axios.post('/digitalsignature/update', dsc)
  await dispatch(getData(getState().digitalsignature.params))
  await dispatch(getAllData())
  return user
})


export const deleteDigitalSignature = createAsyncThunk('appDigitalSignature/deleteDigitalSignature', async (id, { dispatch, getState }) => {
  await axios.post('/digitalsignature/delete', { id })

  await dispatch(getData(getState().digitalsignature.params))
  await dispatch(getAllData())
  return null
})

export const appDigitalSignatureSlice = createSlice({
  name: 'appDigitalSignature',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    selectedDigitalSignature: null,
    DSCLists: []
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getData.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.totalPages
      })
      .addCase(DSCList.fulfilled, (state, action) => {
        state.DSCLists = action.payload.data
      })
      .addCase(getDsc.fulfilled, (state, action) => {
        state.selectedDigitalSignature = action.payload
      })
  }
})

export default appDigitalSignatureSlice.reducer
