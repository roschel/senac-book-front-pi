import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { isAllowedRole, saveSessionData } from '../../../../core/components/utils/auth';
import { getCartData, saveCartData } from '../../../../core/components/utils/cart';
import { makeLogin } from '../../../../services/api';
import AuthCard from '../Card';
import './styles.scss';

type FormState = {
  username: string;
  password: string;
}

type Props = {
  showModal: boolean;
  setShowModal: (state: boolean) => void;
}

const Login = ({ showModal, setShowModal }: Props) => {
  const { register, handleSubmit } = useForm<FormState>();
  const history = useHistory();

  const onSubmit = (data: FormState) => {
    console.log('data', data)

    makeLogin(data)
      .then(response => {
        saveSessionData(response.data)

        if (isAllowedRole(['ROLE_ADMIN'])) {
          console.log('admin')
          console.log('response', response)
          if (!response.data.userStatus) {
            history.push('/auth/login')
            alert(`Usuário ${response.data.login} se encontra desativado`)
            return
          }
          setShowModal(false);
          history.push('/admin/products')
        } else {
          setShowModal(false);
          console.log('cliente')
          const cart = getCartData()
          if (cart.products) {
            cart.customerId = response.data.userId
          } else {
            cart.products = []
            cart.customerId = response.data.userId
          }
          saveCartData(cart)
          history.push('/')
        }
      })
      .catch(e => {
        console.log('erro', e)
        alert('usuário ou senha incorretos')
      })
  }

  const handleCancel = () => {
    history.push('/')
    setShowModal(false)
  }

  const handleRegister = () => {
    history.push('/client/register')
  }

  const handleClose = () => setShowModal(false);

  return (
    <div>
      <Modal show={showModal} onHide={handleClose}>
        <div className="login-title">
          LOGIN
        </div>
        <Modal.Body className="login-container">
            <form  className="login-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="margin-bottom-30">
                <input
                  type="email"
                  name="username"
                  ref={register({
                    required: "Campo obrigatório",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Email inválido"
                    }
                  })}
                  placeholder="Email"
                  className="form-control input-base"
                />
              </div>
              <div className="margin-bottom-30">
                <input
                  type="password"
                  name="password"
                  ref={register({ required: "Campo obrigatório" })}
                  placeholder="Senha"
                  className="form-control input-base"
                />
              </div>

              <div className="text-center">
                <button className="btn btn-danger border-radius-10" onClick={handleCancel}>
                  Cancelar
                </button>

                <button className="btn btn-primary border-radius-10 ml-2">
                  Entrar
                </button>
              </div>

              <div className="cadastrar">
                <div className="divisao">
                  <div className="linha" />
                  <h4>ou</h4>
                  <div className="linha" />
                </div>

                <h4><strong>Crie uma conta</strong></h4>

                <button className="btn btn-primary border-radius-10 ml-2 mt-3" onClick={handleRegister}>
                  Cadastre-se
              </button>
              </div>
            </form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default Login