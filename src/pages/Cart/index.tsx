import ProductCardCart from './components/ProductCardCart'
import OrderSummary from './components/OrderSummary'
import { Product } from '../../core/components/types/Product'

import './styles.scss'
import { Link } from 'react-router-dom'

const Cart = () => {

    const getCartData = () => {
        const cartData = localStorage.getItem("cartData") ?? '{}';
        const parsedCartData = JSON.parse(cartData);
        return parsedCartData as Product[];
    }

    if (!localStorage.getItem("cartData")) {
        return (
            <div className="cesta-vazia">
                <h5>SUA CESTA ESTÁ VAZIA</h5>
                <br />
                <button className="btn btn-primary">
                    <Link to="/">
                        Começar a comprar
					</Link>
                </button>
            </div>

        )
    }
    return (
        <>
            <div className="row">
                {getCartData()?.map(book => (
                    <div className="col-9 mt-2">
                        <ProductCardCart product={book} />
                    </div>
                ))}
                <div className="col-3 mt-2">
                    <OrderSummary />
                </div>
            </div>
        </>
    )

}

export default Cart;