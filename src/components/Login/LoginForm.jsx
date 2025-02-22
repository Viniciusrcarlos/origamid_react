import React from 'react'
import { Link } from 'react-router-dom'
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';
import { TOKEN_POST, USER_GET } from '../../api';
import UserContext from '../../UserContext';

const LoginForm = () => {
  const username = useForm();
  const password = useForm();

  const {userLogin, error,loading} = React.useContext(UserContext); 

  async function handleSubmit(event) {
    event.preventDefault();

    const c1 = username.validate();
    const c2 = password.validate();

    if (c1 && c2) {
      userLogin(username.value, password.value)
    }
  }

  return (
    <section>

      <h1>Login</h1>

      <form action="" onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Senha" type="password" name="password" {...password}/>
        <Button>Entrar</Button>
        {error && <p>{error}</p>}
      </form>

      <Link to="/login/criar">Cadastros</Link>

    </section>
  )
}

export default LoginForm