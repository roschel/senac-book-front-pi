import React, { useCallback, useEffect, useState } from 'react';
// import './styles.scss'
import { useHistory, useParams } from 'react-router-dom'
import { makePrivateRequest, makeRequest } from '../../../../../services/api';

import { Address } from '../../../../../core/components/types/Client';
import Card from '../Card';

type ParamsType = {
  clientId: string;
}

const List: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>();
  const { clientId } = useParams<ParamsType>();
  const [paymentChange, setPaymentChange] = useState(false);
  const [addressId, setAddressId] = useState(0);
  const [addressDeleted, setAddressDeleted]=useState<boolean>();
  const history = useHistory();

  useEffect(() => {
    console.log('clientId', clientId)
    console.log('paymentChange', paymentChange)
    console.log('addressDeleted', addressDeleted)
    makeRequest({ url: `/clients/${clientId}`, })
      .then(response => {
        console.log(response)
        setAddresses(response.data.addresses)
      })
  }, [clientId, paymentChange, addressId, addressDeleted])

  const handleCreate = () => {
    history.push(`/client/${clientId}/addresses/create`)
  }

  const onDisabled = (addressId: number) => {
    const confirma = window.confirm("Deseja alterar o status do endereço?")
    if (confirma) {
      makePrivateRequest({ url: `/addresses/${addressId}`, method: "delete" })
        .then(response => {
          alert(`${response.data}`)
          if (response.data.includes("reativado")){
            setAddressDeleted(true)
          }else{
            setAddressDeleted(false)
          }
        })
        .catch(() => {
          alert(`Erro ao inativar o endereço`)
        })
    }
  }

  const onPaymentChange = (addressPayment:boolean, addressIdPayment: number) => {
    setPaymentChange(addressPayment)
    setAddressId(addressIdPayment)
  }

  return (
    <div className="admin-products-list">
      <div className="d-flex mb-2">
        <button className="btn btn-primary btn-lg" onClick={handleCreate}>
          ADICIONAR
        </button>
      </div>

      <div>
        {addresses?.map(address => (
          address.status === true ? (
            <Card
              address={address}
              clientId={clientId}
              onDisabled={onDisabled}
              buttonTitle={'INATIVAR'}
              key={address.id}
              onPaymentChange={onPaymentChange}
            />
          ) : (
            <Card
              address={address}
              clientId={clientId}
              onDisabled={onDisabled}
              buttonTitle={'ATIVAR'}
              key={address.id}
              onPaymentChange={onPaymentChange}
            />
          )
        ))}
      </div>
    </div>
  )
}
export default List;