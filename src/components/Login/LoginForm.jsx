import React from 'react'
import { Link } from 'react-router-dom'
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';
import { TOKEN_POST, USER_GET } from '../../api';

const LoginForm = () => {
  const username = useForm();
  const password = useForm();

  React.useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (token) {
      getUser(token);
    }

  }, [])

  async function getUser(token) {
    const {url, options} = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    console.log("Usuario: " + json.nome);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const c1 = username.validate();
    const c2 = password.validate();

    if (c1 && c2) {
      const {url, options} = TOKEN_POST({username: username.value, password: password.value});

      const response = await fetch(url, options);
      const json = await response.json();
      window.localStorage.setItem('token', json.token);
      getUser(json.token);
    }

    
  }

  return (
    <section>

      <h1>Login</h1>

      <form action="" onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Senha" type="password" name="password" {...password}/>
        <Button>Entrar</Button>
      </form>

      <Link to="/login/criar">Cadastros</Link>

    </section>
  )
}

export default LoginForm