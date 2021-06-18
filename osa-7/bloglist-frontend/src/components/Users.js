import { Table, TableContainer, TableBody, TableRow, TableCell, TableHead, Typography } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const users = useSelector(state => state.users)
  return(
    <div>
      <Typography variant="h5">Users</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell align="right">Blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(u =>
              <TableRow key={u.id}>
                <TableCell>
                  <Link to={`/users/${u.id}`}>
                    {u.name}
                  </Link>
                </TableCell>
                <TableCell align="right">{u.blogs.length}</TableCell>
              </TableRow>)}
          </TableBody>
        </Table>
      </TableContainer>
    </div>)
}

export default Users