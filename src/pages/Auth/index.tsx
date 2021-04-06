import { Route, Redirect } from 'react-router';
import Login from './components/Login';
import './styles.scss';

const Auth = () => {
    return(
        <div>
            <Route path="/auth/login" >
                <Login />
            </Route>
            <Redirect from="/auth" to="/auth/login" />
        </div>
    )
}

export default Auth;