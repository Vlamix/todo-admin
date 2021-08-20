class LocalStorageService {
  static getToken() {
    return JSON.parse(localStorage.getItem('token') || '').token
  }
  static setToken(token: string) {
    console.log(JSON.stringify(token))
    localStorage.setItem('token', JSON.stringify(token))
  }
  static deleteToken() {
    localStorage.removeItem('token')
  }
}

export default LocalStorageService
