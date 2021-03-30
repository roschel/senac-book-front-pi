import React, { useCallback, useEffect, useState } from 'react'
import ProductFilters, { FilterForm } from '../../../../../../core/components/ProductFilters';
import makeRequest from '../../../../../../services/api';

const List = () => {
  const [productResponse, setProductsResponse] = useState();
  const [activePage, setActivePage] = useState(0);

  const getUsers = useCallback((filter?: FilterForm) => {
    const params = {
      page: activePage,
      linesPerPage: 10,
      title: filter?.name
    }

    makeRequest.get("/users", { params })
      .then(response => setProductsResponse(response.data))
  }, [activePage])

  useEffect(() => {
    getUsers()
  }, [getUsers])

  return (
    <div>
      <ProductFilters onSearch={filter => getUsers(filter)} />
    </div>
  )
}

export default List;