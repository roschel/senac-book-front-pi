import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Pagination from '../../../../../../core/components/Pagination';
import Search, { FilterForm } from '../../../../../../core/components/Search';
import { UsersResponse } from '../../../../../../core/components/types/User';
import { isAllowedRole } from '../../../../../../core/components/utils/auth';
import { makePrivateRequest } from '../../../../../../services/api';
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

    makePrivateRequest({ url: "/users", params })
      .then(response => {
        setUserResponse(response.data)
        console.log(response)
      })
      .catch(error => console.log('error', error))
  }, [activePage])

  useEffect(() => {
    getUsers()
  }, [getUsers])

  const onDisabled = (userId: number) => {
    const confirmacao = window.confirm("Deseja alterar o status do usuário?")
    if (confirmacao) {
      makePrivateRequest({ url: `/users/${userId}`, method: "DELETE" })
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
    <div className="admin-user-list">
      <div className="d-flex mb-2">
        <Search
          onSearch={filter => getUsers(filter)}
          placeholder="usuário"
          request="users"
        />
        {isAllowedRole(['ROLE_ADMIN']) && (
          <button className="btn btn-primary btn-lg" onClick={handleCreate}>
            ADICIONAR
          </button>
        )}
      </div>
      <div>
        {userResponse?.content.map(user => (
          user.status === true ? (
            <Card user={user} onDisabled={onDisabled} buttonTitle={'INATIVAR'} key={user.id} />
          ) : (
            <Card user={user} onDisabled={onDisabled} buttonTitle={'ATIVAR'} key={user.id} />
          )
        ))}
      </div>
      {userResponse && (
        <Pagination
          totalPages={userResponse.totalPages}
          activePage={activePage}
          onChange={page => setActivePage(page)}
        />

      )}
    </div>
  )
}

export default List;