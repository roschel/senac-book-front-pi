import React, { useState } from 'react';
import { format } from 'date-fns';

import { Orders } from '../../../../../../core/components/types/Orders';
import './styles.scss';
import { Dropdown } from 'react-bootstrap';

type Props = {
  order: Orders;
}

const Card = ({ order }: Props) => {

  const handleChange = (e: string) => {
    console.log(e)
  }

  return (
    <div className="card-base">
      <div className="geral-client row mb-2">
        <div className="cabecalho col-12">
          <h6 className="col-3"><strong>ID</strong></h6>
          <h6 className="col-3"><strong>Data</strong></h6>
          <h6 className="col-3"><strong>Valor Total</strong></h6>
          <h6 className="col-3"><strong>Status</strong></h6>
        </div>
        <div className="infos col-12">
          <h6 className="col-3">{order?.id}</h6>
          <h6 className="col-3">{format(new Date(order?.createdAt), "dd/MM/yyyy")} </h6>
          <h6 className="col-3">{order?.totalValue.toFixed(2).replace('.', ',')}</h6>

          <Dropdown 
            className="col-3"
            onSelect={(e) => handleChange(e.target.value)}
          >
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
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