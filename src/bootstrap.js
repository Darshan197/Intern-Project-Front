import axios from 'axios'
export const baseURL = "https://intern-backend.herokuapp.com"
axios.defaults.baseURL = baseURL
const datastorage = require('tns-core-modules/application-settings')
if(datastorage.getString('user') !== undefined) {
    let token = JSON.parse(datastorage.getString('user')).token
    if(token) axios.defaults.headers['authorization'] = 'Bearer ' + token
}
export default axios