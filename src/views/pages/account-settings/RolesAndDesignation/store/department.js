// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from '@src/configs/axios/axiosConfig'


export const getData = createAsyncThunk('appDepartment/getData', async params => {
  const response = await axios.post(`/departments/list`, params)
  return {
    params,
    data: response.data.departments
  }
})

export const addDepartment = createAsyncThunk('appDepartment/addDepartment', async (data, { dispatch, getState }) => {

  await axios.post(`/departments/create`, data)
  await dispatch(getData(getState().invoiceaccount.params))
  return []

})

export const updateDepartment = createAsyncThunk('appDepartment/updateDepartment', async (data, { dispatch, getState }) => {
  await axios.post(`/departments/update`, data)
  await dispatch(getData(getState().invoiceaccount.params))
  return []
})

export const deleteDepartment = createAsyncThunk('appDepartment/updateDepartment', async (id, { dispatch, getState }) => {
  await axios.post('/departments/delete', { id })
  await dispatch(getData(getState().invoiceaccount.params))
  return id
})

export const appDepartmentSlice = createSlice({
  name: 'appDepartment',
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

export default appDepartmentSlice.reducer
