import React from 'react'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import makeRequest from '../../../../services/api';
import AuthCard from '../Card';
import './styles.scss';

type FormState={
  username: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit } = useForm<FormState>();

  const onSubmit = (data: FormState) => {
    
    makeRequest.post('/auth/login', data)
      .then(response => {
        console.log(response)
      })
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
            <button className="btn btn-danger border-radius-10">
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