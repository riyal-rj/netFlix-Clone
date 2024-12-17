import React from 'react'

import HomeScreen from './HomeScreen'
import AuthScreen from './AuthScreen';
import { useAuthStore } from '../../global/authUser';

const HomePage = () => {
  const {user}=useAuthStore();
  return (
   <div>
     {user ? <HomeScreen/>:<AuthScreen/>}
   </div>
  )
}

export default HomePage