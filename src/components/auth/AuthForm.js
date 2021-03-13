import React from 'react'
import styled from 'styled-components'
import palette from '../../lib/style/palette';
import Button from '../common/Button'
import { Link } from 'react-router-dom';

const typeMap = {
  login: "Login",
  register: "Register"
}

const AuthFormBlock = styled.div`
  h3 {
    margin: 0;
    color: ${palette.gray[8]};
    margin-bottom: 1rem;
  }
`

const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[5]};
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid ${palette.gray[7]}
  }
  & + & {
    margin-top: 1rem;
  }
`

const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;
  a {
    color: ${palette.gray[6]};
    text-decoration: underline;
    &:hobor {
      color: ${palette.gray[9]};
    }
  }
`

const ButtonWithMarginTop = styled(Button)`
  margin-top: 1rem;
`

const AuthForm = ({ type, form, onChange, onSubmit }) => {
  const header = typeMap[type]
  return (
    <AuthFormBlock>
      <h3>{header}</h3>
      <form onSubmit={onSubmit}>
        <StyledInput 
          autoComplete="username" 
          name="id" 
          placeholder="ID"
          onChange={onChange}
          value={form.id}
        />
        <StyledInput 
          autoComplete={type === "login" ? "password" : "new-password"}
          name="password" 
          placeholder="PASSWORD" 
          type="password"
          onChange={onChange}
          value={form.password}
        />
        {
          type === 'register' && (
            <StyledInput
              autoComplete="new-password"
              name="passwordConfirm"
              placeholder="PASSWORD CONFIRM"
              type="password"
              onChange={onChange}
              value={form.passwordConfirm}
            />
          )
        }
        <ButtonWithMarginTop cyan fullWidth>{header}</ButtonWithMarginTop>
      </form>
      <Footer>
        { 
          type === 'login' 
            ? (<Link to="/register">Register</Link>)
            : (<Link to="/login">Login</Link>)
        }
      </Footer>
    </AuthFormBlock>
  )
}

export default AuthForm