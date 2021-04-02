import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useParams } from 'react-router'
import Select from 'react-select'

import { Category, Image } from '../../../../../../core/components/types/Product'
import { Role } from '../../../../../../core/components/types/User'
import makeRequest from '../../../../../../services/api'
import BaseForm from '../../../BaseForm'
import Upload from '../../../Products/Upload'
import './styles.scss'


type FormState = {
  name: string;
  cpf: string;
  endereco: string;
  login: string;
  password: string;
  email: string;
  roles: Role[];
}

type ParamsType = {
  userId: string;
}

const Form = () => {
  const { register, handleSubmit, setValue, control } = useForm<FormState>();
  const { userId: userId } = useParams<ParamsType>();
  const isEditing = userId !== 'create'
  const formTitle = isEditing ? 'EDITAR USUÁRIO' : 'CADASTRAR USUÁRIO';
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (isEditing) {
      makeRequest.get(`/users/${userId}`)
        .then(response => {
          setValue('name', response.data.name);
          setValue('cpf', response.data.cpf);
          setValue('login', response.data.login);
          setValue('password', response.data.password);
          setValue('email', response.data.email);
          setValue('zipCode', response.data.address.zipCode)
          setValue('address', response.data.address.address)
          setValue('number', response.data.address.number)
          setValue('addressComplement', response.data.address.addressComplement)
          setValue('city', response.data.address.city)
          setValue('state', response.data.address.state)
          setValue('country', response.data.address.country)
          setValue('roles', response.data.roles);
          setDisabled(response.data.status)
        })
    }

  }, [userId, isEditing, setValue])


  const onSubmit = (formData: FormState) => {
    const payLoad = {
      ...formData
    }

    if (isEditing) {
      makeRequest.put(`/users/${userId}`, payLoad)
        .then(() => {
          alert('Usuário editado com sucesso')
        })
        .catch(() => {
          alert('Usuário não editado')
        })
    } else {
      makeRequest.post(`/users`, payLoad)
        .then((response) => {
          alert('Usuário adicionado com sucesso')
        })
        .catch(() => {
          alert('Usuário não adicionado')
        })
    }
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <BaseForm title={formTitle} buttonTitle={formTitle}>
        <div className="row">
          <div className="col-6">
            <input
              ref={register()}
              type="text"
              className="form-control mb-5"
              name="name"
              placeholder="Nome do Usuário"
              disabled={!disabled}
            />

            <input
              ref={register()}
              type="text"
              className="form-control mb-3"
              name="zipCode"
              placeholder="CEP"
              disabled={!disabled}
            />

            <input
              ref={register()}
              type="number"
              className="form-control mb-3"
              name="number"
              placeholder="Número"
              disabled={!disabled}
            />
          </div>
          <div className="col-6">
            <input
              ref={register()}
              type="text"
              className="form-control mb-5"
              name="cpf"
              placeholder="Digite o seu CPF"
              disabled={!disabled}
            />

            <input
              ref={register()}
              type="text"
              className="form-control mb-3"
              name="address"
              placeholder="Logradouro"
              disabled={!disabled}
            />

            <input
              ref={register()}
              type="text"
              className="form-control mb-3"
              name="addressComplement"
              placeholder="Complemento"
              disabled={!disabled}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-4">
            <input
              ref={register()}
              type="text"
              className="form-control mb-5"
              name="city"
              placeholder="Cidade"
              disabled={!disabled}
            />
          </div>
          <div className="col-4">
            <input
              ref={register()}
              type="text"
              className="form-control mb-5"
              name="state"
              placeholder="Estado"
              disabled={!disabled}
            />
          </div>
          <div className="col-4">
            <input
              ref={register()}
              type="text"
              className="form-control mb-5"
              name="country"
              placeholder="País"
              disabled={!disabled}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <input
              ref={register()}
              type="text"
              className="form-control mb-3"
              name="login"
              placeholder="Login: exemplo@email.com"
              disabled={!disabled}
            />
          </div>
          <div className="col-6">
            <input
              ref={register()}
              type="password"
              className="form-control mb-3"
              name="password"
              placeholder="Senha"
              disabled={!disabled}
            />
          </div>
        </div>
      </BaseForm>
    </form>

  )
}

export default Form;