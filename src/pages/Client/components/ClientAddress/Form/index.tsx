import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { makePrivateRequest } from '../../../../../services/api';
import BaseForm from '../../../../Admin/components/BaseForm';

import './styles.scss';

type FormState = {
  zipCode: string;
  address: string;
  number: number;
  addressComplement: string;
  city: string;
  state: string;
  neighborhood: string;
  payment: boolean
}

type ParamsType = {
  clientId: string;
  addressId: string
}

const Form = () => {
  const { register, handleSubmit, setValue } = useForm<FormState>();
  const { clientId, addressId } = useParams<ParamsType>();
  const isEditing = addressId !== 'create'
  const formTitle = isEditing ? 'EDITAR ENDEREÇO' : 'CADASTRAR ENDEREÇO';
  const history = useHistory();
  const [logradouro, setLogradouro] = useState();
  const [cidade, setCidade] = useState();
  const [estado, setEstado] = useState();
  const [bairro, setBairro] = useState();


  useEffect(() => {
    if (isEditing) {
      makePrivateRequest({ url: `/addresses/${addressId}` })
        .then(response => {
          setValue('zipCode', response.data.zipCode)
          setValue('address', response.data.address)
          setValue('number', response.data.number)
          setValue('addressComplement', response.data.addressComplement)
          setValue('city', response.data.city)
          setValue('state', response.data.state)
          setValue('neighborhood', response.data.neighborhood)
          setValue('payment', response.data.payment)
        })

    }

  }, [addressId, setValue])

  const onSubmit = (formData: FormState) => {


    console.log('isEditing', isEditing)
    if (isEditing) {
      const { payment } = formData
      const payLoad = {
        ...formData,
        payment,
        status: true
      }

      console.log('payLoad', payLoad)

      makePrivateRequest({ url: `/addresses/${addressId}`, data: payLoad, method: "PUT" })
        .then(() => {
          history.push(`/client/${clientId}/addresses`)
        })
        .catch(() => {
          alert('Endereço não editado')
        })
    } else {
      const payLoad = {
        ...formData,
        payment: false,
        status: true
      }

      console.log('payLoad', payLoad)

      makePrivateRequest({ url: `/addresses/client/${clientId}`, data: payLoad, method: "POST" })
        .then(() => {
          history.push(`/client/${clientId}/addresses`)
        })
        .catch(() => {
          alert('Endereço não editado')
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

  return (
    <div className="container mt-3">
      <form onSubmit={handleSubmit(onSubmit)} className="form-client">
        <BaseForm title={formTitle} buttonTitle={formTitle}>
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

              <input
                ref={register()}
                className="form-control mb-5"
                name="payment"
                type="checkbox"
                tabIndex={10}
                hidden
              />
            </div>
          </div>
        </BaseForm>
      </form>
    </div>
  )
}

export default Form;