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
    <>
      <div className="card-form d-flex justify-content-between align-items-center">
        <div className="d-flex flex-md-column">
          <h6><strong>ID</strong></h6>
          <h6>{order.id}</h6>
        </div>
        <div className="d-flex flex-md-column">
          <h6><strong>Data</strong></h6>
          <h6>{format(new Date(order.createdAt), "dd/MM/yyyy")} </h6>
        </div>
        <div className="d-flex flex-md-column">
          <h6><strong>Valor Total</strong></h6>
          <h6>{order.totalValue.toFixed(2).replace('.', ',')}</h6>
        </div>
        <div className="d-flex flex-md-column">
          <h6><strong>Status</strong></h6>
          <h6>{order.orderStatus}</h6>
        </div>
        <button
          className="btn btn-primary"
          onClick={handleModal}
        >
          <img src={plusButton} alt="" />
            &nbsp;&nbsp;&nbsp;informações
          </button>
      </div>
      <ModalOrders order={order} showModal={showModal} setShowModal={setShowModal} />
    </>
  )
}

export default Card;