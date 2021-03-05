import React from 'react';
import './styles.scss'

import { Product } from '../../../../core/components/types/Product'

type Props = {
    product: Product;
}

const ProductCard = ({ product }: Props) => (
    <div className="card-base border-radius-10 product-card">
        {product.images.map(image => (
            image.principal && <img src={image.imgUrl} alt={image.imgUrl} className="product-card-image" />
        ))}

        <div className="product-info">
            <h6 className="product-name mb-400">
                {product.title}
            </h6>
            R$ {product.price}
        </div>
    </div>
)

export default ProductCard;