import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import UsersFrom from './assets/components/UsersFrom'
import UsersList from './assets/components/UsersList'
import axios from 'axios'

function App() {
  const [users, setUsers] = useState([])
  const [usersSelect, setUsersSelect] = useState(null)
  const [modalNotification, setModalNotification] = useState({message: "", type: "", isOpen: false})

  useEffect(() => {
    axios.get("https://users-crud1.herokuapp.com/users/")
      .then(res => setUsers(res.data))
  },[])

  const getUsers = () => {
    axios.get("https://users-crud1.herokuapp.com/users/")
    .then(res => setUsers(res.data))
  }

  const SelectUser = (user) => {
    setUsersSelect(user)
  }

  const notification = message => () => {
    getUsers()
    setModalNotification({message, type:"success", isOpen: true})
  }

  const deselectUsers = () => setUsersSelect(null)

  return (
    <div className="App">
      <UsersFrom 
        getUsers={getUsers} 
        usersSelect={usersSelect} 
        deselectUsers={deselectUsers}
        notification={notification}
        />

      <UsersList 
        users={users} 
        SelectUser={SelectUser}
        getUsers={getUsers}
        />
    </div>
  )
}

export default App
