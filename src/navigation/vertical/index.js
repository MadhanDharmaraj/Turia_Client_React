// ** Navigation imports
import client from './client'
import dashboard from './dashboards'
import service from './service'
import task from './task'
import digitalSignature from './digital-signature'
import sales from './sales'
//import settings from './settings'
//import emailAlert from './email-alert'
import compliance from './compliance'
import report from './report'
import team from './team'

// ** Merge & Export
export default [...dashboard, ...client, ...service, ...sales, ...task, ...digitalSignature, ...compliance, ...team, ...report]
