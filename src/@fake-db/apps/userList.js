import mock from '../mock'

// ** Utils
import { paginateArray } from '../utils'

const data = {
  users: [
    {
      id: 1,
      billing: 'Manual - Credit Card',
      fullName: 'Galen Slixby',
      company: 'Yotz PVT LTD',
      role: 'editor',
      designation: 'Software Developer',
      department: 'IT',
      username: 'gslixby0',
      country: 'El Salvador',
      contact: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      currentPlan: 'enterprise',
      status: 'inactive',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 2,
      billing: 'Manual - Paypal',
      fullName: 'Halsey Redmore',
      company: 'Skinder PVT LTD',
      role: 'author',
      designation: 'Software Developer',
      department: 'IT',
      username: 'hredmore1',
      country: 'Albania',
      contact: '(472) 607-9137',
      email: 'hredmore1@imgur.com',
      currentPlan: 'team',
      status: 'pending',
      avatar: require('@src/assets/images/avatars/10.png').default
    },
    {
      id: 3,
      billing: 'Auto Debit',
      fullName: 'Marjory Sicely',
      company: 'Oozz PVT LTD',
      role: 'maintainer',
      designation: 'Software Developer',
      department: 'IT',
      username: 'msicely2',
      country: 'Russia',
      contact: '(321) 264-4599',
      email: 'msicely2@who.int',
      currentPlan: 'enterprise',
      status: 'active',
      avatar: require('@src/assets/images/avatars/1.png').default
    },
    {
      id: 4,
      billing: 'Manual - Credit Card',
      fullName: 'Cyrill Risby',
      company: 'Oozz PVT LTD',
      role: 'maintainer',
      designation: 'Software Developer',
      department: 'IT',
      username: 'crisby3',
      country: 'China',
      contact: '(923) 690-6806',
      email: 'crisby3@wordpress.com',
      currentPlan: 'team',
      status: 'inactive',
      avatar: require('@src/assets/images/avatars/9.png').default
    },
    {
      id: 5,
      billing: 'Auto Debit',
      fullName: 'Maggy Hurran',
      company: 'Aimbo PVT LTD',
      role: 'subscriber',
      designation: 'Software Developer',
      department: 'IT',
      username: 'mhurran4',
      country: 'Pakistan',
      contact: '(669) 914-1078',
      email: 'mhurran4@yahoo.co.jp',
      currentPlan: 'enterprise',
      status: 'pending',
      avatar: require('@src/assets/images/avatars/10.png').default
    },
    {
      id: 6,
      billing: 'Auto Debit',
      fullName: 'Silvain Halstead',
      company: 'Jaxbean PVT LTD',
      role: 'author',
      designation: 'Software Developer',
      department: 'IT',
      username: 'shalstead5',
      country: 'China',
      contact: '(958) 973-3093',
      email: 'shalstead5@shinystat.com',
      currentPlan: 'company',
      status: 'active',
      avatar: '',
      avatarColor: 'light-success'
    },
    {
      id: 7,
      billing: 'Manual - Paypal',
      fullName: 'Breena Gallemore',
      company: 'Jazzy PVT LTD',
      role: 'subscriber',
      designation: 'Software Developer',
      department: 'IT',
      username: 'bgallemore6',
      country: 'Canada',
      contact: '(825) 977-8152',
      email: 'bgallemore6@boston.com',
      currentPlan: 'company',
      status: 'pending',
      avatar: '',
      avatarColor: 'light-danger'
    },
    {
      id: 8,
      billing: 'Manual - Cash',
      fullName: 'Kathryne Liger',
      company: 'Pixoboo PVT LTD',
      role: 'author',
      designation: 'Software Developer',
      department: 'IT',
      username: 'kliger7',
      country: 'France',
      contact: '(187) 440-0934',
      email: 'kliger7@vinaora.com',
      currentPlan: 'enterprise',
      status: 'pending',
      avatar: require('@src/assets/images/avatars/9.png').default
    },
    {
      id: 9,
      billing: 'Auto Debit',
      fullName: 'Franz Scotfurth',
      company: 'Tekfly PVT LTD',
      role: 'subscriber',
      designation: 'Software Developer',
      department: 'IT',
      username: 'fscotfurth8',
      country: 'China',
      contact: '(978) 146-5443',
      email: 'fscotfurth8@dailymotion.com',
      currentPlan: 'team',
      status: 'pending',
      avatar: require('@src/assets/images/avatars/2.png').default
    },
    {
      id: 10,
      billing: 'Auto Debit',
      fullName: 'Jillene Bellany',
      company: 'Gigashots PVT LTD',
      role: 'maintainer',
      designation: 'Software Developer',
      department: 'IT',
      username: 'jbellany9',
      country: 'Jamaica',
      contact: '(589) 284-6732',
      email: 'jbellany9@kickstarter.com',
      currentPlan: 'company',
      status: 'inactive',
      avatar: require('@src/assets/images/avatars/9.png').default
    },
    {
      id: 11,
      billing: 'Manual - Paypal',
      fullName: 'Jonah Wharlton',
      company: 'Eare PVT LTD',
      role: 'subscriber',
      designation: 'Software Developer',
      department: 'IT',
      username: 'jwharltona',
      country: 'United States',
      contact: '(176) 532-6824',
      email: 'jwharltona@oakley.com',
      currentPlan: 'team',
      status: 'inactive',
      avatar: require('@src/assets/images/avatars/4.png').default
    },
    {
      id: 12,
      billing: 'Manual - Credit Card',
      fullName: 'Seth Hallam',
      company: 'Yakitri PVT LTD',
      role: 'subscriber',
      designation: 'Software Developer',
      department: 'IT',
      username: 'shallamb',
      country: 'Peru',
      contact: '(234) 464-0600',
      email: 'shallamb@hugedomains.com',
      currentPlan: 'team',
      status: 'pending',
      avatar: require('@src/assets/images/avatars/5.png').default
    },
    {
      id: 13,
      billing: 'Auto Debit',
      fullName: 'Yoko Pottie',
      company: 'Leenti PVT LTD',
      role: 'subscriber',
      designation: 'Software Developer',
      department: 'IT',
      username: 'ypottiec',
      country: 'Philippines',
      contact: '(907) 284-5083',
      email: 'ypottiec@privacy.gov.au',
      currentPlan: 'basic',
      status: 'inactive',
      avatar: require('@src/assets/images/avatars/7.png').default
    },
    {
      id: 14,
      billing: 'Auto Debit',
      fullName: 'Maximilianus Krause',
      company: 'Digitube PVT LTD',
      role: 'author',
      designation: 'Software Developer',
      department: 'IT',
      username: 'mkraused',
      country: 'Democratic Republic of the Congo',
      contact: '(167) 135-7392',
      email: 'mkraused@stanford.edu',
      currentPlan: 'team',
      status: 'active',
      avatar: require('@src/assets/images/avatars/9.png').default
    },
    {
      id: 15,
      billing: 'Auto Debit',
      fullName: 'Zsazsa McCleverty',
      company: 'Kaymbo PVT LTD',
      role: 'maintainer',
      designation: 'Software Developer',
      department: 'IT',
      username: 'zmcclevertye',
      country: 'France',
      contact: '(317) 409-6565',
      email: 'zmcclevertye@soundcloud.com',
      currentPlan: 'enterprise',
      status: 'active',
      avatar: require('@src/assets/images/avatars/2.png').default
    },
    {
      id: 16,
      billing: 'Auto Debit',
      fullName: 'Bentlee Emblin',
      company: 'Yambee PVT LTD',
      role: 'author',
      designation: 'Software Developer',
      department: 'IT',
      username: 'bemblinf',
      country: 'Spain',
      contact: '(590) 606-1056',
      email: 'bemblinf@wired.com',
      currentPlan: 'company',
      status: 'active',
      avatar: require('@src/assets/images/avatars/6.png').default
    },
    {
      id: 17,
      billing: 'Manual - Paypal',
      fullName: 'Brockie Myles',
      company: 'Wikivu PVT LTD',
      role: 'maintainer',
      designation: 'Software Developer',
      department: 'IT',
      username: 'bmylesg',
      country: 'Poland',
      contact: '(553) 225-9905',
      email: 'bmylesg@amazon.com',
      currentPlan: 'basic',
      status: 'active',
      avatar: '',
      avatarColor: 'light-warning'
    },
    {
      id: 18,
      billing: 'Manual - Cash',
      fullName: 'Bertha Biner',
      company: 'Twinte PVT LTD',
      role: 'editor',
      designation: 'Software Developer',
      department: 'IT',
      username: 'bbinerh',
      country: 'Yemen',
      contact: '(901) 916-9287',
      email: 'bbinerh@mozilla.com',
      currentPlan: 'team',
      status: 'active',
      avatar: require('@src/assets/images/avatars/7.png').default
    },
    {
      id: 19,
      billing: 'Manual - Cash',
      fullName: 'Travus Bruntjen',
      company: 'Cogidoo PVT LTD',
      role: 'admin',
      designation: 'Software Developer',
      department: 'IT',
      username: 'tbruntjeni',
      country: 'France',
      contact: '(524) 586-6057',
      email: 'tbruntjeni@sitemeter.com',
      currentPlan: 'enterprise',
      status: 'active',
      avatar: '',
      avatarColor: 'light-info'
    },
    {
      id: 20,
      billing: 'Auto Debit',
      fullName: 'Wesley Burland',
      company: 'Bubblemix PVT LTD',
      role: 'editor',
      designation: 'Manager',
      department: 'IT',
      username: 'wburlandj',
      country: 'Honduras',
      contact: '(569) 683-1292',
      email: 'wburlandj@uiuc.edu',
      currentPlan: 'team',
      status: 'inactive',
      avatar: require('@src/assets/images/avatars/6.png').default
    },
    {
      id: 21,
      billing: 'Auto Debit',
      fullName: 'Selina Kyle',
      company: 'Wayne Enterprises',
      role: 'admin',
      designation: 'Manager',
      department: 'Account',
      username: 'catwomen1940',
      country: 'USA',
      contact: '(829) 537-0057',
      email: 'irena.dubrovna@wayne.com',
      currentPlan: 'team',
      status: 'active',
      avatar: require('@src/assets/images/avatars/1.png').default
    },
    {
      id: 22,
      billing: 'Auto Debit',
      fullName: 'Jameson Lyster',
      company: 'Quaxo PVT LTD',
      role: 'editor',
      designation: 'Team Lead',
      department: 'IT',
      username: 'jlysterl',
      country: 'Ukraine',
      contact: '(593) 624-0222',
      email: 'jlysterl@guardian.co.uk',
      currentPlan: 'company',
      status: 'inactive',
      avatar: require('@src/assets/images/avatars/8.png').default
    },
    {
      id: 23,
      billing: 'Manual - Paypal',
      fullName: 'Kare Skitterel',
      company: 'Ainyx PVT LTD',
      role: 'maintainer',
      designation: 'Articleship',
      department: 'IT',
      username: 'kskitterelm',
      country: 'Poland',
      contact: '(254) 845-4107',
      email: 'kskitterelm@washingtonpost.com',
      currentPlan: 'basic',
      status: 'pending',
      avatar: require('@src/assets/images/avatars/3.png').default
    },
    {
      id: 24,
      billing: 'Manual - Paypal',
      fullName: 'Cleavland Hatherleigh',
      company: 'Flipopia PVT LTD',
      role: 'admin',
      designation: 'Articleship',
      department: 'IT',
      username: 'chatherleighn',
      country: 'Brazil',
      contact: '(700) 783-7498',
      email: 'chatherleighn@washington.edu',
      currentPlan: 'team',
      status: 'pending',
      avatar: require('@src/assets/images/avatars/2.png').default
    },
    {
      id: 25,
      billing: 'Manual - Credit Card',
      fullName: 'Adeline Micco',
      company: 'Topicware PVT LTD',
      role: 'admin',
      designation: 'Accountant',
      department: 'Account',
      username: 'amiccoo',
      country: 'France',
      contact: '(227) 598-1841',
      email: 'amiccoo@whitehouse.gov',
      currentPlan: 'enterprise',
      status: 'pending',
      avatar: '',
      avatarColor: 'light-primary'
    }
  ]
}

