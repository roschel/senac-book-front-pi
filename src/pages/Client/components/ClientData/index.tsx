import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { Flip, toast, ToastContainer } from 'react-toastify';
import { makePrivateRequest } from '../../../../services/api';
import BaseForm from '../../../Admin/components/BaseForm';
import './styles.scss';

type FormState = {
  id: number;
  firstName: string;
  lastName: string;
  cpf: string;
  login: string;
  password: string;
  status: boolean;
}

type ParamsType = {
  clientId: string;
}

const ClientData = () => {
  const { register, handleSubmit, setValue } = useForm<FormState>();
  const { clientId } = useParams<ParamsType>();
  const isEditing = clientId !== 'create'
  const formTitle = 'DADOS';
  const button = 'ATUALIZAR DADOS';
  const [disabledCpf] = useState(true);
  const [disabledLogin] = useState(true);
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
    makePrivateRequest({ url: `/clients/${clientId}` })
      .then(response => {
        setValue('firstName', response.data.firstName)
        setValue('lastName', response.data.lastName)
        setValue('cpf', response.data.cpf)
        setValue('login', response.data.login)
        setValue('password', response.data.password)
      })
  }, [clientId, isEditing, setValue])

  const onSubmit = (formData: FormState) => {
    const payload = {
      ...formData
    }

    makePrivateRequest({ url: `/clients/${clientId}`, data: payload, method: "PUT" })
      .then(() => {
        history.push(`/client/${clientId}`)
        notifySuccess('Dados atualizados')
      })
      .catch(() => {
        notifyError('Cliente não editado.')
      })
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="form-client container-form">
        <BaseForm title={formTitle} buttonTitle={button}>
          <div className="row">

            <div className="col-6">

              <input
                ref={register()}
                className="form-control mb-3"
                type="text"
                name="firstName"
                placeholder="Nome"
                tabIndex={1}
              />

              <input
                ref={register()}
                className="form-control mb-5 cpf-mask"
                type="text"
                placeholder="CPF"
                name="cpf"
                readOnly={disabledCpf}
                tabIndex={3}
              />

            </div>
            <div className="col-6">
              <input
                ref={register()}
                className="form-control mb-5"
                type="text"
                name="lastName"
                placeholder="Sobrenome"
                tabIndex={2}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-8 client-login">
              <label className="titulo-card mt-2">Dados de Acesso</label>
              <input
                ref={register()}
                className="form-control mb-2"
                type="text"
                placeholder="Email"
                name="login"
                readOnly={disabledLogin}
              />
              <input
                ref={register()}
                className="form-control mb-2"
                type="password"
                name="password"
                placeholder="Senha"
                readOnly

              />
            </div>
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

export default ClientData;