import { data } from 'jquery'
import React, { useEffect, useState } from 'react'
import { Address, Client } from '../../../../core/components/types/Client'
import { Product } from '../../../../core/components/types/Product'
import { getCartData, ProductsCart } from '../../../../core/components/utils/cart'
import { makePrivateRequest } from '../../../../services/api'
import OrderSummary from '../OrderSummary'
import Card from '../Checkout/components/Card'
import Payment from '../Checkout/components/Payment'

import './styles.scss'
import { useParams } from 'react-router'

type ParamsType = {
  clientId: string;
}

const Checkout: React.FC = () => {
  const [customer, setCustomer] = useState<Client>()
  const [products, setProducts] = useState<ProductsCart[]>();
  const [quantidadeTotalDeProdutos, setQuantidadeTotalDeProdutos] = useState(0);
  const [valorTotalDeLivros, setValorTotalDeLivros] = useState(0);
  const [valorTotal, setValorTotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [updateSummaryCart, setUpdateSummaryCart] = useState(false);
  const getCart = getCartData();
  const [addresses, setAddresses] = useState<Address[]>();
  const { clientId } = useParams<ParamsType>();
  // const [confirmAdd, setConfirmAdd] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address>();

  useEffect(() => {
    const data = getCartData()
    setProducts(data.products)

    let sum = 0
    products?.map(book => {
      sum += book.product?.price * book.sellQuantity
    })
    setValorTotalDeLivros(sum)

    let sumQuantidadeTotalDeProdutos = 0
    products?.map(book => {
      sumQuantidadeTotalDeProdutos += book.sellQuantity
    })
    setQuantidadeTotalDeProdutos(sumQuantidadeTotalDeProdutos)

    setValorTotal(sum + 0)

    makePrivateRequest({ url: `/clients/${data.customerId}` })
      .then(response => {
        console.log(response)
        setCustomer(response.data)
        setAddresses(response.data.addresses)
      })
  }, [])

  const onDisabled = (addressId: number) => {

  }

  const onPaymentChange = (addressPayment: boolean, addressIdPayment: number) => {

  }

  return (
    <>
      <div className="resume">
        <div className="resume-customer">
          {addresses?.map(address => (
            <button className="teste" onClick={() => setSelectedAddress(address)} key={address.id} >
              <Card
                address={address}
                clientId={clientId}
                onDisabled={onDisabled}
                buttonTitle={'INATIVAR'}
                key={address.id}
                onPaymentChange={onPaymentChange}
              />
            </button>
          ))}

          {selectedAddress &&
            <div className="pag">
              <Payment address={selectedAddress} />
            </div>
          }
        </div>
        <div className="resume-products">
          <div className="summary">
            <OrderSummary
              books={getCart.products}
              updateSummaryCart={updateSummaryCart}
              key={getCart.customerId}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Checkout;