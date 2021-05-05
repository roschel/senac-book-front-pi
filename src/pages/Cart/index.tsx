import ProductCard from './components/ProductCard'
import OrderSummary from './components/OrderSummary'

const Cart = () => {
    return (
        <>
            <div className="row">
                <div className="col-9 mt-2">
                    <ProductCard />
                </div>
                <div className="col-3 mt-2">
                    <OrderSummary />
                </div>
            </div>
        </>
    )
}

export default Cart;