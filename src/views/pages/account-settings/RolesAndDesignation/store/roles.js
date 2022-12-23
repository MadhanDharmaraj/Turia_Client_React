// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from '@src/configs/axios/axiosConfig'

export const getData = createAsyncThunk('appRole/getData', async params => {
  const response = await axios.post(`/roles/list`, params)
  return {
    params,
    data: response.data.roles
  }
})
export const addRole = createAsyncThunk('appRole/addRole', async (data, { dispatch, getState }) => {

  await axios.post(`/roles/create`, data)
  await dispatch(getData(getState().invoiceaccount.params))
  return []

})

export const updateRole = createAsyncThunk('appRole/updateRole', async (data, { dispatch, getState }) => {
  await axios.post(`/roles/update`, data)
  await dispatch(getData(getState().invoiceaccount.params))
  return []
})

export const deleteRole = createAsyncThunk('appRole/deleteRole', async (id, { dispatch, getState }) => {
  await axios.post('/roles/delete', { id })
  await dispatch(getData(getState().invoiceaccount.params))
  return id
})

export const appRolesSlice = createSlice({
  name: 'appRole',
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

export default appRolesSlice.reducer
