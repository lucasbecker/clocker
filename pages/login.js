import Link from 'next/link';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { 
  Container, 
  Box, 
  Text, 
  Input, 
  FormControl, 
  FormLabel, 
  FormHelperText,
  Button, 
} from '@chakra-ui/react';

import firebase from './../config/firebase';
import { Logo } from './../components';

const validationSchema = yup.object().shape({
  email: yup.string().email('E-mail inválido!').required('Preenchimento obrigatório!'),
  password: yup.string().required('Preenchimento obrigatório!'),
});

export default function Home() {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting
  } = useFormik({
    onSubmit: async ({email, password, username}, form) => {
      try {
        const user = await firebase.auth().signInWithEmailAndPassword(email, password);
        console.log(user);
      } catch(error) {
        console.log('ERROR: ', error);
      }
    },
    validationSchema,
    initialValues: {
      email: '',
      password: '',
      username: ''
    }
  })
  return (
    <Container p={4} centerContent>
      <Logo />

      <Box p={4} mt={8}>
        <Text>Acesse sua agenda compartilhada.</Text>
      </Box>

      <Box width='380px'>
        <FormControl id='email' p={4}>
          <FormLabel>Email</FormLabel>
          <Input 
            type='email' 
            value={values.email} 
            onChange={handleChange} 
            onBlur={handleBlur}
          />
          {touched.email && 
            <FormHelperText textColor='#e74c3c'>
              {errors.email}
            </FormHelperText>
          }
        </FormControl>

        <FormControl id='password' p={4}>
          <FormLabel>Senha</FormLabel>
          <Input 
            type='password' 
            value={values.password} 
            onChange={handleChange} 
            onBlur={handleBlur}
          />
          {touched.password && 
            <FormHelperText textColor='#e74c3c'>
              {errors.password}
            </FormHelperText>
          }
        </FormControl>

        <FormControl id='submit' p={4}>
          <Button 
            backgroundColor='#4E84D4' 
            width='100%' color='#FFF' 
            textTransform='uppercase'
            _hover={{ bg: "#2B3C54" }}
            onClick={handleSubmit}
            isLoading={isSubmitting}
          >
            Entrar
          </Button>
        </FormControl>
      </Box>
      
      <Link href="/">Ainda não tem uma conta? Cadastre-se.</Link>

    </Container>
  )
}
