import ProductCard from './components/ProductCard'
import OrderSummary from './components/OrderSummary'

const Cart = () => {
    return (
        <>
            <div className="row">
                <div className="col-8 mt-2">
                    <ProductCard />
                </div>
                <div className="col-4 mt-2">
                    <OrderSummary />
                </div>
            </div>
        </>
    )
}

export default Cart;