import axios from 'axios'

const api_url = process.env.REACT_APP_API_URL
//axios.defaults.withCredentials = true

const organization = window.cookieStore.get('activeOrganization') !== undefined ? JSON.stringify(window.cookieStore.get('activeOrganization')) : null

let instance

if (organization !== null) {
    instance = axios.create({ baseURL: api_url, params: { organization: organization.id } })
} else {
    instance = axios.create({ baseURL: api_url })
}


export default instance