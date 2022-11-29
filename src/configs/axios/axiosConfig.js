import axios from 'axios'

const api_url = process.env.REACT_APP_API_URL

const orgid = localStorage.getItem('activeOrganization') === null ? null : JSON.parse(localStorage.getItem('activeOrganization'))['id']

let instance
if (orgid === null) {
    instance = axios.create({ baseURL: api_url })
} else {
    instance = axios.create({ baseURL: api_url, params: { organizationId: orgid } })
}

export default instance

