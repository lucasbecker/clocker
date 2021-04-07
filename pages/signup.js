import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
  InputLeftAddon,
  InputGroup
} from '@chakra-ui/react';

import { Logo, useAuth } from '../components';

const validationSchema = yup.object().shape({
  email: yup.string().email('E-mail inválido!').required('Preenchimento obrigatório!'),
  password: yup.string().required('Preenchimento obrigatório!'),
  username: yup.string().required('Preenchimento obrigatório!')
});

export default function Signup() {
  const [ auth, { signup }] = useAuth();
  const router = useRouter();


  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting
  } = useFormik({
    onSubmit: signup,
    validationSchema,
    initialValues: {
      email: '',
      password: '',
      username: ''
    }
  })

  useEffect(() => {
    auth.user && router.push('/')
  }, [auth.user])

  return (
    <Container p={4} centerContent>
      <Logo />

      <Box p={4} mt={8}>
        <Text>Crie sua agenda compartilhada.</Text>
      </Box>

      <Box>
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

        <FormControl id='username' p={4}>
          <InputGroup>
            <InputLeftAddon>localhost:3000/</InputLeftAddon>
            <Input 
              type='username'
              value={values.username} 
              onChange={handleChange} 
              onBlur={handleBlur}
            />
          </InputGroup>
          {touched.username && 
            <FormHelperText textColor='#e74c3c'>
              {errors.username}
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

      <Link href="/">Já possui uma conta? Acesse.</Link>

    </Container>
  )
}
