import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Product } from '../../../../../core/components/types/Product';
import './styles.scss';
import StarsRating from '../../../../../core/components/StarsRating/index';

type Props = {
    product: Product;
    onDisabled: (productId: number) => void;
    buttonTitle: string;
}

const Card = ({ product, onDisabled, buttonTitle }: Props) => {

    const history = useHistory();
    const handleOnClick = (productId: number) => {
        history.push(`/products/${productId}`)
    }

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
                    <div>
                        <StarsRating
                        rating={product.rating}
                        />
                    </div>
                </div>
                <div className="col-3 mt-2">
                    <Link
                        to={`/admin/products/${product.id}`}
                        type="button"
                        className="btn btn-outline-secondary"
                    >
                        EDITAR
                    </Link>

                    <button
                        type="button"
                        className="btn btn-outline-danger ml-2"
                        onClick={() => onDisabled(product.id)}
                    >
                        {buttonTitle}
                    </button>

                    <div>
                        <button
                            type="button"
                            className="btn btn-outline-info mt-2"
                            onClick={() => handleOnClick(product.id)}
                        >
                            VISUALIZAR
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Card;