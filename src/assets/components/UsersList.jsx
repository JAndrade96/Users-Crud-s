import axios from 'axios';
import React from 'react';

const UsersList = ({users, SelectUser, getUsers}) => {
    const deleteUser = (id) => {
        axios.delete(`https://users-crud1.herokuapp.com/users/${id}/`)
        .then(() => getUsers())
    }
    return (
        <ul className='users-list'>
        <div className='users-list-container'>
                {
                    users.map(user => (
                        <li key={user.id} className="user">
                            <div className='user-info'>
                                <span className='name'> {user.first_name} {user.last_name} </span>
                                <span className="email"> {user.email} </span>
                                <span className="birthday"> <i className="fas fa-birthday-cake"></i> {user.birthday} </span>
                            </div>
                            <div className='options'>
                            <button onClick={() => SelectUser(user)}> 
                                <i className="fas fa-pencil-alt"> </i>
                            </button>
                            <button onClick={() => deleteUser(user.id)}> 
                                <i style={{color: '#ef5350'}} className="fas fa-trash"></i> 
                            </button>
                            </div>
                        </li>
                    ))
                } 
            
        </div>
        </ul>
    );
};

export default UsersList;