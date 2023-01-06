// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from '@src/configs/axios/axiosConfig'

export const getOrganization = createAsyncThunk('appOrganization/getData', async id => {
  const response = await axios.post(`/organizations/get`, { id })
  return {
    data: response.data.organizations
  }
})
export const updateOrganization = createAsyncThunk('appOrganization/addOrgPreference', async (data, { }) => {

  await axios.post(`/organizations/update`, data)
  return ''

})

export const appOrganizationSlice = createSlice({
  name: 'appOrganization',
  initialState: {
    organizationData: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getOrganization.fulfilled, (state, action) => {
        state.organizationData = action.payload.data
      })

  }
})

export default appOrganizationSlice.reducer
