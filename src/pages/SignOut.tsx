import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate} from "react-router-dom"


function SignOut() {
    const navigate = useNavigate()    
    const { signout } = useAuth();
    signout()
    return (
      <>
      {navigate("/")}
      </>
    )
  }
  
  export default SignOut