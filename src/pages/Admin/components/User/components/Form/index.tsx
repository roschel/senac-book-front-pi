import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useHistory, useParams } from 'react-router'
import Select from 'react-select'
import { Flip, toast, ToastContainer } from 'react-toastify'

import { Roles } from '../../../../../../core/components/types/User'
import { makePrivateRequest } from '../../../../../../services/api'
import BaseForm from '../../../BaseForm'
import './styles.scss'


type FormState = {
  name: string;
  cpf: string;
  endereco: string;
  login: string;
  password: string;
  status: boolean;
  roles: Roles[];
}

type ParamsType = {
  userId: string;
}

const Form = () => {
  const { register, handleSubmit, setValue, control } = useForm<FormState>();
  const { userId } = useParams<ParamsType>();
  const isEditing = userId !== 'create'
  const formTitle = isEditing ? 'EDITAR USUÁRIO' : 'CADASTRAR USUÁRIO';
  const [disabled, setDisabled] = useState(true);
  const [disabledLogin, setDisabledLogin] = useState(true);
  const [roles, setRoles] = useState<Roles[]>([])
  const history = useHistory();

  const notifySuccess = (message: string) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      closeButton: false,
    })
  };

  const notifyError = (message: string) => {
    toast.error(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      closeButton: false,
    })
  };

  useEffect(() => {
    if (isEditing) {
      makePrivateRequest({ url: `/users/${userId}` })
        .then(response => {
          setValue('name', response.data.name);
          setValue('cpf', response.data.cpf);
          setValue('login', response.data.login);
          setValue('password', response.data.password);
          setValue('status', response.data.status);
          setValue('zipCode', response.data.zipCode);
          setValue('address', response.data.address);
          setValue('number', response.data.number);
          setValue('addressComplement', response.data.addressComplement);
          setValue('city', response.data.city);
          setValue('state', response.data.state);
          setValue('country', response.data.country);
          setValue('roles', response.data.roles);
          setDisabled(response.data.status);
          setDisabledLogin(false);
        })
    }

  }, [userId, isEditing, setValue])

  useEffect(() => {
    makePrivateRequest({ url: '/roles' })
      .then(response => setRoles(response.data))
      .catch(() => {
        alert("Ocorreu um problema ao carregar as permissões")
      })
  }, []);


  const onSubmit = (formData: FormState) => {
    const payLoad = {
      ...formData
    }

    console.log('paylooooooooooooooooooad', payLoad)

    if (isEditing) {
      makePrivateRequest({ url: `/users/${userId}`, data: payLoad, method: "PUT" })
        .then(() => {
          notifySuccess('Usuário editado com sucesso')
          // history.push(`/admin/users`)
        })
        .catch(() => {
          notifyError('Usuário não editado')
        })
    } else {
      makePrivateRequest({ url: `/users`, data: payLoad, method: "POST" })
        .then(() => {
          // alert('Usuário adicionado com sucesso')
          history.push('/admin/users')
        })
        .catch(() => {
          alert('Usuário não adicionado')
        })
    }
  }


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="form-container">
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
                readOnly={!disabled || !disabledLogin}
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
          <div className="row">
            <div className="col-6">
              <Controller
                as={Select}
                defaultValue=""
                name="roles"
                rules={{ required: true }}
                control={control}
                options={roles}
                getOptionLabel={(option: Roles) => option.authority}
                getOptionValue={(option: Roles) => String(option.id)}
                classNamePrefix="roles-select"
                placeholder="Permissões"
                isMulti
                isDisabled={!disabled}
              />
            </div>
            <input
              ref={register()}
              type="checkbox"
              className="form-check-input"
              name="status"
              disabled={!disabled}
              hidden
            />
          </div>
        </BaseForm>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Flip}
        style={{ width: "auto", color: "var(--white-equals)" }}
      />
    </>
  )
}

export default Form;