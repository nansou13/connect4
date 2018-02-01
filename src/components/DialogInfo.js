import React from 'react'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

const DialogInfo = ({ values: { open, message, title }, handleClose, restart }) => {
  const actions = [
    <FlatButton label="Restart" primary onClick={restart} />,
    <FlatButton label="Close" primary onClick={handleClose} />,
  ]
  return (
    <Dialog
      actions={actions}
      title={title}
      modal={false}
      open={open}
      onRequestClose={handleClose}
    >
      <div className="dialogMessage">{message}</div>
    </Dialog>
  )
}

export default DialogInfo
