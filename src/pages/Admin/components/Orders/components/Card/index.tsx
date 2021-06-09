import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';

import { Orders } from '../../../../../../core/components/types/Orders';
import './styles.scss';
import { Dropdown } from 'react-bootstrap';
import { makePrivateRequest } from '../../../../../../services/api';

type Props = {
  order: Orders;
  updateOrderStatus: (orderStatus: string, orderId: number) => void;
}

const Card = ({ order, updateOrderStatus }: Props) => {
  const [status, setStatus] = useState();

  const handleChange = (e: any, x: any) => {
    console.log('e', e, 'x', x.target.innerHTML)

    const payLoad = {
      ...order,
      orderStatus: x.target.innerHTML.toUpperCase()
    }

    makePrivateRequest({ url: `/orders/${order.id}`, method: 'PUT', data: payLoad })
      .then(response => (
        updateOrderStatus(response.data.orderStatus, order.id)
      ))
  }

  useEffect(() => {

  }, [status])

  return (
    <div className="card-base">
      <div className="p-3 mb-4 d-flex justify-content-between align-items-center">
        <div>
          <h6><strong>ID</strong></h6>
          <h6>{order?.id}</h6>
        </div>
        <div>
          <h6><strong>Data</strong></h6>
          <h6>{format(new Date(order?.createdAt), "dd/MM/yyyy")} </h6>
        </div>
        <div>
          <h6><strong>Valor Total</strong></h6>
          <h6>{order?.totalValue.toFixed(2).replace('.', ',')}</h6>
        </div>
        <div>
          <h6><strong>Status</strong></h6>
          <Dropdown
            onSelect={(e, x) => handleChange(e, x)}
          >
            <Dropdown.Toggle
              variant="primary"
              id="dropdown-basic"
              size="sm"
            >
              {order?.orderStatus}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Aguardando pagamento</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Pagamento rejeitado</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Pagamento com sucesso</Dropdown.Item>
              <Dropdown.Item href="#/action-4">Aguardando retirada</Dropdown.Item>
              <Dropdown.Item href="#/action-5">Em trânsito</Dropdown.Item>
              <Dropdown.Item href="#/action-6">Entregue</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  )
}

export default Card;