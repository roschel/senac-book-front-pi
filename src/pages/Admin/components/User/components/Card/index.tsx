import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { User } from '../../../../../../core/components/types/User';
import './styles.scss';

type Props = {
  user: User;
  onDisabled: (userId: number) => void;
  buttonTitle: string;
}

const Card = ({ user, onDisabled, buttonTitle }: Props) => {

  const history = useHistory();
  const handleOnClick = (userId: number) => {
    history.push(`/users/${userId}`)
  }

  const Card = () => {
    return (
      <div className="card-base user-card-admin">
        <div className="row">
          <div className="col-7">
            <h3 className="user-card-name-admin">
              {user.name}
            </h3>
            <div className="user-card-author">
              <label className="user-card-author-label">Email:</label>
              <label>{user.login}</label>
            </div>
                    Id: {user.id}
          </div>
          <div className="col-3 mt-2">
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

            <div>
              <button
                type="button"
                className="btn btn-outline-info mt-2"
                onClick={() => handleOnClick(user.id)}
              >
                VISUALIZAR
                        </button>
            </div>

          </div>
        </div>
      </div>

    )
  }
}

export default Card;