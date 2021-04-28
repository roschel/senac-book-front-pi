import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { Address } from '../../../../core/components/types/Client';
import { saveSessionData } from '../../../../core/components/utils/auth';
import { makeLogin, makePrivateRequest, makeRequest } from '../../../../services/api';
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
  const { register, handleSubmit, setValue, control } = useForm<FormState>();
  const { clientId } = useParams<ParamsType>();
  const isEditing = clientId !== 'create'
  const formTitle = 'DADOS';
  const button = 'ATUALIZAR DADOS';
  const [disabledCpf, setDisabledCpf] = useState(true);
  const [disabledLogin, setDisabledLogin] = useState(true);
  const history = useHistory();


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
  console.log(formData)
}

return (
  <div className="container mt-3">
    <form onSubmit={handleSubmit(onSubmit)} className="form-client">
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
              disabled={!disabledCpf}
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
              disabled={!disabledLogin}
            />
            <input
                ref={register()}
                className="form-control mb-2"
                type="password"
                name="password"
                placeholder="Senha"
                hidden
              />
          </div>
        </div>
      </BaseForm>
    </form>
  </div>
)
}

export default ClientData;