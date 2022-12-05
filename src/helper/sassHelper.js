export const activeOrganizationid = () => {
    return localStorage.getItem('activeOrganization') === null ? null : JSON.parse(localStorage.getItem('activeOrganization'))['id']
}

export const activeOrganization = () => {
    return localStorage.getItem('activeOrganization') === null ? null : JSON.parse(localStorage.getItem('activeOrganization'))
}