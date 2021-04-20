import { type } from 'node:os';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Address } from '../../../../core/components/types/Client';
import BaseForm from '../../../Admin/components/BaseForm';
import './styles.scss';

type FormState = {
	id: number;
    fistName: string;
	lastName: string;
	cpf: string;
	login: string;
	password: string;
	status: boolean;
	address: Address[];
}

type ParamsType = {
   clientId: string;  
}

const Register = () => {
    const { register, handleSubmit, setValue, control } = useForm<FormState>();
	const { clientId } = useParams<ParamsType>();
	const isEditing = clientId !== 'create'
	const formTitle = isEditing ? 'EDITAR CLIENTE' : 'CADASTRAR CLIENTE';
	const [disabled, setDisabled] = useState(true);
	    
    return (
        <form>
            <BaseForm title={formTitle} buttonTitle={formTitle}>
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
            </BaseForm>
        </form>
    )
}

export default Register;