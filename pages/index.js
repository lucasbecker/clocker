import { Login, Schedule } from './../components';
import { firebaseClient } from './../config/firebase/client';
import { useState, useEffect } from 'react';
import { Spinner, Container  } from '@chakra-ui/react';

export default function Home() {
  const [auth, setAuth] = useState({
    loading: true,
    user: false
  })
  
  useEffect(() => {
    firebaseClient.auth().onAuthStateChanged(user => {
      setAuth({
        loading: false,
        user
      })
    })
  }, [])

  if(auth.loading) {
    return (
      <Container p={4} centerContent>
        <Spinner />
      </Container>
    )
  }

  return auth.user? <Schedule/> : <Login />;
}