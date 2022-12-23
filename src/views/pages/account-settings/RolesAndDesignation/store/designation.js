// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from '@src/configs/axios/axiosConfig'

export const getData = createAsyncThunk('appDesignation/getData', async params => {
  const response = await axios.post(`/designations/list`, params)
  return {
    params,
    data: response.data.designations
  }
})
export const addDesignation = createAsyncThunk('appDesignation/addDesignation', async (data, { dispatch, getState }) => {

  await axios.post(`/designations/create`, data)
  await dispatch(getData(getState().invoiceaccount.params))
  return []

})

export const updateDesignation = createAsyncThunk('appDesignation/updateDesignation', async (data, { dispatch, getState }) => {
  await axios.post(`/designations/update`, data)
  await dispatch(getData(getState().invoiceaccount.params))
  return []
})

export const deleteDesignation = createAsyncThunk('appDesignation/deleteDesignation', async (id, { dispatch, getState }) => {
  await axios.post('/designations/delete', { id })
  await dispatch(getData(getState().invoiceaccount.params))
  return id
})

export const appAccountSlice = createSlice({
  name: 'appDesignation',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getData.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
      })

  }
})

export default appAccountSlice.reducer
