import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../api/client'


export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get('/fakeApi/users')
  return response.users
})
const initialState = []


const usersSlice = createSlice({
    name:'users',
    initialState:initialState,
    reducers:{
      
    },
      extraReducers: {
        [fetchUsers.fulfilled]: (state, action) => {
          return action.payload
        }
      }
})

export default usersSlice.reducer;