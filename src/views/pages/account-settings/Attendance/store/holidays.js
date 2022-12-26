// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from '@src/configs/axios/axiosConfig'


export const getData = createAsyncThunk('appInvoiceSetting/getData', async params => {
  const response = await axios.post(`/transactionaccounts/list`, params)
  return {
    params,
    data: response.data.transactionaccounts
  }
})

export const addExemption = createAsyncThunk('appInvoiceSetting/addAccount', async (data, { dispatch, getState }) => {

  await axios.post(`/transactionaccounts/create`, data)
  await dispatch(getData(getState().invoiceaccount.params))
  return []

})

export const updateExemption = createAsyncThunk('appInvoiceSetting/updateAccount', async (data, { dispatch, getState }) => {
  await axios.post(`/transactionaccounts/update`, data)
  await dispatch(getData(getState().invoiceaccount.params))
  return []
})

export const deleteAccount = createAsyncThunk('appInvoiceSetting/updateAccount', async (id, { dispatch, getState }) => {
  await axios.post('/transactionaccounts/delete', { id })
  await dispatch(getData(getState().invoiceaccount.params))
  return id
})

export const appInvoiceAccountSlice = createSlice({
  name: 'appInvoiceSetting',
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

export default appInvoiceAccountSlice.reducer
