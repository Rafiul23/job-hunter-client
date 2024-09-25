'use client';
import {useEffect, useState} from 'react';
import axios from 'axios';

const ManageUsers = ()=>{

    const [users, setUsers] = useState([]);    

   useEffect(()=>{
    axios.get('http://localhost:5000/users')
    .then(res=> setUsers(res.data))
   }, [])

    return (
        <div className='py-5 px-5'>
            <h2 className='text-center text-3xl font-bold text-[#033f63] py-4'>Users: {users?.length}</h2>
            
        </div>
    )
}

export default ManageUsers;