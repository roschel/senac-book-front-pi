import React from 'react'

import './styles.scss'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getCartData } from '../../../../core/components/utils/cart'
import ProductCardCart from '../ProductCardCart'
import OrderSummary from '../OrderSummary'

const Items = () => {
  const [numberBooks, setNumberBooks] = useState(-1);
  const [updateSummaryCart, setUpdateSummaryCart] = useState(false);
  const [shipping, setShipping] = useState(0);
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
      {!getCart.products?.length ? (
        <div className="cesta-vazia">
          <h5>SUA CESTA ESTÁ VAZIA</h5>
          <br />
          <Link to="/">
            <button className="btn btn-primary">
              Começar a comprar
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid">
          <div className="books-list">
            {getCart.products.map(book => (
              <ProductCardCart
                product={book}
                quantityProduct={removeProduct}
                uploadSummary={uploadSummary}
                key={book.product.id}
              />
            ))}
          </div>
          <div className="summary">
            <OrderSummary
              shipping={shipping}
              setShipping={setShipping}
              books={getCart.products}
              updateSummaryCart={updateSummaryCart}
              key={getCart.customerId}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default Items;