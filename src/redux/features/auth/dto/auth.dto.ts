export interface RegisterData {
  email: string
  password: string
  role: string
}

export interface LoginData {
  email: string
  password: string
}

export interface AuthState {
  user?: any
  token?: string | null
  error?: Error
  isLoading: boolean
  note: string | null
}
