import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { getSessionData } from '../../../../core/components/utils/auth'
import { calculateShipping, getCartData, ProductsCart, saveCartData } from '../../../../core/components/utils/cart'

import './styles.scss'

type Props = {
  books: ProductsCart[];
  updateSummaryCart: boolean;
  shipping: number;
  setShipping: (newPrice: number) => void;
}

const OrderSummary = ({ books, updateSummaryCart, shipping, setShipping }: Props) => {
  const [valorTotalDeLivros, setValorTotalDeLivros] = useState(0);
  const [quantidadeTotalDeProdutos, setQuantidadeTotalDeProdutos] = useState(0);
  const [valorTotal, setValorTotal] = useState(0);
  const history = useHistory();

  const somaValoresDeLivros = () => {
    let sum = 0
    books.forEach(book => {
      sum += book.product?.price * book.sellQuantity
    })
    setValorTotalDeLivros(sum)

    let sumQuantidadeTotalDeProdutos = 0
    books.forEach(book => {
      sumQuantidadeTotalDeProdutos += book.sellQuantity
    })
    setQuantidadeTotalDeProdutos(sumQuantidadeTotalDeProdutos)

    setValorTotal(sum + shipping)
  }

  const calcularFrete = (cep: string) => {
    axios.get(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => {
        const address = response.data;
        setShipping(calculateShipping(address.localidade, address.uf));
      })
  }

  useEffect(() => {
    somaValoresDeLivros()
  }, [updateSummaryCart, shipping])

  const handleSubmit = () => {
    const sessionData = getSessionData()
    const cartSession = getCartData()

    if (sessionData && !cartSession.customerId) {
      cartSession.customerId = sessionData.userId
      saveCartData(cartSession)
    }

    if (!cartSession.customerId) {
      alert('É preciso logar no sistema para realizar o checkout')
      history.push('/')
    }
    history.push('/cart/checkout')
  }

  return (
    <div className="container">
      <h5 className="title-summary"><strong>Resumo do pedido</strong></h5>
      <div className="card-body row">
        {quantidadeTotalDeProdutos > 1 ? (
          <h6 className="col-6">{quantidadeTotalDeProdutos} produtos</h6>
        ) : (
          <h6 className="col-6">{quantidadeTotalDeProdutos} produto</h6>
        )}
        <h6 className="col-6 valor">R$ {valorTotalDeLivros.toFixed(2).replace(".", ",")}</h6>
        <h6 className="col-6"><em>frete</em></h6>
        <h6 className="col-6 valor">R$ {shipping.toFixed(2).replace(".", ",")}</h6>

        <div className="linha col-12" />
        <h5 className="col-6"><strong>total</strong></h5>
        <h5 className="col-6 valor"><strong>R$ {valorTotal.toFixed(2).replace(".", ",")}</strong></h5>
      </div>
      <div className="continuar">
        <button
          className="btn btn-primary mb-3"
          onClick={handleSubmit}
        >
          Continuar
        </button>
      </div>

      <div className="frete">
        <h6 className="calcular"><strong>Calcular frete</strong></h6>
        <input
          className='mb-2 form-control'
          type="text"
          placeholder="ex: 12345-678"
          onBlur={e => calcularFrete(e.target.value)}
        />
        <div className="calc">
          <button className="btn btn-outline-primary mb-2">Calcular</button>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary;