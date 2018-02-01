import {
  APP_LOAD,
  DIALOG_OPEN,
  DIALOG_CLOSE,
  FINISH,
  DRAW,
} from '../action-creator'

const defaultState = {
  open: false,
  title: null,
  message: null,
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case DIALOG_OPEN:
      return {
        open: true,
        message: action.payload.message || null,
        title: action.payload.title || null,
      }
    case FINISH:
      const { list, current } = action.payload.players
      return {
        open: true,
        ...getMessageDialog('finish', list[current].name),
      }
    case DRAW:
      return {
        open: true,
        ...getMessageDialog('draw'),
      }
    case APP_LOAD:
    case DIALOG_CLOSE:
      return defaultState
    default:
      return state
  }
}

export function winnerDialog(name) {
  const title = `CONGRATULATION`
  const message = `${name} is the winner`
  return { type: DIALOG_OPEN, payload: { title, message } }
}

export function getMessageDialog(type, value) {
  let title,
    message = ''

  switch (type) {
    case 'finish':
      title = `CONGRATULATION`
      message = `${value} is the winner`
      break
    case 'draw':
      title = `oh no...`
      message = 'draw ! nobody wins...'
      break
    default:
  }
  return { title, message }
}
