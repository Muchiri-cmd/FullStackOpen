import React from 'react'
import { Table } from 'react-bootstrap'
import userService from '../services/users'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'

const Users = () => {
  const [users,setUsers] = useState([])

  useEffect(()=>{
    const fecthUsers = async () => {
      try {
        const data = await userService.allUsers();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
    fecthUsers()
  },[])

  return (
    <>
      <h1>Users</h1>

      <Table striped>
        <thead>
          <tr>
            <th>User</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => 
            <tr key={user.id}>
              <td>
                  <Link to={`/${user.id}`}>{user.name}</Link>
              </td>
              <td>
                {user.blogs.length}
              </td>

            </tr>
          )}
        </tbody>

      </Table>
    </>
   
  )
}

export default Users
