import axios from 'axios';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const UsersFrom = ({getUsers, usersSelect, deselectUsers }) => {
    const{register, handleSubmit, reset} = useForm()

    useEffect(() => {
        if(usersSelect){
            reset(usersSelect)
        }
    },[usersSelect])

    const submit = (data) => {
        if(usersSelect){
           axios.put(`https://users-crud1.herokuapp.com/users/${usersSelect.id}/`, data)
            .then(() => getUsers(""))
        } else{
            axios.post("https://users-crud1.herokuapp.com/users/", data)
            .then(() => getUsers(""))
            .catch(error => console.log(error.response))
        }
        clearUser()
    }

    const clearUser = () =>{
        reset({
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            birthday: "",
        })
        deselectUsers()
    }

    return (
        <div className='users-from'>
        <form onSubmit={handleSubmit(submit)}>
            <h2>NEW USERS</h2>
            <div className="input-container">
                <label htmlFor="first_name"><i className="fas fa-user"></i></label> 
                <label htmlFor="last_name"></label>
                <div className='input-name'>
                <input type="text" id="first_name" placeholder='first name' {...register("first_name")}  />
                <input type="text" id="last_name" placeholder='last name' {...register("last_name")} />
                </div>
            </div>
            <div className="input-container">
                <label htmlFor="email"><i className="fas fa-envelope"></i></label>
                <input type="email" id="email" placeholder='email' {...register("email")} />
            </div>
            <div className="input-container">
                <label htmlFor="password"><i className="fas fa-lock"></i></label>
                <input type="password" id="password" placeholder='password' {...register("password")} />
            </div>
            <div className="input-container">
                <label htmlFor="birthday"><i className="fas fa-birthday-cake"></i></label>
                <input type="date" id="birthday" placeholder='password' {...register("birthday")} />
            </div>
            <div className='button-users'>
            <button className='button-registre'> Register </button>
            {
                usersSelect && (
                <button onClick={clearUser} type="button" className='button-clear'> Clear </button>
                )
            }
            </div>
        </form>
        </div>
    );
};

export default UsersFrom;