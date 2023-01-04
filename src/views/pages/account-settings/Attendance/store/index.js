// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from '@src/configs/axios/axiosConfig'

export const getData = createAsyncThunk('appInvoiceSetting/getData', async organizationId => {
  const response = await axios.post(`/organizationprefernces/get`, { organizationId })
  return {
    data: response.data.organizationprefernces
  }
})
export const addOrgPreference = createAsyncThunk('appInvoiceSetting/addOrgPreference', async (data, { }) => {

  await axios.post(`/organizationprefernces/createandupdate`, data)
  return ''

})

export const appInvoiceAccountSlice = createSlice({
  name: 'appInvoiceSetting',
  initialState: {
    accounts: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getData.fulfilled, (state, action) => {
        state.accounts = action.payload.data
        state.params = action.payload.params
      })

  }
})

export default appInvoiceAccountSlice.reducer
