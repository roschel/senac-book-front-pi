import React from 'react';
import './styles.scss'
import StarsRating from '../../../../core/components/StarsRating'
import { Product } from '../../../../core/components/types/Product'

type Props = {
  product: Product;
}

const ProductCard = ({ product }: Props) => (
  <div className="card-base product-card">
    {product.images.map(image => (
      image.principal && <img src={image.imgUrl} alt={image.imgUrl} className="product-card-image" key={image.id} />
    ))}

    <div className="vertical-line" />

    <div className="product-info">
      <h6 className="product-name">
        <strong>{product.title}</strong>
      </h6>

      <div>
        <StarsRating
          rating={product.rating}
        />
      </div>

      <div className="product-price-status mb-2">
        <span><strong>R$&ensp;</strong> {product.price}</span>
        {product.status
          ? <span className="product-available"><strong><em>Disponível</em></strong></span>
          : <span className="product-unavailable"><strong><em>Indisponível</em></strong></span>
        }
      </div>
    </div>
  </div>
)

export default ProductCard;