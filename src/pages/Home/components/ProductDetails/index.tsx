import { useEffect, useState } from 'react';
import { ReactComponent as ArrowIcon } from '../../../../core/assets/images/arrow.svg';
import DemoCarousel from '../../../../core/components/Carousel';
import StarsRating from '../../../../core/components/StarsRating';
import { Product } from '../../../../core/components/types/Product';
import { makeRequest } from '../../../../services/api';
import './styles.scss';

type ParamsType = {
  productId: string;
  setShowModal: (show: boolean) => void;
}

export const ProductDetails = ({ productId, setShowModal }: ParamsType) => {
  const [product, setProduct] = useState<Product>();
  const [disabledButton, setDisabledButton] = useState(true);

  useEffect(() => {
    makeRequest({ url: `/products/${productId}` })
      .then(response => {
        setDisabledButton(response.data.status);
        setProduct(response.data);
      })
  }, [productId]);

  return (
    <div className={"product-modal-content"}>
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
          <h1 className="product-details-name">
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
          <div className="product-details-price mt-3">
            R$ {product?.price ? product.price.toFixed(2).replace('.', ',') : product?.price}
            {product?.status === true ? (
              <button className="btn btn-primary">
                COMPRAR
              </button>
            ) : (
              <button
                className="btn btn-primary"
                disabled={!disabledButton}>
                INDISPONÍVEL
              </button>
            )}
          </div>
          <div className="product-quantity">
            Qtd. disponível: {product?.quantity}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;