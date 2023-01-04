// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from '@src/configs/axios/axiosConfig'

export const getData = createAsyncThunk('appTasks/getData', async params => {
  const response = await axios.post('/tasks/list', params)
  return {
    params,
    data: response.data.tasks.tasks,
    totalPages: response.data.tasks.total
  }
})

export const getClient = createAsyncThunk('appTasks/getClient', async id => {
  const response = await axios.post('/clients/get', { id })
  return response.data.clients
})

export const getTask = createAsyncThunk('appTasks/getTask', async id => {
  const response = await axios.post('/tasks/get', { id })
  return response.data.task
})

export const addTask = createAsyncThunk('appTasks/addTask', async (task, { }) => {
  const response = await axios.post('/tasks/create', task)
  return response.data.task
})

export const addTaskParticipants = createAsyncThunk('appTasks/addTaskParticipants', async (taskparticpants, { }) => {
  await axios.post('/taskparticpants/create', taskparticpants)
  return []
})

export const addTaskWorkflow = createAsyncThunk('appTasks/addTaskWorkflow', async (taskworkflows, { }) => {
  await axios.post('/taskworkflows/create', taskworkflows)
  return []
})

export const updateInvocieId = createAsyncThunk('appTasks/updateInvocieId', async (data, { }) => {
  await axios.post('/tasks/updateinvocieid', data)
  return response.data.task
})

export const updateTask = createAsyncThunk('appTasks/updateTask', async (task, { }) => {
  const response = await axios.post('/tasks/create', task)
  return response.data.task
})

export const deleteTask = createAsyncThunk('appTasks/deleteTask', async (id, { dispatch, getState }) => {
  await axios.post('/tasks/delete', { id })
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
    selectedTask: null,
    taskId: null,
    editflag : true
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
        state.taskId = action.payload
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.taskId = action.payload
      })
  }
})

export default appTasksSlice.reducer
