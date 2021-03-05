import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ProductsResponse } from '../../core/components/types/Product';
import makeRequest from '../../services/api';
import ProductCard from './components/ProductCard';
import './styles.scss'


const Home: React.FC = () => {
  const [productsResponse, setProductResponse] = useState<ProductsResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState(0);


  useEffect(() => {

    const params = {
      page: activePage,
      linesPerPage: 12
    }

    //iniciar o loader antes de fazer a requisição
    setIsLoading(true);
    makeRequest.get('/products')
      .then(response => setProductResponse(response.data))

  }, [activePage]);

  return (
    <div className="home-conatiner">
      <div className="catalogo-livros">
        {productsResponse?.content.map(book => (
          <Link to={`/products/${book.id}`} key={book.id}>
            <ProductCard product={book} />
          </Link>
        ))}
      </div>
    </div>
  )

}

export default Home