import { Button } from "@chakra-ui/react"
import { useAuth } from './../Auth';

export const Schedule = () => {
  const [, { logout }] = useAuth();
  return (
    <Button onClick={logout}>Sair</Button>
  )
}