import React, { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import Search from '../../../../../../core/components/Search';
import ProductFilters, { FilterForm } from '../../../../../../core/components/Search';
import { UsersResponse } from '../../../../../../core/components/types/User';
import makeRequest from '../../../../../../services/api';
import Card from '../Card';


const List: React.FC = () => {
  const [userResponse, setUserResponse] = useState<UsersResponse>();
  const [activePage, setActivePage] = useState(0);

  const history = useHistory();

  const handleCreate = () => {
    history.push('/admin/users/create')
  }

  const getUsers = useCallback((filter?: FilterForm) => {
    const params = {
      page: activePage,
      linesPerPage: 10,
      title: filter?.name
    }

    makeRequest.get("/users", { params })
      .then(response => setUserResponse(response.data))
  }, [activePage])

  useEffect(() => {
    getUsers()
  }, [getUsers])

  const onDisabled = (userId: number) => {
    const confirmacao = window.confirm("Deseja alterar o status do usuário?")
    if (confirmacao) {
      makeRequest.delete(`/users/${userId}`)
        .then(response => {
          alert(`${response.data}`)
          getUsers()
        })
        .catch(() => {
          alert(`Erro ao inativar o usuário`)
        })
    }
  }

  return (
    <div>
      <div>
        <Search
          onSearch={filter => getUsers(filter)}
          placeholder="usuário"
          request="users"
        />
        <button className="btn btn-primary btn-lg" onClick={handleCreate}>
          ADICIONAR
      </button>
      </div>
      <div>
        {/* {userResponse?.content.map(user => (
          user.status === true ? (
            <Card user={user} onDisabled={onDisabled} buttonTitle={'INATIVAR'} key={user.id}/>
          ) : (
            <Card user={user} onDisabled={onDisabled} buttonTitle={'ATIVAR'} key={user.id} />
          )
        ))} */}
      </div>
    </div>
  )
}

export default List;