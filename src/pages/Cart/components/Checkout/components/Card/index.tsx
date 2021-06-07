import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Address } from '../../../../../../core/components/types/Client';
import { makePrivateRequest } from '../../../../../../services/api';
import './styles.scss';

type Props = {
  address: Address;
  onDisabled: (clientId: number) => void;
  onPaymentChange: (payment: boolean, addressPaymentId: number) => void;
  buttonTitle: string;
  clientId: string;
  selectedAddress?: boolean;
}

const Card = ({ address, onDisabled, buttonTitle, clientId, onPaymentChange, selectedAddress }: Props) => {
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
    <div className={"card-base client-card-admin"}>
      <h3 className="client-card-address">
        <strong>
          {address.address}
        </strong>
      </h3>
      <div className="d-flex flex-row justify-content-between">
        <div className="d-flex flex-column">
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
        <div className="d-flex flex-column">
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
  )
}

export default Card;