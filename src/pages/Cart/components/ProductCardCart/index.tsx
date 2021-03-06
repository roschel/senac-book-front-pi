import { useEffect, useState } from "react"
import lixeira from '../../../../../src/core/assets/images/lixeira.svg'
import { getCartData, ProductsCart, saveCartData } from "../../../../core/components/utils/cart";
import './styles.scss'

type Props = {
  product: ProductsCart;
  quantityProduct: (quantity: number) => void;
  uploadSummary: (upldate: boolean) => void;
}

const ProductCardCart = ({ product, quantityProduct, uploadSummary }: Props) => {
  const [counter, setCounter] = useState<number>(product.sellQuantity);
  const [productPrice, setProductPrice] = useState(product.product?.price * counter);
  const [products, setProducts] = useState<ProductsCart[]>([]);

  useEffect(() => {
    
  }, [counter])

  const onAdd = (id: number) => {
    if (counter < product.product?.quantity) {
      const counter2 = counter + 1;

      setProductPrice(product.product?.price * counter2);

      const booksCart = getCartData();

      booksCart.products.forEach(book => {
        if (book.product.id === id) {
          book["sellQuantity"] = counter2
        }
      })
      setProducts(getCartData().products)
      saveCartData(booksCart)
      uploadSummary(true)
      setCounter(counter2);
    }
  }

  const onDecrement = (id: number) => {
    if (counter > 1) {
      const counter2 = counter - 1;
      setProductPrice(product.product?.price * counter2);

      const booksCart = getCartData();

      booksCart.products.forEach(book => {
        if (book.product.id === id) {
          book["sellQuantity"] = counter2
        }
      })
      setProducts(getCartData().products)
      saveCartData(booksCart)
      uploadSummary(true)
      setCounter(counter2);
    }
  }

  const removeProduct = (productId: number) => {
    console.log('remover')
    const parsedCartData = getCartData()
    if (!parsedCartData) {
      return
    }
    console.log('remover2')
    parsedCartData.products.forEach((element, i) => {
      if (element.product.id === productId) {
        parsedCartData.products.splice(i, 1)
      }
    });
    if (parsedCartData.products.length === 0) {
      localStorage.removeItem('cartData')
      quantityProduct(0)
    } else {
      setProducts(parsedCartData.products)
      localStorage.setItem('cartData', JSON.stringify(parsedCartData))
      quantityProduct(parsedCartData.products.length)
    }
    uploadSummary(true)
  }

  return (
        <div className="geral row">
          <div className="card-image">
            {product.product?.images.map(image => (
              image.principal && (
                <img src={image.imgUrl} alt={image.imgUrl} />
              )
            ))}
          </div>

          <div className="col-8 teste">
            <div className="titulos">
              <h6 className="titulo-produto"><strong>produto</strong></h6>
              <h6 className="titulo-qtd"><strong>qtd.</strong></h6>
              <h6 className="titulo-preco"><strong>pre??o</strong></h6>
            </div>

            <div className="row infos mt-3">
              <label className="nomeLivro col-4">
                {product.product?.title}
              </label>

              <div className="quantidade col-1">
                <button
                  className="decrementar btn btn-primary"
                  onClick={() => onDecrement(product.product?.id)}
                >
                  -
                </button>
                <h5 className="qtd">{counter}</h5>
                <button
                  className="incrementar btn btn-primary"
                  onClick={() => onAdd(product.product?.id)}
                >
                  +
                </button>
              </div>

              <div className="preco col-4">
                <label><strong>R$ {productPrice?.toFixed(2).replace(".", ",")}</strong></label>
                <button
                  className="remove btn btn-danger"
                  onClick={() => removeProduct(product.product?.id)}>
                  <img src={lixeira} alt="remover" />
                </button>
              </div>
            </div>
          </div>
        </div>
  )
}

export default ProductCardCart;