// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from '@src/configs/axios/axiosConfig'

export const getData = createAsyncThunk('appInvoice/getData', async params => {
  const response = await axios.get('/apps/invoice/invoices', params)
  return {
    params,
    data: response.data.invoices,
    allData: response.data.allData,
    totalPages: response.data.total
  }
})

export const addInvoice = createAsyncThunk('appInvoice/addInvoice', async (invoice, { rejectWithValue }) => {
  try {
    const response = await axios.post(`/taskinvoices/create`, invoice)
    return { invoices: response.data.invoices }
  } catch (ex) {
    return rejectWithValue(getExceptionPayload(ex))
  }
})

export const addInvoiceTax = createAsyncThunk('appInvoice/addInvoiceTax', async (invoiceTax, { rejectWithValue }) => {
  try {
    const response = await axios.post(`/invoicetaxes/create`, invoiceTax)
    return { invoices: response.data.invoices }
  } catch (ex) {
    return rejectWithValue(getExceptionPayload(ex))
  }
})

export const addInvoiceItems = createAsyncThunk('appInvoice/addInvoiceItems', async (invoiceItems, { rejectWithValue }) => {
  try {
    const response = await axios.post(`/taskinvoiceitems/create`, invoiceItems)
    return { invoices: response.data.invoices }
  } catch (ex) {
    return rejectWithValue(getExceptionPayload(ex))
  }
})

export const addInvoiceItemTax = createAsyncThunk('appInvoice/addInvoiceItemTax', async (invoiceItemTax, { rejectWithValue }) => {
  try {
    const response = await axios.post(`/invocieitemtaxes/create`, invoiceItemTax)
    return { invoices: response.data.invoices }
  } catch (ex) {
    return rejectWithValue(getExceptionPayload(ex))
  }
})


export const getClient = createAsyncThunk('appInvoice/getClient', async id => {
  const response = await axios.post('/clients/get', { id })
  return response.data.clients
})

export const deleteInvoice = createAsyncThunk('appInvoice/deleteInvoice', async (id, { dispatch, getState }) => {
  await axios.delete('/apps/invoice/delete', { id })
  await dispatch(getData(getState().invoice.params))
  return id
})

export const appInvoiceSlice = createSlice({
  name: 'appInvoice',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    invoiceId: null
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getData.fulfilled, (state, action) => {
      state.data = action.payload.data
      state.allData = action.payload.allData
      state.total = action.payload.totalPages
      state.params = action.payload.params
    })
    builder.addCase(addInvoice.fulfilled, (state, action) => {
      state.invoiceId = action.payload.invoice.id
    })

  }
})

export default appInvoiceSlice.reducer
