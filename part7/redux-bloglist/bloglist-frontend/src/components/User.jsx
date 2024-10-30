import { useEffect,useState } from "react"
import { useParams } from "react-router-dom"
import userService from '../services/users'

const User = () => {
  const { id } = useParams()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await userService.getUserById(id)
        setUser(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchUser()
  }, [id])

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div>
       <h1>{user.name}</h1>
       <br />
       <h4>added blogs</h4>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>
            <p>{blog.title}</p>
         
          </li>
        ))}
      </ul>
    </div>
  )
}

export default User
