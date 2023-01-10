// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from '@src/configs/axios/axiosConfig'
import { orgUserId } from '@src/helper/sassHelper'
const userId = orgUserId()

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

export const updateStatus = createAsyncThunk('appTasks/updateStatus', async (data, { dispatch }) => {
  await axios.post('/tasks/updatestatus', data)
  await dispatch(getTask(data.id))
  return ''
})

export const addTaskConversation = createAsyncThunk('appTasks/addTaskConversation', async (data, { }) => {
  await axios.post('/taskconversations/create', data)
  return ''
})

export const deleteTask = createAsyncThunk('appTasks/deleteTask', async (id, { dispatch, getState }) => {
  await axios.post('/tasks/delete', { id, updatedBy: userId })
  await dispatch(getData(getState().task.params))
  return id
})

export const startTimer = createAsyncThunk('appTasks/startTimer', async (data, { }) => {
  await axios.post('/tasks/starttimer', data)
  return ''
})

export const endTimer = createAsyncThunk('appTasks/endTimer', async (data, { }) => {
  await axios.post('/tasks/endtimer', data)
  return ''
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
    editflag: true
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
        state.taskId = action.payload.id
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.taskId = action.payload.id
      })
  }
})

export default appTasksSlice.reducer
