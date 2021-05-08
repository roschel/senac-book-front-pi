import React, { useEffect, useState } from 'react'
import { ProductsCart } from '../../../../core/components/utils/cart'

import './styles.scss'

type Props = {
  books: ProductsCart[];
  updateSummaryCart: boolean
}

const OrderSummary = ({ books, updateSummaryCart }: Props) => {
  const [valorTotal, setValorTotal] = useState(0);
  const [quantidadeTotalDeProdutos, setQuantidadeTotalDeProdutos] = useState(0);

  const somaValoresDeLivros = () => {
    let sum = 0
    books.map(book => {
      sum += book.product?.price * book.sellQuantity
    })
    setValorTotal(sum)

    let sumQuantidadeTotalDeProdutos = 0
    books.map(book => {
      sumQuantidadeTotalDeProdutos += book.sellQuantity
    })
    setQuantidadeTotalDeProdutos(sumQuantidadeTotalDeProdutos)
  }

  useEffect(() => {
    somaValoresDeLivros()
  }, [updateSummaryCart])

  return (
    <div className="card container">
      <h5><strong>resumo do pedido</strong></h5>
      <div className="card-body row">
        {quantidadeTotalDeProdutos > 1 ? (
          <h6 className="col-6">{quantidadeTotalDeProdutos} produtos</h6>
        ) : (
          <h6 className="col-6">{quantidadeTotalDeProdutos} produto</h6>
        )}
        <h6 className="col-6 valor">R$ {valorTotal.toFixed(2).replace(".",",")}</h6>
        <h6 className="col-6"><em>frete</em></h6>
        <h6 className="col-6 valor">R$ 12,99</h6>

        <div className="linha col-12"></div>
        <h5 className="col-6"><strong>total</strong></h5>
        <h5 className="col-6 valor"><strong>R$ 62,98</strong></h5>
      </div>
      <button className="btn btn-primary mb-3">Finalizar pedido</button>
      <div className="frete card col 12 mb-2">
        <h6 className="calcular"><strong>Calcular frete</strong></h6>
        <input
          className='mb-2'
          type="text"
          placeholder="ex: 12345-678"
        />
        <button className="btn btn-outline-primary mb-2">Calcular</button>
      </div>
    </div>
  )
}

export default OrderSummary;