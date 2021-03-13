import { createAction, handleActions } from 'redux-actions'

const START_LOGDING = 'loadind/START_LOADING'
const FINISH_LOGDING = 'loadind/FINISH_LOADING'

export const startLoading = createAction(
  START_LOGDING,
  requestType => requestType
)

export const finishLoading = createAction(
  FINISH_LOGDING,
  requestType => requestType
)

const initialState = {}

//loading start, end toggle
const loading = handleActions(
  {
    [START_LOGDING]: (state, action) => ({
      ...state,
      [action.payload]: true
    }),
    [FINISH_LOGDING]: (state, action) => ({
      ...state,
      [action.payload]: false
    })
  },
  initialState
)

export default loading