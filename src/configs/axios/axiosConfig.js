import axios from 'axios'
//import { useSelector } from 'react-redux'

//const store = useSelector(state => state.client)

const api_url = process.env.REACT_APP_API_URL
//const  organizationId = store.register.activeOrganizationId ?
const instance = axios.create({ baseURL: api_url})

export default instance