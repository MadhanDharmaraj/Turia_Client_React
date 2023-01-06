// ** React Imports
import { Fragment } from 'react'
import Notes from '@src/views/apps/notes/index.js'
// ** Third Party Components
import 'cleave.js/dist/addons/cleave-phone.us'

// ** Images
const ConversationTab = () => {
  // ** Hook
  //** State */
  return (
    <Fragment>
      <Notes moduleName={'client'} moduleRefId={'1'} />
    </Fragment>
  )
}

export default ConversationTab
