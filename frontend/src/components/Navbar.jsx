import React, { useState } from 'react'
import {Link} from 'react-router-dom';
import {LogOut, Menu, Search} from 'lucide-react';
import { useAuthStore } from '../global/authUser';
import { contentStore } from '../global/content';
const Navbar = () => {
    const [isMobile,setIsMobile]=useState(false);

    const {user,logout}=useAuthStore();
    const toggleMobile=()=>{
        setIsMobile(!isMobile)
    };

    const {contentType,setContentType}=contentStore();
    console.log('content type: ',contentType);

  return (
    <header className='max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20'>
        <div className='flex items-center gap=10 z-50'>
            <Link to="/">
            <img src="/netflix-logo.png" alt="Netflix Logo" className='w-32 sm:w-40' />
            </Link>

            {/*Desktop Navbar items */}
            <div className='hidden sm:flex gap-2 items-center'>
                <Link to="/" className='hover:underline' onClick={()=>setContentType("movie")}>
                    Movies
                </Link>
                <Link to="/" className='hover:underline'onClick={()=>setContentType("tvShows")}>
                    TV Shows
                </Link>
                <Link to="/history" className='hover:underline'>
                    Search Log
                </Link>
            </div>
        </div>
        <div className='flex gap-2 items-center z-50'>
            <Link to={"/search"}>
                <Search className='size-6 cursor-pointer'/>
            </Link>
            <img src={user.image} alt='Avatar' className='h-8 rounded cursor-pointer'/>
            <LogOut className='size-6 cursor-pointer' onClick={logout}/>
            <div className='sm:hidden'>
                <Menu className='size-6 cursor-pointer' onClick={toggleMobile}/>
            </div>
        </div>

        {/*Mobile Navbar items */}
        {isMobile && (
            <div className='w-full sm:hidden mt-4 z-50 bg-black border rounded border-gray-950'>
                <Link to={"/"}
                    className='black hover:underline p-2'
                    onClick={toggleMobile}>
                        Movies
                </Link>
                <Link to={"/"}
                    className='black hover:underline p-2'
                    onClick={toggleMobile}>
                        TV Shows
                </Link>
                <Link to={"/history"}
                    className='black hover:underline p-2'
                    onClick={toggleMobile}>
                        Search Log
                </Link>
            </div>
        )}

    </header>
  )
}

export default Navbar