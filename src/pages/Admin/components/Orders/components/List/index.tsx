import React, { useCallback, useEffect, useState } from 'react';
import { FilterForm } from '../../../../../../core/components/Search';
import { OrdersResponse } from '../../../../../../core/components/types/Orders';
import { makePrivateRequest } from '../../../../../../services/api';
import Card from '../Card';

const List: React.FC = () => {
  const [ordersResponse, setOrdersResponse] = useState<OrdersResponse>();
  const [orderStatus, setOrderStatus] = useState('');
  const [activePage, setActivePage] = useState(0);
  const [id, setId] = useState(0);

  const getOrders = useCallback((filter?: FilterForm) => {
    const params = {
      page: activePage,
      linesPerPage: 10,
    }

    makePrivateRequest({ url: "/orders", params })
      .then(response => {
        setOrdersResponse(response.data)
        console.log('olhaaaa ogáaaaaaaaaas', response)
      })
      .catch(error => console.log('error', error))
  }, [activePage])

  useEffect(() => {
    getOrders()
  }, [getOrders, orderStatus, id])

  const handleChange = (orderStatusChanged: string, orderIdChange: number) => {
    setOrderStatus(orderStatusChanged)
    setId(orderIdChange)
  }

  return (
    <div className="admin-user-list">
      {ordersResponse && ordersResponse?.content.map(order => (
        <div>
          <Card order={order} updateOrderStatus={handleChange} key={order.id} />
        </div>
      ))}
    </div>
  )
}

export default List;