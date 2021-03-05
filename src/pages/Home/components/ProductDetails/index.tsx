import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './styles.scss'
import makeRequest from '../../../../services/api';
import { Product } from '../../../../core/components/types/Product'

type ParamsType = {
	productId: string;
}

const ProductDetails = () => {
	const { productId } = useParams<ParamsType>();
	const [product, setProduct] = useState<Product>();

	useEffect(() => {
		makeRequest.get(`/products/${productId}`)
			.then(response => setProduct(response.data))
	}, [productId]);

	return (
		<div className="product-details-container">
			<div className="card-base border-radius-20 product-details">
				{/* <Link to="/products" className="product-details-goback">
                    <ArrowIcon className="icon-goback" />
                    <h1 className="text-goback">voltar</h1>
                </Link> */}
				<div className="row">
					{
						<div className="col-6 pr-5">
							<div className="product-details-card text-center">
								{product?.images.map(image => (
									image.principal && <img src={image.imgUrl} alt={image.imgUrl} className="product-details-image" />
								))}
								
							</div>
							<h1 className="product-details-name">
								{product?.title}
							</h1>
						</div>
					}

					<div className="col-6 product-details-card">
						{
							<>
								<h1 className="product-description-title">Descrição do produto</h1>
								<p className="product-description-text">
									{product?.description}
								</p>
							</>
						}

					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetails;