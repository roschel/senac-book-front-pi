import { Redirect, Route } from 'react-router';
import './styles.scss';

const Auth = () => {
  return (
    <div>
      {/* <Redirect from="/auth" to="/auth/login" /> */}
      <Redirect from="/auth" to="/" />
    </div>
  )
}

export default Auth;