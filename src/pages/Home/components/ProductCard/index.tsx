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
			<h6 className="product-name">
				{product.title}
			</h6>
			
			<div className="product-price mb-2">
				R$ {product.price}
			</div>

			<div className="product-quantity mb-2">
				Quantidade disponível: {product.quantity}
			</div>

			<div className="product-status">
				{product.status && <span>Disponível</span>}
			</div>
		</div>
	</div>
)

export default ProductCard;