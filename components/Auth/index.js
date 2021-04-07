import { useState, createContext, useEffect, useContext } from "react";

import { firebaseClient, persistenceMode } from './../../config/firebase/client';

const AuthContext = createContext([{}, () => { }]);

export const login = async ({ email, password }) => {
  firebaseClient.auth().setPersistence(persistenceMode);

  try {
    await firebaseClient.auth().signInWithEmailAndPassword(email, password);
    return firebaseClient.auth().currentUser;
  } catch(error) {
    console.log('LOGIN ERROR: ', error);
  }
}

export const logout = () => firebaseClient.auth().signOut();

export const signup = async ({email, password, username}) => {
  try {
    await firebaseClient.auth().createUserWithEmailAndPassword(email, password);
    const user = await login({ email, password });
    const token = await user.getIdToken();

    const { data } = await axios({
      method: 'post',
      url: '/api/profile',
      headers: {
        'Authorization': `Bearer ${token}` 
      },
      data: {
        username: username
      }
    });

    console.log(data);
  } catch (error) {
    console.log('SIGNUP ERROR: ', error);
  }
}

export const useAuth = () => {
  const [auth] = useContext(AuthContext);
  return [auth, { login, logout, signup }];
}

export const AuthProvider = ({ children }) => {
  const [state, setState] = useState({
    loading: true,
    user: false
  });

  useEffect(() => {
    const unsubscribe = firebaseClient.auth().onAuthStateChanged(user => {
      setState({
        loading: false,
        user
      })
    })

    return () => unsubscribe();
  }, [])

  return (
    <AuthContext.Provider value={[state, setState]}>
      {children}
    </AuthContext.Provider>
  );
}