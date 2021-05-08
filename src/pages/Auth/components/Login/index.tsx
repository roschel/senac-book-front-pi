import React from 'react'
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { isAllowedRole, saveSessionData } from '../../../../core/components/utils/auth';
import {makeLogin} from '../../../../services/api';
import AuthCard from '../Card';
import './styles.scss';

type FormState={
  username: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit } = useForm<FormState>();
  const history = useHistory();

  const onSubmit = (data: FormState) => {
    console.log('data', data)
    
    makeLogin(data)
      .then(response => {
        saveSessionData(response.data)

        if(isAllowedRole(['ROLE_ADMIN'])){
          console.log('admin')
          console.log('response',response)
          if(!response.data.userStatus) {
            history.push('/auth/login')
            alert(`Usuário ${response.data.login} se encontra desativado`)
            return
          }
          history.push('/admin/products')
        }else{
          console.log('cliente')
          history.push('/')
        }
      })
      .catch(e => {
        console.log('erro', e)
        alert('usuário ou senha incorretos')
      })
  }

  const handleCancel = () => {
    history.push('/')
  }

  const handleRegister = () => {
    history.push('/client/register')
  }

  return (
    <div>
      <AuthCard title="login">
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="margin-bottom-30">
            <input
              type="email"
              name="username"
              ref={register({
                required:"Campo obrigatório",
                pattern:{
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message:"Email inválido"
                }
              })}
              placeholder="Email"
              className="form-control input-base"
            />
          </div>
          <div className="margin-bottom-30">
            <input
              type="password"
              name="password"
              ref={register({required: "Campo obrigatório"})}
              placeholder="Senha"
              className="form-control input-base"
            />
          </div>

          <div className="text-center">
            <button className="btn btn-danger border-radius-10" onClick={handleCancel}>
              Cancelar
            </button>

            <button className="btn btn-primary border-radius-10 ml-2">
              Entrar
            </button>
          </div>

          <div className="cadastrar">
            <div className="divisao">
              <div className="linha"/>
              <h4>ou</h4>
              <div className="linha"/>
            </div>
          
            <h4><strong>Crie uma conta</strong></h4>

            <button className="btn btn-primary border-radius-10 ml-2 mt-3" onClick={handleRegister}>
              Cadastre-se
            </button>
          </div>
        </form>
      </AuthCard>
    </div>
  )
}

export default Login