// GET ALL DATA
mock.onGet('/api/users/list/all-data').reply(200, data.users)

// POST: Add new user
mock.onPost('/apps/users/add-user').reply(config => {
  // Get event from post data
  const user = JSON.parse(config.data)
  const highestValue = data.users.reduce((a, b) => (a.id > b.id ? a : b)).id

  user.id = highestValue + 1

  data.users.push(user)

  return [201, { user }]
})

// GET Updated DATA
mock.onGet('/api/users/list/data').reply(config => {
  const {
    q = '',
    page = 1,
    role = null,
    perPage = 10,
    sort = 'asc',
    status = null,
    currentPlan = null,
    sortColumn = 'fullName'
  } = config

  /* eslint-disable  */
  const queryLowered = q.toLowerCase()

  const dataAsc = data.users.sort((a, b) => (a[sortColumn] < b[sortColumn] ? -1 : 1))

  const dataToFilter = sort === 'asc' ? dataAsc : dataAsc.reverse()

  const filteredData = dataToFilter.filter(
    user =>
      (user.email.toLowerCase().includes(queryLowered) ||
        user.fullName.toLowerCase().includes(queryLowered) ||
        user.billing.toLowerCase().includes(queryLowered)) &&
      user.role === (role || user.role) &&
      user.currentPlan === (currentPlan || user.currentPlan) &&
      user.status === (status || user.status)
  )
  /* eslint-enable  */

  return [
    200,
    {
      total: filteredData.length,
      users: paginateArray(filteredData, perPage, page)
    }
  ]
})

// GET USER
mock.onGet('/api/users/user').reply(config => {
  const { id } = config
  const user = data.users.find(i => i.id === id)
  return [200, { user }]
})

// DELETE: Deletes User
mock.onDelete('/apps/users/delete').reply(config => {
  // Get user id from URL
  let userId = config.id

  // Convert Id to number
  userId = Number(userId)

  const userIndex = data.users.findIndex(t => t.id === userId)
  data.users.splice(userIndex, 1)

  return [200]
})
