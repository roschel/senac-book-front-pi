import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Search, { FilterForm } from '../../../../../../core/components/Search';
import { OrdersResponse } from '../../../../../../core/components/types/Orders';
import { makePrivateRequest } from '../../../../../../services/api';
import Card from '../Card';

const List: React.FC = () => {
  const [ordersResponse, setOrdersResponse] = useState<OrdersResponse>();
  const [orderStatus, setOrderStatus] = useState('');
  const [activePage, setActivePage] = useState(0);

  const history = useHistory();

  const getOrders = useCallback((filter?: FilterForm) => {
    const params = {
      page: activePage,
      linesPerPage: 10,
      // title: filter?.name
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
  }, [getOrders, orderStatus])

  const handleChange = (orderStatusChanged: string) => {
    setOrderStatus(orderStatusChanged)
  }

  const onDisabled = (orderId: number) => {
    const confirmacao = window.confirm("Deseja alterar o status do Pedido?")
    if (confirmacao) {
      makePrivateRequest({ url: `/orders/${orderId}`, method: "DELETE" })
        .then(response => {
          alert(`${response.data}`)
          getOrders()
        })
        .catch(() => {
          alert(`Erro ao inativar o pedido`)
        })
    }
  }

  return (
    <div className="admin-user-list">
      <div className="d-flex mb-2">
        <Search
          onSearch={filter => getOrders(filter)}
          placeholder="Pedido"
          request="orders"
        />
      </div>
      {ordersResponse && ordersResponse?.content.map(order => (
        <div>
          <Card order={order} updateOrderStatus={handleChange} />
        </div>
      ))}
                Inserire Paginação
    </div>
  )
}

export default List;