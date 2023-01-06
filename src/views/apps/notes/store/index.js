// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from '@src/configs/axios/axiosConfig'

export const getData = createAsyncThunk('appNotes/getData', async id => {
  const modulereferenceid = id
  const response = await axios.post('/notes/list', modulereferenceid)
  return {
    data: response.data.notes
  }
})

export const addNotes = createAsyncThunk('appNotes/addNotes', async (data, { dispatch }) => {
  await axios.post('/notes/list', data)
  await dispatch(getData(data.modulerefernceid))
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
