import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const users = useSelector(state => state.users)
  return(
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Blogs created</th>
          </tr>

          {users.map(u =>
            <tr key={u.id}>
              <Link to={`/users/${u.id}`}>
                <td >{u.name}</td>
              </Link>
              <td>{u.blogs.length}</td>
            </tr>)}
        </tbody>
      </table>
    </div>)
}

export default Users