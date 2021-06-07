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
    <div className="client-card-container card-style">
      <div className="column">
        <h3 className="client-address">
          <strong>
            {address.address}
          </strong>
        </h3>
        <div className="info">
          <div className="column-info">
            <div>
              <label>
                <strong>
                  Número:&nbsp;
                </strong>
              </label>
              <label>{address.number}</label>
            </div>

            <div>
              <label>
                <strong>
                  Bairro:&nbsp;
                </strong>
              </label>
              <label>{address.neighborhood}</label>
            </div>
          </div>
          <div className="column-info">
            <div>
              <label>
                <strong>
                  Cidade:&nbsp;
                </strong>
              </label>
              <label>{address.city}</label>
            </div>

            <div>
              <label>
                <strong>
                  Estado:&nbsp;
                </strong>
              </label>
              <label>{address.state}</label>
            </div>
          </div>
        </div>
      </div>

      <div className="buttons-client-address">
        <div className="two-buttons">
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
        </div>

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

  )

}

export default Card;