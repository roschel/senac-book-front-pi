import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../../../../../../core/components/types/User';
import { isAllowedRole } from '../../../../../../core/components/utils/auth';
import './styles.scss';

type Props = {
  user: User;
  onDisabled: (userId: number) => void;
  buttonTitle: string;
}

const Card = ({ user, onDisabled, buttonTitle }: Props) => {

  return (
    <div className="card-base user-card-admin">
      <div className="row">
        <div className="col-7">
          <h3 className="user-card-name-admin">
            <strong>
              {user.name}
            </strong>
          </h3>
          <div className="user-card-author">
            <label className="user-card-author-label">Email:</label>
            <label>{user.login}</label>
          </div>
          <div>
            <label className="user-card-cpf-label">
              <strong>
                CPF:
              </strong>
            </label>
            <label>{user.cpf}</label>
          </div>
          <div>
            <label className="user-card-status-label">
              <strong>
                Autorização:
              </strong>
            </label>
            {user.roles.map(role => (
              <label className="ml-2">{role.authority}</label>
            ))}
          </div>
        </div>
        {isAllowedRole(['ROLE_ADMIN']) && (

          <div className="col-3 offset-2 mt-2">
            <Link
              to={`/admin/users/${user.id}`}
              type="button"
              className="btn btn-outline-secondary"
            >
              EDITAR
            </Link>

            <button
              type="button"
              className="btn btn-outline-danger ml-2"
              onClick={() => onDisabled(user.id)}
            >
              {buttonTitle}
            </button>

          </div>
        )}
      </div>
    </div>

  )

}

export default Card;