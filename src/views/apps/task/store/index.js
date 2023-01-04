// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from '@src/configs/axios/axiosConfig'

export const getData = createAsyncThunk('appTasks/getData', async params => {
  const response = await axios.get('/tasks/list', params)
  return {
    params,
    data: response.data.tasks,
    totalPages: response.data.total
  }
})

export const getClient = createAsyncThunk('appTasks/getClient', async id => {
  const response = await axios.post('/clients/get', { id })
  return response.data.clients
})

export const getTask = createAsyncThunk('appTasks/getTask', async id => {
  const response = await axios.get('/tasks/get', { id })
  return response.data.task
})

export const addTask = createAsyncThunk('appTasks/addTask', async (task, {  }) => {
  await axios.post('/tasks/create', task)      
  return response.data.task
})

export const updateInvocieId = createAsyncThunk('appTasks/updateInvocieId', async (data, {  }) => {
  await axios.post('/tasks/updateinvocieid', data)
  return response.data.task
})

export const deleteTask = createAsyncThunk('appTasks/deleteTask', async (id, { dispatch, getState }) => {
  await axios.delete('/tasks/delete', { id })
  await dispatch(getData(getState().tasks.params))
  return id
})

export const appTasksSlice = createSlice({
  name: 'appTasks',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    selectedTask: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getData.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.totalPages
      })
      .addCase(getTask.fulfilled, (state, action) => {
        state.selectedTask = action.payload
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.selectedTask = action.payload
      })
  }
})

export default appTasksSlice.reducer
