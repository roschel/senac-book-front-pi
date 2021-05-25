import { format } from 'date-fns';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Switch, useParams } from 'react-router-dom';
import PrivateRoute from '../../../../core/components/Routes/PrivateRoute';
import { Orders } from '../../../../core/components/types/Orders';
import { makePrivateRequest } from '../../../../services/api';
import List from './components/List';
import ModalOrders from './components/ModalOrders';

import './styles.scss'

type ParamsType = {
  clientId: string
}

const ClientOrders = () => {
  const { clientId } = useParams<ParamsType>();
  const [orders, setOrders] = useState<Orders[]>();

  // useEffect(() => {
  //   makePrivateRequest({ url: `/orders/client/${clientId}` })
  //     .then((response) => {
  //       const ordersResponse = response.data as Orders[];
  //       ordersResponse.forEach(order => {
  //         order.createdAt = format(new Date(), "dd/MM/yyyy | HH:mm")
  //       })
  //       setOrders(ordersResponse) //§ invertendo a listagem... ordem de venda
  //     })
  // }, [])

  return (
    <div>
      <Switch>
        <PrivateRoute path="/client/:clientId/orders" exact>
          <List />
        </PrivateRoute>
        <PrivateRoute allowedRoutes={['ROLE_ADMIN']} path="/admin/users/:userId">
          {/* <ModalOrders /> */}
        </PrivateRoute>
      </Switch>
    </div>
  )
}

export default ClientOrders;