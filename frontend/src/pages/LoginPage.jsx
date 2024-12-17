import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../global/authUser';

const LoginPage = () => {
  
  const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { login, isLoggingIn } = useAuthStore();

	const handleLogin = (e) => {
		e.preventDefault();
		login({ email, password });
	};

  return (
    <div className='h-screen w-full hero_bg'>
    <header className='max-w-6xl mx-auto flex items-center justify-between p-4'>
      <Link to={"/"}>
      <img src="/netflix-logo.png" alt="logo" className='w-52'/>
      </Link>
    </header>
    <div className='flex justify-center items-center mt-20 mx-3'>
        <div className='w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md'>
            <h1 className='text-center text-white text-2xl font-bold mb-4'>
              Login
            </h1>
            <form className='space-y-4' onSubmit={handleLogin} >
                <div>
                  <label htmlFor='email' className='text-sm font-medium text-gray-300 block'>
                    Email
                  </label>
                  <input type='email' 
                    className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
                    placeholder='Enter your email address' 
                    id='email'  
                    value={email}
                    onChange={(event)=>setEmail(event.target.value)}                  
                  />
                </div>

                <div>
                  <label htmlFor='Password' className='text-sm font-medium text-gray-300 block'>
                    Password
                  </label>
                  <input type='password' 
                    className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
                    placeholder='Password' 
                    id='password'   
                    value={password}
                    onChange={(event)=>setPassword(event.target.value)}                 
                  />
                </div>

                <button className='w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700'>
                  Login
                </button>
            </form>
            <div className='text-center text-gray-400'>
                New to Netflix{" "}
                <Link to={"/signup"} className='text-red-500 hover:underline'>
                  Sign Up{" "}
                </Link>
                now
            </div>
        </div>
    </div>
  </div>
  )
}

export default LoginPage