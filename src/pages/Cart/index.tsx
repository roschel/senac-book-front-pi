import React from 'react'

import './styles.scss'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getCartData } from '../../core/components/utils/cart'
import ProductCardCart from './components/ProductCardCart'
import OrderSummary from './components/OrderSummary'

const Cart = () => {
  const [numberBooks, setNumberBooks] = useState(-1);
  const [updateSummaryCart, setUpdateSummaryCart] = useState(false);
  const getCart = getCartData()

  const removeProduct = (quantity: number) => {
    setNumberBooks(quantity);
  }

  const uploadSummary = (updadte: boolean) => {
    setUpdateSummaryCart(true)
  }

  useEffect(() => {
    setUpdateSummaryCart(false)
  }, [numberBooks, updateSummaryCart])

  return (
    <>
      {!getCart?.length ? (
        <div className="cesta-vazia">
          <h5>SUA CESTA ESTÁ VAZIA</h5>
          <br />
          <button className="btn btn-primary">
            <Link to="/">
              Começar a comprar
            </Link>
          </button>
        </div>
      ) : (
        <div className="grid">
          {getCart?.map(book => (
            <div className="books-list">
              <ProductCardCart product={book} quantityProduct={removeProduct} uploadSummary={uploadSummary} />
            </div>
          ))}
          <div className="summary">
            <OrderSummary books={getCart} updateSummaryCart={updateSummaryCart} />
          </div>
        </div>
      )}
    </>
  )
}

export default Cart;