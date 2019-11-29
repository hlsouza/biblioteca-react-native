import axios from 'axios'

export default Api = axios.create({
  baseURL: 'http://192.168.43.81:8080'
})
