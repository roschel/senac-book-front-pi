import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Address } from '../../../../../core/components/types/Client';
import { makePrivateRequest } from '../../../../../services/api';
import './styles.scss';

type Props = {
  address: Address;
  onDisabled: (clientId: number) => void;
  onPaymentChange: (payment: boolean, addressPaymentId: number) => void;
  buttonTitle: string;
  clientId: string;
}

const Card = ({ address, onDisabled, buttonTitle, clientId, onPaymentChange }: Props) => {
  const history = useHistory();

  const handlePayment = () => {
    const { payment } = address

    const payLoad = {
      ...address,
      payment: !payment
    }
    console.log('asasdasdasd', payLoad)
    makePrivateRequest({ url: `/addresses/client/${clientId}`, data: payLoad, method: "PUT" })
      .then(() => {
        history.push(`/client/${clientId}/addresses`)
        onPaymentChange(payLoad.payment, address.id)
      })
      .catch(() => {
        alert('Endereço não editado')
      })
  }

  return (
    <div className="card-base client-card-admin">
      <div className="row">
        <div className="col-7">
          <h3 className="client-card-address">
            <strong>
              {address.address}
            </strong>
          </h3>
          <div className="client-card-number">
            <label className="client-card-number-label">Número:</label>
            <label>{address.number}</label>
          </div>

          <div>
            <label className="client-card-neighborhood-label">
              <strong>
                Bairro:
              </strong>
            </label>
            <label>{address.neighborhood}</label>
          </div>

          <div>
            <label className="client-card-city-label">
              <strong>
                Cidade:
              </strong>
            </label>
            <label>{address.city}</label>
          </div>

          <div>
            <label className="client-card-state-label">
              <strong>
                Estado:
              </strong>
            </label>
            <label>{address.state}</label>
          </div>

        </div>

        <div className="col-3 offset-2 mt-2">
          <Link
            to={`/client/${clientId}/addresses/${address.id}`}
            type="button"
            className="btn btn-outline-secondary"
          >
            EDITAR
          </Link>

          <button
            type="button"
            className="btn btn-outline-danger ml-2"
            onClick={() => onDisabled(address.id)}
          >
            {buttonTitle}
          </button>

          <div className="payment-button">
            {address.payment ? (
              <button
                className="btn btn btn-success"
                disabled
              >
                Endereço de faturamento
              </button>
            ) : (
              <button
                className="btn btn-outline-success"
                onClick={() => handlePayment()}
              >
                Tornar este endereço de faturamento
              </button>
            )}
          </div>

        </div>
      </div>
    </div>

  )

}

export default Card;