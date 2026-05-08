import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Login = ({ setToken, setRole }) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      // 💡 ጥያቄውን ወደ ሰራተኛው ሎጊን Endpoint እንልካለን
      const response = await axios.post(backendUrl + '/api/staff/login', { email, password });

      if (response.data.success) {
        const { token, role, name } = response.data;

        // 1. መረጃውን በ State እናስቀምጣለን
        setToken(token);
        setRole(role);

        // 2. ለቀጣይ ሪፍሬሽ እንዲሆን በ LocalStorage እናስቀምጣለን
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        localStorage.setItem('name', name);

        toast.success(`እንኳን ደህና መጡ ${name}!`);
      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "የሎጊን ስህተት ተፈጥሯል");
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center w-full'>
      <div className='bg-white shadow-md rounded-lg px-8 py-10 max-w-md'>
        <h1 className='text-2xl font-bold mb-4'>Staff & Admin Login</h1>
        <form onSubmit={onSubmitHandler}>
          <div className='mb-3 min-w-72'>
            <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
            <input onChange={(e) => setEmail(e.target.value)} value={email} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="email" placeholder='your@email.com' required />
          </div>
          <div className='mb-3 min-w-72'>
            <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
            <input onChange={(e) => setPassword(e.target.value)} value={password} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="password" placeholder='Enter your password' required />
          </div>
          <button className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black' type="submit"> Login </button>
        </form>
      </div>
    </div>
  )
}

export default Login