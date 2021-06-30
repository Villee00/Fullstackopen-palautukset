import { useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { LOGIN_USER } from '../queries'


const LoginForm = ({ show, setToken, setPage, notification }) => {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN_USER, {
    onError: (error) => {
      throw notification(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-token', token)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data])


  if (!show) {
    return null
  }
  const submit = async () => {
    try {
      await login({ variables: { username, password } })
      setUserName('')
      setPassword('')
      setPage('authors')
    } catch (error) {

    }

  }
  return (
    <div>
      Username: <input type="text" value={username} onChange={({ target }) => setUserName(target.value)} />
      Password: <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
      <button onClick={() => submit()}>login</button>
    </div>
  )
}

export default LoginForm