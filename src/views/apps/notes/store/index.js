// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from '@src/configs/axios/axiosConfig'
import { orgUserId } from '@src/helper/sassHelper'
const userId = orgUserId()

export const getData = createAsyncThunk('appNotes/getData', async id => {
  const modulereferenceid = id
  const response = await axios.post('/notes/list', {modulereferenceid})
  return {
    data: response.data.notes
  }
})

export const addNotes = createAsyncThunk('appNotes/addNotes', async (data, { dispatch }) => {
  await axios.post('/notes/create', data)
  await dispatch(getData(data.moduleReferenceId))
  return []
})

export const deleteNotes = createAsyncThunk('appNotes/deleteNotes', async (id, { dispatch }) => {
  await axios.post('/notes/delete', { id, updatedBy : userId})
  await dispatch(getData(data.modulerefernceid))
  return []
})

export const updateNotes = createAsyncThunk('appNotes/updateNotes', async (data, { dispatch }) => {
  await axios.post('/notes/update', data)
  await dispatch(getData(data.moduleReferenceId))
  return []
})

export const appNotesSlice = createSlice({
  name: 'appNotes',
  initialState: {
    data: []
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getData.fulfilled, (state, action) => {
        state.data = action.payload.data
      })
  }
})

export default appNotesSlice.reducer
