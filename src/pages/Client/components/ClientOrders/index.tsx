import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Switch, useParams } from 'react-router-dom';
import PrivateRoute from '../../../../core/components/Routes/PrivateRoute';
import { Orders } from '../../../../core/components/types/Client';
import { makePrivateRequest } from '../../../../services/api';
import ModalOrders from './components/ModalOrders';
import List from './';


type ParamsType = {
  clientId: string
}


const ClientOrders = () => {


  const { clientId } = useParams<ParamsType>();
  const [orders, setOrders] = useState<Orders[]>();



  useEffect(() => {
    makePrivateRequest({ url: `/orders/client/${clientId}` })
      .then((response) => {
        const ordersResponse = response.data as Orders[];
        ordersResponse.forEach(order => {
          order.createdAt = format(new Date(), "dd/MM/yyyy")
        })
        setOrders(ordersResponse)

      })

  }, [])

  return (
    <div>
      <Switch>
        <PrivateRoute path="/client/:clientId/orders" exact>
          <List />
        </PrivateRoute>
        <PrivateRoute allowedRoutes={['ROLE_ADMIN']} path="/admin/users/:userId">
          {/* <Form /> */}
        </PrivateRoute>
      </Switch>
    </div>
  )
}

export default ClientOrders;