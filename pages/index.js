import { Login, Schedule, useAuth } from './../components';
import { Spinner, Container  } from '@chakra-ui/react';

export default function Home() {
  const [auth] = useAuth();

  if(auth.loading) {
    return (
      <Container p={4} centerContent>
        <Spinner />
      </Container>
    )
  }

  return auth.user? <Schedule/> : <Login />;
}