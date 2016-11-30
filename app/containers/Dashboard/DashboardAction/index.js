import React from 'react'
import QuickText from './QuickText'
import QuickUpload from './QuickUpload'
import QuickURL from './QuickURL'

export const DashboardAction = ({ option, pushKey, resetUI:onClose }) => {
  switch (option) {
    case 'write':
      return <QuickText pushKey={pushKey} />
    case 'upload':
      return <QuickUpload pushKey={pushKey} />
    case 'link':
      return <QuickURL pushKey={pushKey} />
    default:
      return null
  }
}

export default DashboardAction
