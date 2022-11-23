// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from '@src/configs/axios/axiosConfig'

export const createOrganization = createAsyncThunk('appOrganizations/createOrganization', async (organization, { }) => {
  const response = await axios.post('/organizations/create', organization)
  return { organization: response.data.organizations }
})

export const createOrganizationUser = createAsyncThunk('appOrganizations/createOrganizationUser', async (organizationuser, { }) => {
  const response = await axios.post('/organizationusers/create', organizationuser)
  return { organization: response.data.organizations }
})

export const appOrganizationsSlice = createSlice({
  name: 'appOrganizations',
  initialState: {
    data: [],
    loginUser: null,
    loginError: null,
    verifyprocess: false,
    activeOrganization: null,
    activeOrganizationId: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createOrganization.fulfilled, (state, action) => {
        state.activeOrganization = action.payload.organization
        state.activeOrganizationId = action.payload.organization.id
      })
  }
})

export default appOrganizationsSlice.reducer
