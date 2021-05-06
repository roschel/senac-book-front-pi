import { constants } from "node:os";
import { useEffect, useState } from "react"
import { components } from "react-select";
import lixeira from '../../../../../src/core/assets/images/lixeira.svg'
import { Product, ProductsResponse } from "../../../../core/components/types/Product";
import { makeRequest } from "../../../../services/api";
import './styles.scss'

type Props = {
    product: Product;
    quantityProduct: (quantity: number) => void;
}

const ProductCardCart = ({ product, quantityProduct }: Props) => {
    const [counter, setCounter] = useState(1);
    const [productPrice, setProductPrice] = useState(product.price);
    const [activePage, setActivePage] = useState(0);
    const [products, setProducts] = useState<Product[]>([]);

    const onAdd = () => {
        if (counter < product.quantity) {
            setCounter(counter + 1);
            setProductPrice(productPrice + product.price);
        }
    }

    const onDecrement = () => {
        if (counter > 1) {
            setCounter(counter - 1);
            setProductPrice(productPrice - product.price);
        }
    }
    
    const removeProduct = (productId: number) => {
        console.log('remover')
        const cartData = localStorage.getItem("cartData") ?? '{}';
  		const parsedCartData: Product[] = JSON.parse(cartData);
        parsedCartData.forEach((element, i) => {
            if(element.id === productId) {
                parsedCartData.splice(i, 1)
            }
        });
        if(parsedCartData.length === 0) {
            localStorage.clear()
        } else {
            setProducts(parsedCartData)
            localStorage.setItem('cartData', JSON.stringify(parsedCartData))
        }

        quantityProduct(parsedCartData.length)
    }

    return (
        <div className="card card-geral">
            <div className="card-body">
                <div className="geral row">
                    <div className="card card-image">
                        {product.images.map(image => (
                            image.principal && (
                                <img src={image.imgUrl} alt={image.imgUrl} />
                            )
                        ))}
                    </div>

                    <div className="col-8 teste">
                        <div className="titulos">
                            <h6 className="titulo-produto"><strong>produto</strong></h6>
                            <h6 className="titulo-qtd"><strong>qtd.</strong></h6>
                            <h6 className="titulo-preco"><strong>preço</strong></h6>
                        </div>

                        <div className="row infos mt-3">
                            <label className="nomeLivro col-4">
                                {product.title}
                            </label>

                            <div className="quantidade col-1">
                                <button
                                    className="decrementar btn btn-primary"
                                    onClick={onDecrement}
                                >
                                    -
                                    </button>
                                <h5 className="qtd">{counter}</h5>
                                <button
                                    className="incrementar btn btn-primary"
                                    onClick={onAdd}
                                >
                                    +
                                    </button>
                            </div>

                            <div className="preco col-4">
                                <label><strong>R$ {productPrice}</strong></label>
                                <button
                                    className="remove btn btn-danger"
                                    onClick={() => removeProduct(product.id)}>
                                    <img src={lixeira} alt="remover" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCardCart;