import { format } from 'date-fns';
import React, { useState } from 'react';
import plusButton from '../../../../../../core/assets/images/plusButton.svg';
import { Orders } from '../../../../../../core/components/types/Orders';
import ModalOrders from '../ModalOrders';
import './styles.scss';

type ParamsType = {
  clientId: string
}

type Props = {
  order: Orders;
}

const Card = ({ order }: Props) => {

  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
    if (showModal) {
      setShowModal(false)
    } else {
      setShowModal(true)
    }
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
          <h6 className="col-3">{order.id}</h6>
          <h6 className="col-3">{format(new Date(order.createdAt), "dd/MM/yyyy")} </h6>
          <h6 className="col-3">{order.totalValue.toFixed(2).replace('.', ',')}</h6>
          <h6 className="col-3">{order.orderStatus}</h6>

          <button
            className="btn btn-primary plus-button"
            onClick={handleModal}
          >
            <img src={plusButton} alt="" />
          </button>
        </div>
      </div>
      <ModalOrders order={order} showModal={showModal} setShowModal={setShowModal} />
    </div>
  )
}

export default Card;