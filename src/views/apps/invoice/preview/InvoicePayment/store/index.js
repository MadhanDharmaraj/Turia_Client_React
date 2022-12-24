// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from '@src/configs/axios/axiosConfig'

export const getData = createAsyncThunk('appInvociePayments/getData', async params => {
  const response = await axios.post('/taskinvoicepayments/list', params)
  return {
    data: response.data.taskinvoicepayments
  }
})

export const addInvociePayments = createAsyncThunk('appInvociePayments/addInvociePayments', async (invoice, { rejectWithValue }) => {
  try {
    const response = await axios.post(`/taskinvoicepayments/create`, invoice)
    return { invoices: response.data.taskinvoicepayments }
  } catch (ex) {
    return rejectWithValue(getExceptionPayload(ex))
  }
})

export const getInvociePayments = createAsyncThunk('appInvociePayments/getInvociePayments', async id => {
  const response = await axios.post('/taskinvoicepayments/get', { id })
  return { invoice: response.data.taskinvoicepayments }
})

export const updateInvociePayments = createAsyncThunk('appInvociePayments/updateInvociePayments', async (invoice, { rejectWithValue }) => {
  try {
    const response = await axios.post(`/taskinvoicepayments/update`, invoice)
    return { invoices: response.data.taskinvoicepayments }
  } catch (ex) {
    return rejectWithValue(getExceptionPayload(ex))
  }
})

export const getClient = createAsyncThunk('appInvociePayments/getClient', async id => {
  const response = await axios.post('/clients/get', { id })
  return response.data.clients
})

export const deleteInvociePayments = createAsyncThunk('appInvociePayments/deleteInvociePayments', async (id, { dispatch, getState }) => {
  await axios.post('/invoices/delete', { id })
  await dispatch(getData(getState().invoice.params))
  return id
})

export const appInvociePaymentsSlice = createSlice({
  name: 'appInvociePayments',
  initialState: {
    invoicePayments: [],
    total: 1,
    params: {}
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getData.fulfilled, (state, action) => {
      state.invoicePayments = action.payload.data
    })
    builder.addCase(addInvociePayments.fulfilled, (state, action) => {
      state.invoiceId = action.payload.invoices.id
    })
    builder.addCase(updateInvociePayments.fulfilled, (state, action) => {
      state.invoiceId = action.payload.invoices.id
    })
    builder.addCase(getInvociePayments.fulfilled, (state, action) => {
      state.selectedInvociePayments = action.payload.invoice
    })

  }
})

export default appInvociePaymentsSlice.reducer
