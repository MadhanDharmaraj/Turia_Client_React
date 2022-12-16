// ** React Imports
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const Chat = lazy(() => import('../../views/apps/chat'))
const Todo = lazy(() => import('../../views/apps/todo'))
const Email = lazy(() => import('../../views/apps/email'))
const Calendar = lazy(() => import('../../views/apps/calendar'))

const InvoiceAdd = lazy(() => import('../../views/apps/invoice/add'))
const InvoiceList = lazy(() => import('../../views/apps/invoice/list'))
const InvoiceEdit = lazy(() => import('../../views/apps/invoice/edit'))
const InvoicePrint = lazy(() => import('../../views/apps/invoice/print'))
const InvoicePreview = lazy(() => import('../../views/apps/invoice/preview'))

const EcommerceShop = lazy(() => import('../../views/apps/ecommerce/shop'))
const EcommerceDetail = lazy(() => import('../../views/apps/ecommerce/detail'))
const EcommerceWishlist = lazy(() => import('../../views/apps/ecommerce/wishlist'))
const EcommerceCheckout = lazy(() => import('../../views/apps/ecommerce/checkout'))

const UserView = lazy(() => import('../../views/apps/user/view'))

const ClientList = lazy(() => import('../../views/apps/client/list'))
const ClientView = lazy(() => import('../../views/apps/client/view'))
const ClientAdd = lazy(() => import('../../views/apps/client/add'))
const ClientEdit = lazy(() => import('../../views/apps/client/edit'))

const TeamList = lazy(() => import('../../views/apps/team/list'))
const TeamView = lazy(() => import('../../views/apps/team/view'))
const TeamAdd = lazy(() => import('../../views/apps/team/add'))
const TeamEdit = lazy(() => import('../../views/apps/team/edit'))

const ServiceList = lazy(() => import('../../views/apps/service/list'))
const ServiceView = lazy(() => import('../../views/apps/service/view'))
const ServiceAdd = lazy(() => import('../../views/apps/service/add'))
const ServiceEdit = lazy(() => import('../../views/apps/service/edit'))

const CategoryList = lazy(() => import('../../views/apps/category/list'))
const CategoryView = lazy(() => import('../../views/apps/category/view'))

const TaskList = lazy(() => import('../../views/apps/task/list'))
const TaskView = lazy(() => import('../../views/apps/task/view'))
const TaskAdd = lazy(() => import('../../views/apps/task/add'))
const TaskEdit = lazy(() => import('../../views/apps/task/edit'))

const RecurringTaskList = lazy(() => import('../../views/apps/recurring-task/list'))
const RecurringTaskView = lazy(() => import('../../views/apps/recurring-task/view'))
const RecurringTaskAdd = lazy(() => import('../../views/apps/recurring-task/add'))
const RecurringTaskEdit = lazy(() => import('../../views/apps/recurring-task/edit'))

const DSCList = lazy(() => import('../../views/apps/digital-signature/list'))
const DSCView = lazy(() => import('../../views/apps/digital-signature/view'))
const DSCAdd = lazy(() => import('../../views/apps/digital-signature/add'))
const DSCEdit = lazy(() => import('../../views/apps/digital-signature/edit'))

const ComplianceList = lazy(() => import('../../views/apps/compliance/list'))
const ComplianceView = lazy(() => import('../../views/apps/compliance/view'))
const ComplianceAdd = lazy(() => import('../../views/apps/compliance/add'))

const Organization = lazy(() => import('../../views/organization'))

const Roles = lazy(() => import('../../views/apps/roles-permissions/roles'))
const Permissions = lazy(() => import('../../views/apps/roles-permissions/permissions'))

