import { combineReducers, configureStore } from '@reduxjs/toolkit'
//import todoReducer from './features/admin/todoSlice'
import authReducer from './features/auth/auth.slice'
import adminReducer from './features/admin/admin.slice'

const rootReducer = combineReducers({
  admin: adminReducer,
  auth: authReducer,
})

const Store = configureStore({
  reducer: rootReducer,
})

export type AppDispatch = typeof Store.dispatch
export type RootState = ReturnType<typeof rootReducer>

export default Store
