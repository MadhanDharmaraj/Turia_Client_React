// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

// ** UseJWT import to get config
import useJwt from '@src/auth/jwt/useJwt'

const config = useJwt.jwtConfig

const initialUser = () => {
  //const item = window.localStorage.getItem('userData')
  const item = document.cookie !== '' ? JSON.parse(document.cookie
    .split('; ')
    .find((row) => row.startsWith('userData='))
    ?.split('=')[1]) : null

  //** Parse stored json or if none return initialValue
  return item ? item : {}
}

export const authSlice = createSlice({
  name: 'authentication',
  initialState: {
    userData: initialUser()
  },
  reducers: {
    handleLogin: (state, action) => {
      state.userData = action.payload.users
      state[config.storageTokenKeyName] = action.payload['token']
      //state[config.storageRefreshTokenKeyName] = action.payload[config.storageRefreshTokenKeyName]
      localStorage.setItem('userData', JSON.stringify(action.payload.users))
      localStorage.setItem(config.storageTokenKeyName, action.payload.token)
      // localStorage.setItem(config.storageRefreshTokenKeyName, JSON.stringify(action.payload.refreshToken))
    },
    handleLogout: state => {
      state.userData = {}
      state[config.storageTokenKeyName] = null
      state[config.storageRefreshTokenKeyName] = null
      // ** Remove user, accessToken & refreshToken from localStorage
      localStorage.removeItem(config.storageTokenKeyName)
      localStorage.removeItem('userData')
    }
  }
})

export const { handleLogin, handleLogout } = authSlice.actions

export default authSlice.reducer
