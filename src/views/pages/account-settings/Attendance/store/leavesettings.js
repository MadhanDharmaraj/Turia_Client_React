// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from '@src/configs/axios/axiosConfig'


export const getData = createAsyncThunk('appLeaveTypes/getData', async params => {
  const response = await axios.post(`/leavetypes/list`, params)
  return {
    params,
    data: response.data.leavetypes
  }
})

export const addLeaveTypes = createAsyncThunk('appLeaveTypes/addLeaveTypes', async (data, { dispatch, getState }) => {

  await axios.post(`/leavetypes/create`, data)
  await dispatch(getData(getState().invoiceaccount.params))
  return []

})

export const updateLeaveTypes = createAsyncThunk('appLeaveTypes/updateLeaveTypes', async (data, { dispatch, getState }) => {
  await axios.post(`/leavetypes/update`, data)
  await dispatch(getData(getState().invoiceaccount.params))
  return []
})

export const deleteLeaveTypes = createAsyncThunk('appLeaveTypes/updateLeaveTypes', async (id, { dispatch, getState }) => {
  await axios.post('/leavetypes/delete', { id })
  await dispatch(getData(getState().invoiceaccount.params))
  return id
})

export const appLeaveTypesSlice = createSlice({
  name: 'appLeaveTypes',
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

export default appLeaveTypesSlice.reducer
