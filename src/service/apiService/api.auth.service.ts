import axios from 'axios'
import { LoginData, RegisterData } from '../../redux/features/auth/dto/auth.dto'

class ApiAuthServices {
  _Api_URL = 'http://localhost:5000/auth'

  public async getLogin(body: LoginData) {
    return axios.post(`${this._Api_URL}/login`, body).then((res) => {
      const token = res.data.token
      localStorage.setItem('token', token)
      return res.data
    })
  }

  public async getRegistration(body: RegisterData) {
    return await axios
      .post(`${this._Api_URL}/registration`, {
        email: body.email,
        password: body.password,
        role: body.role,
      })
      .then((res) => {
        return res.data
      })
  }
}
export default new ApiAuthServices()
