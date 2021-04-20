import BaseForm from '../../../Admin/components/BaseForm'
import './styles.scss'

const Register = () => {
    return (
        <form>
            <div className="row card mb-2 mt-2">
                <div className="col-8 client-dados-pessoais">
                    <label className="titulo-card mt-2">Dados Pessoais</label>
                    <input 
                        className="form-control mb-2"
                        type="text" 
                        placeholder="Nome"
                    />
                    <input 
                        className="form-control mb-2"
                        type="text" 
                        placeholder="Sobrenome" 
                    />
                    <input
                        className="form-control mb-2" 
                        type="text" placeholder="CPF"
                    />
                    <input
                        className="form-control mb-2" 
                        type="text" 
                        placeholder="Email" 
                    />
                </div>
            </div>
            <div className="row card mb-2 mt-2 ">
                <div className="col-8 client-endereco-faturamento">
                    <label className="titulo-card mt-2">Endereço de faturamento</label>
                    <input
                        className="form-control mb-2" 
                        type="text" 
                        placeholder="CEP" 
                    />
                    <input
                        className="form-control mb-2" 
                        type="text" 
                        placeholder="Logradouro" 
                    />
                    <input
                        className="form-control mb-2" 
                        type="text" 
                        placeholder="Número" 
                    />
                    <input
                        className="form-control mb-2" 
                        type="text" 
                        placeholder="Cidade" 
                    />
                    <input
                        className="form-control mb-2" 
                        type="text" 
                        placeholder="UF" 
                    />
                    <input
                        className="form-control mb-2" 
                        type="text" 
                        placeholder="Complemento"
                    />
                </div>
            </div>
            <div className="row card mb-2 mt-2">
                <div className="col-8 client-endereco-entrega">
                    <label className="titulo-card mt-2">Endereço de entrega</label>
                    <label>
                        <input
                            className="input-copiar-endereco-faturamento"
                            type="checkbox"
                        />
                        Copiar endereço de faturamento
                    </label>
                    <input
                        className="form-control mb-2" 
                        type="text" 
                        placeholder="CEP" 
                    />
                    <input
                        className="form-control mb-2" 
                        type="text" 
                        placeholder="Logradouro" 
                    />
                    <input
                        className="form-control mb-2" 
                        type="text" 
                        placeholder="Número" 
                    />
                    <input
                        className="form-control mb-2" 
                        type="text" 
                        placeholder="Cidade" 
                    />
                    <input
                        className="form-control mb-2" 
                        type="text" 
                        placeholder="UF" 
                    />
                    <input
                        className="form-control mb-2" 
                        type="text" 
                        placeholder="Complemento"
                    />
                </div>
            </div>
            <div className="row card mb-2 mt-2">
                <div className="col-8 client-login">
                    <label className="titulo-card mt-2">Login</label>
                    <input
                        className="form-control mb-2"
                        type="text"
                        placeholder="Email"
                        disabled
                    />                   
                    <input 
                        className="form-control mb-2"
                        type="text" 
                        placeholder="Senha" 
                    />
                </div>
            </div>
        </form>
    )
}

export default Register;