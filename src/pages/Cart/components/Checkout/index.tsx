import { data } from 'jquery'
import React, { useEffect, useState } from 'react'
import { Address, Client } from '../../../../core/components/types/Client'
import { Product } from '../../../../core/components/types/Product'
import { getCartData, ProductsCart } from '../../../../core/components/utils/cart'
import { makePrivateRequest } from '../../../../services/api'

import './styles.scss'

const Checkout = () => {
  const [customer, setCustomer] = useState<Client>()
  const [products, setProducts] = useState<ProductsCart[]>();
  const [quantidadeTotalDeProdutos, setQuantidadeTotalDeProdutos] = useState(0);
  const [valorTotalDeLivros, setValorTotalDeLivros] = useState(0);
  const [valorTotal, setValorTotal] = useState(0);

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

    setValorTotal(sum + shipping)
    
    makePrivateRequest({ url: `/clients/${data.customerId}` })
      .then(response => {
        console.log(response)
        setCustomer(response.data)
      })
  }, [])

  return (
    <div className="resume">
      <div className="resume-customer">
        endereço de entrega
        <span>{customer?.fistName}</span>
      </div>
      <div className="resume-products">
        <h5><strong>resumo do pedido</strong></h5>
        <div className="card-body row">
          {quantidadeTotalDeProdutos > 1 ? (
            <h6 className="col-6">{quantidadeTotalDeProdutos} produtos</h6>
          ) : (
            <h6 className="col-6">{quantidadeTotalDeProdutos} produto</h6>
          )}
          <h6 className="col-6 valor">R$ {valorTotalDeLivros.toFixed(2).replace(".", ",")}</h6>
          <h6 className="col-6"><em>frete</em></h6>
          <h6 className="col-6 valor">R$ {shipping.toFixed(2).replace(".", ",")}</h6>

          <div className="linha col-12"></div>
          <h5 className="col-6"><strong>total</strong></h5>
          <h5 className="col-6 valor"><strong>R$ {valorTotal.toFixed(2).replace(".", ",")}</strong></h5>
        </div>
      </div>
    </div>
  )
}

export default Checkout;