// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from '@src/configs/axios/axiosConfig'
import { orgUserId } from '@src/helper/sassHelper'
const userId = orgUserId()

export const getData = createAsyncThunk('appCategories/getData', async params => {
  const response = await axios.post('/categories/list', params)
  return {
    params,
    data: response.data.categories,
    totalPages: 10 //response.data.categories.total
  }
})

export const getCategory = createAsyncThunk('appCategories/getCategory', async id => {
  const response = await axios.post('/categories/get', { id })
  return response.data.categories
})

export const addCategory = createAsyncThunk('appCategories/addCategory', async (category, { dispatch, getState }) => {
  await axios.post('/categories/create', category)
  await dispatch(getData(getState().category.params))
  return category
})

export const updateCategory = createAsyncThunk('appCategories/updateCategory', async (category, { }) => {
  const response = await axios.post(`/categories/update`, category)
  return { category: response.data.categories }
})

export const deleteCategory = createAsyncThunk('appCategories/deleteCategory', async (id, { dispatch, getState }) => {
  await axios.post('/categories/delete', { id, updatedBy: userId })
  await dispatch(getData(getState().categories.params))
  return id
})

export const appCategoriesSlice = createSlice({
  name: 'appCategories',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    selectedCategory: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getData.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.totalPages
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.selectedCategory = action.payload
      })
  }
})

export default appCategoriesSlice.reducer