const AppRoutes = [
  {
    element: <Email />,
    path: '/apps/email',
    meta: {
      appLayout: true,
      className: 'email-application'
    }
  },
  {
    element: <Email />,
    path: '/apps/email/:folder',
    meta: {
      appLayout: true,
      className: 'email-application'
    }
  },
  {
    element: <Email />,
    path: '/apps/email/label/:label',
    meta: {
      appLayout: true,
      className: 'email-application'
    }
  },
  {
    element: <Email />,
    path: '/apps/email/:filter'
  },
  {
    path: '/apps/chat',
    element: <Chat />,
    meta: {
      appLayout: true,
      className: 'chat-application'
    }
  },
  {
    element: <Todo />,
    path: '/apps/todo',
    meta: {
      appLayout: true,
      className: 'todo-application'
    }
  },
  {
    element: <Todo />,
    path: '/apps/todo/:filter',
    meta: {
      appLayout: true,
      className: 'todo-application'
    }
  },
  {
    element: <Todo />,
    path: '/apps/todo/tag/:tag',
    meta: {
      appLayout: true,
      className: 'todo-application'
    }
  },
  {
    element: <Calendar />,
    path: '/apps/calendar'
  },
  {
    element: <InvoiceList />,
    path: '/invoice/list'
  },
  {
    element: <InvoicePreview />,
    path: '/invoice/view/:id'
  },
  {
    path: '/invoice/view',
    element: <Navigate to='/invoice/view/4987' />
  },
  {
    element: <InvoiceEdit />,
    path: '/invoice/edit/:id'
  },
  {
    path: '/invoice/edit',
    element: <Navigate to='/invoice/edit/4987' />
  },
  {
    element: <InvoiceAdd />,
    path: '/invoice/add'
  },
  {
    path: '/invoice/print',
    element: <InvoicePrint />,
    meta: {
      layout: 'blank'
    }
  },
  {
    element: <EcommerceShop />,
    path: '/apps/ecommerce/shop',
    meta: {
      className: 'ecommerce-application'
    }
  },
  {
    element: <EcommerceWishlist />,
    path: '/apps/ecommerce/wishlist',
    meta: {
      className: 'ecommerce-application'
    }
  },
  {
    path: '/apps/ecommerce/product-detail',
    element: <Navigate to='/apps/ecommerce/product-detail/apple-i-phone-11-64-gb-black-26' />,
    meta: {
      className: 'ecommerce-application'
    }
  },
  {
    path: '/apps/ecommerce/product-detail/:product',
    element: <EcommerceDetail />,
    meta: {
      className: 'ecommerce-application'
    }
  },
  {
    path: '/apps/ecommerce/checkout',
    element: <EcommerceCheckout />,
    meta: {
      className: 'ecommerce-application'
    }
  },
  {
    path: '/apps/user/view',
    element: <Navigate to='/apps/user/view/1' />
  },
  {
    element: <Roles />,
    path: '/apps/roles'
  },
  {
    element: <Permissions />,
    path: '/apps/permissions'
  },
  {
    element: <ClientList />,
    path: '/client/list'
  },
  {
    element: <ClientView />,
    path: '/client/view/:id'
  },
  {
    element: <ClientAdd />,
    path: '/client/add/'
  },
  {
    element: <ClientEdit />,
    path: '/client/edit/:id'
  },
  {
    element: <ServiceList />,
    path: '/service/list'
  },
  {
    element: <ServiceView />,
    path: '/service/view/:id'
  },
  {
    element: <ServiceAdd />,
    path: '/service/add/'
  },
  {
    element: <ServiceEdit />,
    path: '/service/edit/:id'
  },
  {
    element: <CategoryList />,
    path: '/category/list'
  },
  {
    element: <CategoryView />,
    path: '/category/view/:id'
  },
  {
    element: <TaskList />,
    path: '/task/list'
  },
  {
    element: <TaskView />,
    path: '/task/view/:id'
  },
  {
    element: <TaskAdd />,
    path: '/task/add/'
  },
  {
    element: <TaskEdit />,
    path: '/task/edit/:id'
  },
  {
    element: <RecurringTaskList />,
    path: '/recurring-task/list'
  },
  {
    element: <RecurringTaskView />,
    path: '/recurring-task/view/:id'
  },
  {
    element: <RecurringTaskAdd />,
    path: '/recurring-task/add/'
  },
  {
    element: <RecurringTaskEdit />,
    path: '/recurring-task/edit/:id'
  },
  {
    element: <DSCList />,
    path: '/digital-signature/list'
  },
  {
    element: <DSCView />,
    path: '/digital-signature/view/:id'
  },
  {
    element: <DSCAdd />,
    path: '/digital-signature/add/'
  },
  {
    element: <DSCEdit />,
    path: '/digital-signature/edit/:id'
  },
  {
    element: <TeamList />,
    path: '/team/list'
  },
  {
    element: <TeamView />,
    path: '/team/view/:id'
  },
  {
    element: <ComplianceAdd />,
    path: '/compliance/add/'
  },
  {
    element: <ComplianceList />,
    path: '/compliance/list'
  },
  {
    element: <ComplianceView />,
    path: '/compliance/view/:id'
  },
  {
    element: <TeamAdd />,
    path: '/team/add/'
  },
  {
    element: <Organization />,
    path: '/organiation/create'
  }
]

export default AppRoutes
