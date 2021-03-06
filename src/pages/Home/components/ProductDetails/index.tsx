import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './styles.scss'
import { ReactComponent as ArrowIcon } from '../../../../core/assets/images/arrow.svg'
import { makeRequest } from '../../../../services/api';
import { Product } from '../../../../core/components/types/Product'
import StarsRating from '../../../../core/components/StarsRating';
import DemoCarousel from '../../../../core/components/Carousel';
import { CartSession, getCartData, ProductsCart, saveCartData } from '../../../../core/components/utils/cart';

type ParamsType = {
  productId: string;
}

export const ProductDetails = () => {
  const { productId } = useParams<ParamsType>();
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

  return (
    <div className="product-details-container">
      <div className="card-base border-radius-20 product-details">
        <Link to="/" className="product-details-goback">
          <ArrowIcon className="icon-goback" />
          <h1 className="text-goback">voltar</h1>
        </Link>
        <div className="row">
          {
            <div className="col-5 pr-3">
              <div className="product-details-card text-center">
                <DemoCarousel
                  images={product?.images}
                  key={product?.id}
                />

              </div>
              <h1 className="product-details-name" id="titulo">
                {product?.title}
              </h1>
              <div className="product-details-rating">
                <StarsRating
                  rating={product?.rating}
                  key={product?.id}
                />
              </div>
              <div className="product-details-price mt-3">
                R$ {product?.price.toFixed(2).replace(".", ",")}
              </div>
            </div>
          }

          <div className="col-7">
            <div className="product-details-card">
              {
                <>
                  <h1 className="product-description-title">Descri????o do produto</h1>
                  <p className="product-description-text">
                    {product?.description}
                  </p>
                </>
              }
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
                INDISPON??VEL
              </button>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;