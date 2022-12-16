// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from '@src/configs/axios/axiosConfig'

export const getData = createAsyncThunk('appInvoice/getData', async params => {
  const response = await axios.post('/taskinvoices/list', params)
  return {
    params,
    data: response.data.taskinvoices.taskinvoices,
    totalPages: response.data.taskinvoices.total
  }
})

export const addInvoice = createAsyncThunk('appInvoice/addInvoice', async (invoice, { rejectWithValue }) => {
  try {
    const response = await axios.post(`/taskinvoices/create`, invoice)
    return { invoices: response.data.taskinvoices }
  } catch (ex) {
    return rejectWithValue(getExceptionPayload(ex))
  }
})

export const addInvoiceTax = createAsyncThunk('appInvoice/addInvoiceTax', async (invoiceTax, { rejectWithValue }) => {
  try {
    const response = await axios.post(`/invoicetaxes/create`, { rows: invoiceTax })
    return { invoiceTaxes: response.data.taskinvoices }
  } catch (ex) {
    return rejectWithValue(getExceptionPayload(ex))
  }
})

export const addInvoiceItems = createAsyncThunk('appInvo  ice/addInvoiceItems', async (invoiceItems, { rejectWithValue }) => {
  try {
    const response = await axios.post(`/taskinvoiceitems/create`, { rows: invoiceItems })
    return { invoiceItems: response.data.taskinvoiceitems }
  } catch (ex) {
    return rejectWithValue(getExceptionPayload(ex))
  }
})

export const addInvoiceItemTax = createAsyncThunk('appInvoice/addInvoiceItemTax', async (invoiceItemTax, { rejectWithValue }) => {
  try {
    const response = await axios.post(`/invoiceitemtaxes/create`, { rows: invoiceItemTax })
    return { invoices: response.data.invoices }
  } catch (ex) {
    return rejectWithValue(getExceptionPayload(ex))
  }
})

export const getInvoice = createAsyncThunk('appInvoice/getInvoice', async id => {
  const response = await axios.post('/taskinvoices/get', { id })
  return { invoice: response.data.taskinvoices }
})

export const getInvoiceItems = createAsyncThunk('appInvoice/getInvoiceItem', async invoiceId => {
  const response = await axios.post('/taskinvoiceitems/list', { invoiceId })
  return response.data.taskinvoiceitems
})

export const getInvoiceTaxes = createAsyncThunk('appInvoice/getInvoiceTax', async invoiceId => {
  const response = await axios.post('/invoicetaxes/list', { invoiceId })
  return response.data.invoicetaxes
})

export const getInvoiceItemTaxes = createAsyncThunk('appInvoice/getInvoiceItemTax', async invoiceId => {
  const response = await axios.post('/invoiceitemtaxes/list', { invoiceId })
  return response.data.invoiceitemtaxes
})

export const getClient = createAsyncThunk('appInvoice/getClient', async id => {
  const response = await axios.post('/clients/get', { id })
  return response.data.clients
})

export const deleteInvoice = createAsyncThunk('appInvoice/deleteInvoice', async (id, { dispatch, getState }) => {
  await axios.delete('/invoices/delete', { id })
  await dispatch(getData(getState().invoice.params))
  return id
})

export const deleteInvoiceItem = createAsyncThunk('appInvoice/deleteInvoiceItem', async (id, {  }) => {
  await axios.delete('/taskinvoiceitems/delete', { id })
  return []
})

export const appInvoiceSlice = createSlice({
  name: 'appInvoice',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    invoiceId: null,
    invoiceItems: [],
    selectedInvoice: null
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
      state.invoiceId = action.payload.invoices.id
    })
    builder.addCase(addInvoiceItems.fulfilled, (state, action) => {
      state.invoiceItems = action.payload.invoiceItems
    })
    builder.addCase(getInvoice.fulfilled, (state, action) => {
      state.selectedInvoice = action.payload.invoice
    })

  }
})

export default appInvoiceSlice.reducer
