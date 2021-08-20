import { createSlice, Dispatch } from '@reduxjs/toolkit'
import ApiAuthServices from '../../../service/apiService/api.auth.service'
import LocalStorageService from '../../../service/localSoregeService/local.storege.service'
import { AuthState, LoginData, RegisterData } from './dto/auth.dto'

const IS_SERVER = typeof window === 'undefined'

const initialState: AuthState = {
  isLoading: false,
  token: !IS_SERVER ? localStorage.getItem('token') : '',
  note: null,
}

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state: AuthState) => {
      LocalStorageService.deleteToken()
      state.isLoading = false
      state.token = null
    },
    loginSuccess: (state: AuthState, action) => {
      LocalStorageService.setToken(action.payload)
      state.isLoading = false
      state.token = action.payload
    },
    setNotification: (state: AuthState, action) => {
      state.note = action.payload
    },
    clearNotification: (state: AuthState) => {
      state.note = null
    },
    registerError: (state: AuthState, action) => {
      state.error = action.payload
    },
  },
})

export const { logout, loginSuccess } = AuthSlice.actions

export const logoutUser = () => {
  return (dispatch: Dispatch) => {
    dispatch(logout())
  }
}

export const loginUser = (data: LoginData) => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await ApiAuthServices.getLogin(data)
      dispatch(loginSuccess(res))
    } catch (e) {
      return e
    }
  }
}

export const registerUser = (data: RegisterData) => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await ApiAuthServices.getRegistration({
        email: data.email,
        password: data.password,
        role: 'admin',
      })

      dispatch(loginSuccess(res))
    } catch (e: any) {
      return e
    }
  }
}

export default AuthSlice.reducer
