// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'


export const getData = createAsyncThunk('appDigitalSignature/getData', async params => {
  const response = await axios.get('/digital-signature/list', params)
  return {
    params,
    data: response.data.digitalsignatures,
    totalPages: response.data.total
  }
})

export const getDsc = createAsyncThunk('appDigitalSignature/getUser', async id => {
  const response = await axios.get('/api/digital-signature', { id })
  return response.data.user
})

export const addUser = createAsyncThunk('appDigitalSignature/addUser', async (user, { dispatch, getState }) => {
  await axios.post('/apps/digital-signature/add', user)
  await dispatch(getData(getState().users.params))
  await dispatch(getAllData())
  return user
})

export const deleteUser = createAsyncThunk('appDigitalSignature/deleteUser', async (id, { dispatch, getState }) => {
  await axios.delete('/apps/digital-signature/delete', { id })
  await dispatch(getData(getState().users.params))
  await dispatch(getAllData())
  return id
})

export const appDigitalSignatureSlice = createSlice({
  name: 'appDigitalSignature',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    selectedDigitalSignature: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getData.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.totalPages
      })
      .addCase(getDsc.fulfilled, (state, action) => {
        state.selectedDigitalSignature = action.payload
      })
  }
})

export default appDigitalSignatureSlice.reducer
