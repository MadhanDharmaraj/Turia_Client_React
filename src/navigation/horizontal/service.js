import {  ShoppingCart, Circle } from 'react-feather'

export default [
  {
    id: 'services',
    title: 'Services',
    icon: <ShoppingCart />,
    children: [
      {
        id: 'service',
        title: 'Service',
        icon: <Circle />,
        navLink: '/service/list'
      },
      {
        id: 'cartegory',
        title: 'Category',
        icon: <Circle />,
        navLink: '/category/list' 
      }
    ]
  }

]