// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from '@src/configs/axios/axiosConfig'

export const register = createAsyncThunk('appUsers/createUser', async (user, { rejectWithValue }) => {
  try {
    const response = await axios.post('/users/create', user)
    return { user: response.data.users }
  } catch (error) {
    return rejectWithValue(error.data)
  }
})

export const generateCode = createAsyncThunk('appUsers/sendCode', async (email, { }) => {
  const response = await axios.post('/users/sendCode', email)
  return response
})

export const verfiyCode = createAsyncThunk('appUsers/verfiyCode', async (data, { }) => {
  const response = await axios.post('/users/validatecode', data)
  return response
})

export const createOrganization = createAsyncThunk('appUsers/createOrganization', async (organization, { }) => {
  const response = await axios.post('/organizations/create', organization)
  return { organization: response.data.organizations }
})

export const createOrganizationUser = createAsyncThunk('appUsers/createOrganizationUser', async (organization, { }) => {
  const response = await axios.post('/organizationusers/create', organization)
  return { organization: response.data.organizations }
})


export const appUsersSlice = createSlice({
  name: 'appUsers',
  initialState: {
    data: [],
    loginUser: null,
    loginError: null,
    verifyprocess: false,
    activeOrganization: null,
    activeOrganizationId: null,
    accessToken: '',
    registerSuccess: false
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        const data = action.payload.user
        data.role = 'admin'
        data.ability = [
          {
            action: 'manage',
            subject: 'all'
          }
        ]
        state.loginUser = data
      })
      .addCase(register.rejected, (state, { error }) => {
        state.loginError = error
      })
      .addCase(verfiyCode.fulfilled, (state, action) => {
        state.verifyprocess = true
        state.accessToken = action.payload.data.token
      })
      .addCase(createOrganization.fulfilled, (state, action) => {
        state.activeOrganization = action.payload.organization
        state.activeOrganizationId = action.payload.organization.id
      })
      .addCase(createOrganizationUser.fulfilled, (state) => {
        state.registerSuccess = true
      })

  }
})

export default appUsersSlice.reducer
