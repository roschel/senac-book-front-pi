import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Pagination from '../../core/components/Pagination';
import ProductFilters, { FilterForm } from '../../core/components/ProductFilters';
import { ProductsResponse } from '../../core/components/types/Product';
import makeRequest from '../../services/api';
import ProductCard from './components/ProductCard';
import './styles.scss'


const Home: React.FC = () => {
  const [productsResponse, setProductResponse] = useState<ProductsResponse>();
  const [activePage, setActivePage] = useState(0);

  const getProducts = useCallback((filter?: FilterForm) => {
    const params = {
      page: activePage,
      linesPerPage: 10,
      title: filter?.name
    }

    makeRequest.get("/products", { params })
      .then(response => setProductResponse(response.data))
  }, [activePage])

  useEffect(() => {
    getProducts()
  }, [getProducts])

  return (
    <div className="home-conatiner">
      <ProductFilters onSearch={filter => getProducts(filter)} />
      <div className="catalogo-livros">
        {productsResponse?.content.map(book => (
          <Link to={`/products/${book.id}`} key={book.id}>
            <ProductCard product={book} />
          </Link>
        ))}
      </div>
      {productsResponse && (
        <Pagination
          totalPages={productsResponse.totalPages}
          activePage={activePage}
          onChange={page => setActivePage(page)}
        />
      )}
    </div>
  )

}

export default Home