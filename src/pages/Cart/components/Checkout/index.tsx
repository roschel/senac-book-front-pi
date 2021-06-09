import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { Address, Client } from '../../../../core/components/types/Client'
import { calculateShipping, getCartData, ProductsCart, saveCartData } from '../../../../core/components/utils/cart'
import { makePrivateRequest } from '../../../../services/api'
import Card from '../Checkout/components/Card'
import Payment from '../Checkout/components/Payment'
import OrderSummary from '../OrderSummary'
import './styles.scss'


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
  const [selectedAddress, setSelectedAddress] = useState<Address>();
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const data = getCartData()
    setProducts(data.products)

    let sum = 0
    products?.forEach(book => {
      sum += book.product?.price * book.sellQuantity
    })
    setValorTotalDeLivros(sum)

    let sumQuantidadeTotalDeProdutos = 0
    products?.forEach(book => {
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

  const handleSelectAddress = (address: Address) => {
    setSelectedAddress(address)
    const newPrice = calculateShipping(address.city, address.state);
    setShipping(newPrice)
    console.log("address ", address);
    console.log("shipping ", shipping);
    const cartData = getCartData()
    cartData.address = address
    cartData.shipping = newPrice;

    saveCartData(cartData)

    setShowModal(true)
  }

  const handleShipping = (price: number) => {
    setSelectedAddress(undefined);
    setShipping(price);
  }

  return (
    <>
      <div className="resume">
        <div className="resume-customer">
          <div className="list-addresses">
            {addresses?.map(address => (
              <span
                className="card-address"
                onClick={() => handleSelectAddress(address)}
                key={address.id}
              >
                <Card
                  address={address}
                  clientId={clientId}
                  onDisabled={onDisabled}
                  buttonTitle={'INATIVAR'}
                  key={address.id}
                  onPaymentChange={onPaymentChange}
                  selectedAddress={selectedAddress === address}
                />
              </span>
            ))}
          </div>

          <div className="buttons-checkout">
            <Link to="/cart">
              <button className="save btn btn-primary mt-4">
                Voltar
              </button>
            </Link>
            <Link to={`/client/${customer?.id}/addresses/create`}>
              <button className="save btn btn-primary mt-4">
                Novo endereço
              </button>
            </Link>
          </div>

          {selectedAddress &&
            <Payment
              showModal={showModal}
              setShowModal={setShowModal}
              address={selectedAddress}
            />
          }
        </div>
        <div className="summary-container">
          <OrderSummary
            books={getCart.products}
            updateSummaryCart={updateSummaryCart}
            key={getCart.customerId}
            shipping={shipping}
            setShipping={handleShipping}
          />
        </div>
      </div>
    </>
  )
}

export default Checkout;