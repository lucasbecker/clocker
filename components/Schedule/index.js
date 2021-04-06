import { Button } from "@chakra-ui/react"
import { firebaseClient } from './../../config/firebase/client';

export const Schedule = () => {
  const logout = () => firebaseClient.auth().signOut();
  return (
    <Button onClick={logout}>Sair</Button>
  )
}