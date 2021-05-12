import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Pagination from '../../core/components/Pagination';
import Search from '../../core/components/Search';
import { FilterForm } from '../../core/components/Search';
import { ProductsResponse } from '../../core/components/types/Product';
import { teste } from '../../core/components/utils/testeFrete';
import { makeRequest } from '../../services/api';
import ProductCard from './components/ProductCard';
import './styles.scss'


const Home: React.FC = () => {
  const [productsResponse, setProductResponse] = useState<ProductsResponse>();
  const [activePage, setActivePage] = useState(0);

  const getProducts = useCallback((filter?: FilterForm) => {
    const params = {
      page: activePage,
      title: filter?.name
    }

    makeRequest({url: "/products", params})
      .then(response => setProductResponse(response.data))
  }, [activePage])

  useEffect(() => {
    getProducts()
  }, [getProducts])

  teste();

  return (
    <div className="home-conatiner">
      <Search 
        onSearch={filter => getProducts(filter)} 
        placeholder="produto"
        request="products"
      />
      <div className="catalogo-livros">
        {productsResponse?.content.map(book => (
          <Link to={`/products/${book.id}`} key={book.id}>
            <ProductCard product={book} key={book.id}/>
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