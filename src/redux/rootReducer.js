// ** Reducers Imports
import navbar from './navbar'
import layout from './layout'
import auth from './authentication'
import todo from '@src/views/apps/todo/store'
import chat from '@src/views/apps/chat/store'
import users from '@src/views/apps/user/store'
import email from '@src/views/apps/email/store'
import invoice from '@src/views/apps/invoice/store'
import task from '@src/views/apps/task/store'
import register from '@src/views/pages/authentication/register-multi-steps/store'
import client from '@src/views/apps/client/store'
import digitalsignature from '@src/views/apps/digital-signature/store'
import service from '@src/views/apps/service/store'
import category from '@src/views/apps/category/store'
import calendar from '@src/views/apps/calendar/store'
import ecommerce from '@src/views/apps/ecommerce/store'
import dataTables from '@src/views/tables/data-tables/store'
import permissions from '@src/views/apps/roles-permissions/store'

import invoiceaccount from '@src/views/pages/account-settings/Invoice/store/invoiceaccount'
import exemptionreason from '@src/views/pages/account-settings/Invoice/store/exemptionreason'
import designation from '@src/views/pages/account-settings/RolesAndDesignation/store/designation'
import department from '@src/views/pages/account-settings/RolesAndDesignation/store/department'
import role from '@src/views/pages/account-settings/RolesAndDesignation/store/roles'
import dashboard from '@src/views/dashboard/analytics/store/index.js'

const rootReducer = {
  auth,
  todo,
  chat,
  email,
  users,
  navbar,
  layout,
  service,
  category,
  client,
  register,
  invoice,
  digitalsignature,
  task,
  calendar,
  ecommerce,
  dataTables,
  permissions,

  invoiceaccount,
  exemptionreason,
  designation,
  department,
  role,
  dashboard
}

export default rootReducer
