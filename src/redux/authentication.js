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
      state.userData = action.payload
      state[config.storageTokenKeyName] = action.payload[config.storageTokenKeyName]
      state[config.storageRefreshTokenKeyName] = action.payload[config.storageRefreshTokenKeyName]
      //localStorage.setItem('userData', JSON.stringify(action.payload))
      window.cookieStore.set('userData', JSON.stringify(action.payload), { domain: 'localhost:3000' })
      // localStorage.setItem(config.storageTokenKeyName, JSON.stringify(action.payload.accessToken))
      // localStorage.setItem(config.storageRefreshTokenKeyName, JSON.stringify(action.payload.refreshToken))
    },
    handleLogout: state => {
      state.userData = {}
      state[config.storageTokenKeyName] = null
      state[config.storageRefreshTokenKeyName] = null
      // ** Remove user, accessToken & refreshToken from localStorage
      window.cookieStore.delete('userData')
      window.cookieStore.delete('activeOrganization')
      localStorage.removeItem('userData')
      localStorage.removeItem(config.storageTokenKeyName)
      localStorage.removeItem(config.storageRefreshTokenKeyName)
    }
  }
})

export const { handleLogin, handleLogout } = authSlice.actions

export default authSlice.reducer
