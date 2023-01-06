// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from '@src/configs/axios/axiosConfig'
import { orgUserId } from '@src/helper/sassHelper'
const userId = orgUserId()

export const getData = createAsyncThunk('appInvoiceSetting/getData', async params => {
  const response = await axios.post(`/transactionaccounts/list`, params)
  return {
    params,
    data: response.data.exemptionreason
  }
})
export const addExemption = createAsyncThunk('appInvoiceSetting/addExemption', async (data, { dispatch, getState }) => {

  await axios.post(`/exemptionreasons/create`, data)
  await dispatch(getData(getState().invoiceaccount.params))
  return []

})

export const updateExemption = createAsyncThunk('appInvoiceSetting/updateExemption', async (data, { dispatch, getState }) => {
  await axios.post(`/exemptionreasons/update`, data)
  await dispatch(getData(getState().invoiceaccount.params))
  return []
})

export const deleteExemption = createAsyncThunk('appInvoiceSetting/deleteExemption', async (id, { dispatch, getState }) => {
  await axios.post('/exemptionreasons/delete', { id, updatedBy: userId })
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
