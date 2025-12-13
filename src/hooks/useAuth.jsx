import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext';

function useAuth() {
 const authInfo =    useContext(AuthContext);

  return authInfo;
}

export default useAuth
