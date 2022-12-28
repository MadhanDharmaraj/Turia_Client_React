// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from '@src/configs/axios/axiosConfig'

export const getData = createAsyncThunk('appHolidays/getData', async params => {
  const response = await axios.post(`/holidays/list`, params)
  return {
    params,
    data: response.data.holidays
  }
})
export const addHolidays = createAsyncThunk('appHolidays/addHolidays', async (data, { dispatch, getState }) => {

  await axios.post(`/holidays/create`, data)
  await dispatch(getData(getState().holidays.params))
  return []

})

export const updateHolidays = createAsyncThunk('appHolidays/updateHolidays', async (data, { dispatch, getState }) => {
  await axios.post(`/holidays/update`, data)
  await dispatch(getData(getState().holidays.params))
  return []
})

export const deleteHolidays = createAsyncThunk('appHolidays/deleteHolidays', async (id, { dispatch, getState }) => {
  await axios.post('/holidays/delete', { id })
  await dispatch(getData(getState().holidays.params))
  return id
})

export const appHolidaysSlice = createSlice({
  name: 'appHolidays',
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

export default appHolidaysSlice.reducer
