import React from 'react'
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { saveSessionData } from '../../../../core/components/utils/auth';
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
        console.log('response',response)
        saveSessionData(response.data)
        history.push('/admin/products')
      })
  }

  const handleCancel = () => {
    history.push('/')
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
              Logar
            </button>
          </div>

        </form>
      </AuthCard>

    </div>
  )
}

export default Login