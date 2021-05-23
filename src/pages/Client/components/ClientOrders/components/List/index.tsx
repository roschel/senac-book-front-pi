import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Orders } from '../../../../../../core/components/types/Orders';
import { makePrivateRequest } from '../../../../../../services/api';
import Card from "../Card"

type ParamsType = {
  clientId: string;
}

const List = () => {

  const { clientId } = useParams<ParamsType>();
  const [orders, setOrders] = useState<Orders[]>();

  useEffect(() => {
    makePrivateRequest({ url: `/orders/client/${clientId}` })
      .then(response => {
        setOrders(response.data)
      })
  }, [])

  return (
    <>
      { orders && orders?.map(order => (
        <div>
          <Card order={order} />
        </div>

      ))}
    </>
  )
}

export default List;