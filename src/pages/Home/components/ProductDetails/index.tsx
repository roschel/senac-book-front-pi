import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ReactComponent as ArrowIcon } from '../../../../core/assets/images/arrow.svg';
import DemoCarousel from '../../../../core/components/Carousel';
import StarsRating from '../../../../core/components/StarsRating';
import { Product } from '../../../../core/components/types/Product';
import { CartSession, getCartData, ProductsCart, saveCartData } from '../../../../core/components/utils/cart';
import { makeRequest } from '../../../../services/api';
import './styles.scss';

type ParamsType = {
  productId: string;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
}

export const ProductDetails = ({ productId, showModal, setShowModal }: ParamsType) => {
  // const { productId } = useParams<ParamsType>();
  const [product, setProduct] = useState<Product>();
  const [disabledButton, setDisabledButton] = useState(true);

  useEffect(() => {
    makeRequest({ url: `/products/${productId}` })
      .then(response => {
        setDisabledButton(response.data.status);
        setProduct(response.data);
      })
  }, [productId]);

  const saveData = (product: Product) => {
    const cartData = getCartData() as CartSession;

    if (cartData.products) {
      let added = false;
      cartData.products.forEach(productCart => {
        if (productCart.product.id === product.id) {
          added = true;
          productCart.sellQuantity++;
        }
      })

      if (!added) {
        console.log('entrei', cartData)
        let payload: ProductsCart = {
          product,
          sellQuantity: 1
        }
        cartData.products.push(payload)
      }

      saveCartData(cartData)
    } else {
      let payLoad: CartSession = {
        products: [
          {
            product,
            sellQuantity: 1
          }
        ],
      }

      // const products = []
      // let payload: ProductsCart={
      //   product,
      //   sellQuantity:1
      // }
      // products.push(payload)
      saveCartData(payLoad)
    }
  }

  const handleClose = () => setShowModal(false)

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Body className="product-modal-content">
        <span onClick={() => setShowModal(false)}>
          <ArrowIcon className="icon-goback" />
          <h1 className="text-goback">voltar</h1>
        </span>
        <div className="product-details-container">
          <div className="product-details-card-image text-center">
            <DemoCarousel
              images={product?.images}
              key={product?.id}
            />
          </div>
          <div className="product-details">
            <h1 className="product-details-name" id="titulo">
              {product?.title}
            </h1>
            <div className="product-details-rating">
              <StarsRating
                rating={product?.rating}
                key={product?.id}
              />
            </div>
            <div className="product-details-card-description">
              <h1 className="product-description-title">Descrição do produto</h1>
              <p className="product-description-text">
                {product?.description}
              </p>
            </div>

            <div className="footer">
              <div className="product-quantity">
                Qtd. disponível: {product?.quantity}
              </div>
              {product?.status === true ? (
                <Link to="/cart">
                  <button className="btn btn-primary" onClick={() => saveData(product)}>
                    Comprar
                  </button>
                </Link>
              ) : (
                <button
                  className="btn btn-primary"
                  disabled={!disabledButton}>
                  INDISPONÍVEL
                </button>
              )}
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ProductDetails;