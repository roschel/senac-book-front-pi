import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { Address } from '../../../../core/components/types/Client';
import { makePrivateRequest, makeRequest } from '../../../../services/api';
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
  zipCode: string;
  address: string;
  number: number;
  addressComplement: string;
  city: string;
  state: string;
  neighborhood: string;
  payment: boolean;
  zipCode2: string;
  address2: string;
  number2: number;
  addressComplement2: string;
  city2: string;
  state2: string;
  neighborhood2: string;
  payment2: boolean;
}

type ParamsType = {
  clientId: string;
}

const Register = () => {
  const { register, handleSubmit, setValue, control } = useForm<FormState>();
  const { clientId } = useParams<ParamsType>();
  const isEditing = clientId !== 'create'
  const formTitle = 'CADASTRAR CLIENTE';
  const [disabledCpf, setDisabledCpf] = useState(true);
  const [disabledLogin, setDisabledLogin] = useState(true);
  const history = useHistory();
  const [logradouro, setLogradouro] = useState();
  const [cidade, setCidade] = useState();
  const [estado, setEstado] = useState();
  const [bairro, setBairro] = useState();
  const [copy, setCopy] = useState(false);
  const [logradouro2, setLogradouro2] = useState();
  const [cidade2, setCidade2] = useState();
  const [estado2, setEstado2] = useState();
  const [bairro2, setBairro2] = useState();


  useEffect(() => {
    if (isEditing) {
      makePrivateRequest({ url: `/clients/${clientId}` })
        .then(response => {
          setValue('firstName', response.data.firstName);
          setValue('lastName', response.data.lastName);
          setValue('cpf', response.data.cpf);
          setValue('login', response.data.login);
          setValue('password', response.data.password);
          setValue('status', response.data.status);
          setValue('zipCode', response.data.address.zipCode)
          setValue('address', response.data.address.address)
          setValue('number', response.data.address.number)
          setValue('addressComplement', response.data.address.addressComplement)
          setValue('city', response.data.address.city)
          setValue('state', response.data.address.state)
          setValue('neighborhood', response.data.address.country)
          setValue('payment', response.data.address.payment)
          setDisabledCpf(false)
          setDisabledLogin(false)
        })
    }

  }, [clientId, isEditing, setValue])

  const onSubmit = (formData: FormState) => {
    if (copy) {
      const address1 = {
        address: formData.address,
        zipCode: formData.zipCode,
        city: formData.city,
        neighborhood: formData.neighborhood,
        state: formData.state,
        addressComplement: formData.addressComplement,
        number: formData.number,
        payment: true,
      } 
  
      var payLoad = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        cpf: formData.cpf,
        login: formData.login,
        password: formData.password,
        status: formData.status,
        roles: [{ id: 3 }],
        addresses: [address1]
      }
    } else {
      const address1 = {
        address: formData.address,
        zipCode: formData.zipCode,
        city: formData.city,
        neighborhood: formData.neighborhood,
        state: formData.state,
        addressComplement: formData.addressComplement,
        number: formData.number,
        payment: false,
      }
  
      const address2 = {
        address: formData.address2,
        zipCode: formData.zipCode2,
        city: formData.city2,
        neighborhood: formData.neighborhood2,
        state: formData.state2,
        addressComplement: formData.addressComplement2,
        number: formData.number2,
        payment: true,
      }
  
      var payLoad = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        cpf: formData.cpf,
        login: formData.login,
        password: formData.password,
        status: formData.status,
        roles: [{ id: 3 }],
        addresses: [address1, address2]
      }
    }


    console.log('paylooooooooooooooooooad', payLoad)

    if (!isEditing) {
      makePrivateRequest({ url: `/clients/${clientId}`, data: payLoad, method: "PUT" })
        .then(() => {
          history.push(`/`)
        })
        .catch(() => {
          alert('Usuário não editado')
        })
    } else {
      makePrivateRequest({ url: `/clients`, data: payLoad, method: "POST" })
        .then(() => {
          history.push('/')
        })
        .catch(() => {
          alert('Usuário não adicionado')
        })
    }
  }

  const onBlurCep = (cep: string) => {
    console.log("cep", cep, typeof cep)
    axios.get(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => {
        console.log(response)
        setLogradouro(response.data.logradouro)
        setCidade(response.data.localidade)
        setEstado(response.data.uf)
        setBairro(response.data.bairro)
      })
  }

  const onBlurCep2 = (cep: string) => {
    console.log("cep", cep, typeof cep)
    axios.get(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => {
        console.log(response)
        setLogradouro2(response.data.logradouro)
        setCidade2(response.data.localidade)
        setEstado2(response.data.uf)
        setBairro2(response.data.bairro)
      })
  }

  const onCopy = () => {
    if(copy){
      setCopy(false)
    }else{
      setCopy(true)
    }
    console.log(copy)
  }

  return (
    <div className="container mt-3">
      <form onSubmit={handleSubmit(onSubmit)} className="form-client">
        <BaseForm title={formTitle} buttonTitle={formTitle}>
          <label>Dados Pessoais</label>
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
                className="form-control mb-5"
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
            <div className="col-6">
              <input
                ref={register()}
                className="form-control mb-3"
                onBlur={e => onBlurCep(e.target.value)}
                name="zipCode"
                type="text"
                placeholder="CEP"
                tabIndex={4}
              />
              <input
                ref={register()}
                className="form-control mb-3"
                name="number"
                type="text"
                placeholder="Número"
                tabIndex={6}
              />

            </div>

            <div className="col-6">
              <input
                ref={register()}
                className="form-control mb-3"
                name="address"
                type="text"
                placeholder="Logradouro"
                value={logradouro}
                tabIndex={5}
              />
              <input
                ref={register()}
                className="form-control mb-3"
                name="addressComplement"
                type="text"
                placeholder="Complemento"
                tabIndex={7}
              />

            </div>

          </div>
          <div className="row">
            <div className="col-4">
              <input
                ref={register()}
                className="form-control mb-3"
                name="city"
                type="text"
                placeholder="Cidade"
                value={cidade}
                tabIndex={8}
              />

            </div>
            <div className="col-4">
              <input
                ref={register()}
                className="form-control mb-3"
                name="state"
                type="text"
                placeholder="Estado"
                value={estado}
                tabIndex={9}
              />

            </div>
            <div className="col-4">
              <input
                ref={register()}
                className="form-control mb-5"
                name="neighborhood"
                type="text"
                placeholder="Bairro"
                value={bairro}
                tabIndex={10}
              />

            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <label className="titulo-card mt-2 mr-5">Endereço de faturamento</label>

              <input
                ref={register()}
                className="input-copiar-endereco-faturamento"
                id="payment2"
                name="payment2"
                type="checkbox"
                onChange={onCopy}
              />
              <label className="titulo-card ml-1">Copiar endereço acima</label>
            </div>
          </div>

          {!copy && 
          <div className="desabilitar">
            <div className="row">
              <div className="col-6">
                <input
                  ref={register()}
                  className="form-control mb-3"
                  onBlur={e => onBlurCep2(e.target.value)}
                  name="zipCode2"
                  type="text"
                  placeholder="CEP"
                />
                <input
                  ref={register()}
                  className="form-control mb-3"
                  name="number2"
                  id="number2"
                  type="text"
                  placeholder="Número"
                />

              </div>

              <div className="col-6">
                <input
                  ref={register()}
                  className="form-control mb-3"
                  name="address2"
                  type="text"
                  placeholder="Logradouro"
                  value={logradouro2}
                />
                <input
                  ref={register()}
                  className="form-control mb-3"
                  name="addressComplement2"
                  type="text"
                  placeholder="Complemento"
                />

              </div>

            </div>
            <div className="row">
              <div className="col-4">
                <input
                  ref={register()}
                  className="form-control mb-3"
                  name="city2"
                  type="text"
                  placeholder="Cidade"
                  value={cidade2}
                />

              </div>
              <div className="col-4">
                <input
                  ref={register()}
                  className="form-control mb-3"
                  name="state2"
                  type="text"
                  placeholder="Estado"
                  value={estado2}
                />

              </div>
              <div className="col-4">
                <input
                  ref={register()}
                  className="form-control mb-5"
                  name="neighborhood2"
                  type="text"
                  placeholder="Bairro"
                  value={bairro2}
                />

              </div>
            </div>
          </div>
          }

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
              />
            </div>
          </div>

        </BaseForm>
      </form>
    </div>
  )
}

export default Register;