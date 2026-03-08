import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [loggedInUser, setSignedInUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  console.log('Current user:', loggedInUser);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      setSignedInUser(user);
      setAuthLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{ loggedInUser, setSignedInUser, authLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);

export default AuthContext;
