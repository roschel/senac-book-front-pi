import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../../../../core/components/types/Product';
import './styles.scss';

type Props = {
    product: Product
}

const Card = ({ product }: Props) => {
    return (
        <div className="card-base product-card-admin">
            <div className="row">
                <div className="col-2 text-center" >
                    {product.images.map(img => (
                        img.principal &&
                        <img
                            src={img.imgUrl}
                            alt={product.title}
                            className="product-card-image-admin"
                        />
                    ))}

                </div>
                <div className="col-7">
                    <h3 className="product-card-title-admin">
                        {product.title}
                    </h3>
                    R$ {product.price}
                    <div className="product-card-author">
                        <label className="product-card-author-label">Autor:</label>
                        <label>{product.author}</label>
                    </div>
                    Id: {product.id}
                </div>
                <div className="col-3">
                    <Link
                        to={`/admin/products/${product.id}`}
                        type="button"
                        className="btn btn-outline-secondary"
                    >
                        EDITAR
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Card;