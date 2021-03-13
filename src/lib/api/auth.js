import client from './client'

export const login = ({ id, password }) => {
  client.post('/api/user/login', ({ id, password }))
}

export const register = ({ id, password }) => {
  client.post('api/user/register', ({ id, password }))
}

export const user = () => {
  client.get('api/user/user')
}