import { createAction, handleActions } from 'redux-actions'
import produce from 'immer'
import  { takeLatest } from 'redux-saga/effects'
import * as authAPI from '../lib/api/auth'
import createRequestSaga from '../lib/saga/createRequestSaga'

// action types
const CHANGE_FIELD = 'auth/CHANGE_FIELD'
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM'

const REGISTER = 'auth/REGISTER'
const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS'
const REGISTER_FAILURE = 'auth/REGISTER_FAILURE'

const LOGIN = 'auth/LOGIN'
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS'
const LOGIN_FAILURE = 'auth/LOGIN_FAILURE'

// actions def
export const changeFiled = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form,
    key,
    value
  })
)
export const initializeForm = createAction(
  INITIALIZE_FORM, form => form
)
export const register = createAction(
  REGISTER, ({ id, password }) => ({ id, password })
)
export const login = createAction(
  LOGIN, ({ id, password }) => ({ id, password })
)

const registerSaga = createRequestSaga(REGISTER, authAPI.register)
const loginSaga = createRequestSaga(LOGIN, authAPI.login)

export function* authSaga() {
  yield takeLatest(REGISTER, registerSaga)
  yield takeLatest(LOGIN, loginSaga)
}

const initialState = {
  register: {
    id: '',
    password: '',
    passwordConfirm: ''
  },
  login: {
    id: '',
    password: ''
  }
}

// action reducer
const auth = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) => 
      produce(state, draft => {
        draft[form][key] = value
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form]
    }),
    [REGISTER_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth
    }),
    [REGISTER_FAILURE]: (state, { payload: err }) => ({
      ...state,
      authError: err
    }),
    [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth
    }),
    [LOGIN_FAILURE]: (state, { payload: err }) => ({
      ...state,
      authError: err
    })
  },
  initialState
)

export default auth