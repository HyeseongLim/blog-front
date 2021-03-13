import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeFiled, initializeForm, register } from '../../modules/auth'
import AuthForm from '../../components/auth/AuthForm'
import { withRouter } from 'react-router-dom'

const RegisterForm = (props) => {
  const dispatch = useDispatch()
  const { form, auth, authError } = useSelector(({ auth }) => ({
    form: auth.register,
    auth: auth.auth,
    authError: auth.authError
  }))

  const onChange = (e) => {
    const { value, name } = e.target
    dispatch(
      changeFiled({
        form: 'register',
        key: name,
        value
      })
    )
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const { id, password, passwordConfirm } = form
    
    if (password !== passwordConfirm) {
      // 패스워드 다를 때 에러처리
      return
    }
    dispatch(register({ id, password }))
  }

  useEffect(() => {
    dispatch(initializeForm('register'))
  },[dispatch])

  useEffect(() => {
    if(authError) {
      console.log('register fialure')
      console.log(authError)
      return
    } 
    if(auth) {
      console.log('register success')
    }
  }, [auth, authError])

  return (
    <AuthForm
      type="register"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  )
}

export default withRouter(RegisterForm)