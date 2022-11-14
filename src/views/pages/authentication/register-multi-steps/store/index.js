// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from '../../../../../configs/axios/axiosConfig'

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
  const response = await axios.post('/organization/create', organization)
  return response.payload.organization
})

export const appUsersSlice = createSlice({
  name: 'appUsers',
  initialState: {
    data: [],
    loginUser: null,
    loginError: null,
    verifyprocess : false,
    activeOrganization: {},
    activeOrganizationId: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.loginUser = action.payload.user
      })
      .addCase(register.rejected, (state, { error }) => {
        state.loginError = error
      })
      .addCase(verfiyCode.fulfilled, (state, {  }) => {
        state.verifyprocess = true
      })
      .addCase(createOrganization.fulfilled, (state, action) => {
        state.activeOrganization = action.payload
        state.activeOrganizationId = action.payload.id
      })
  }
})

export default appUsersSlice.reducer
