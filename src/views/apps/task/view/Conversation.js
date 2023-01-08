// ** React Imports
import { Fragment } from 'react'
import Notes from '@src/views/apps/notes/index.js'
// ** Third Party Components
import 'cleave.js/dist/addons/cleave-phone.us'
import { useParams } from 'react-router-dom'

// ** Images
const ConversationTab = (data) => {
  // ** Hook
  //** State */
  const { id } = useParams()

  return (
    <Fragment>
      <Notes moduleName={'task'} moduleRefId={id} tabId={data.tabId} />
    </Fragment>
  )
}

export default ConversationTab
