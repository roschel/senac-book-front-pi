import { type } from 'node:os';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { Address } from '../../../../core/components/types/Client';
import { makePrivateRequest } from '../../../../services/api';
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
    const [disabledCpf, setDisabledCpf] = useState(true);
    const [disabledLogin, setDisabledLogin] = useState(true);
    const history = useHistory();

    useEffect(() => {
        if (isEditing) {
            makePrivateRequest({ url: `/clients/${clientId}` })
                .then(response => {
                    setValue('firstName', response.data.firstName);
                    setValue('lastName', response.data.lastName);
                    setValue('cpf', response.data.cpf);
                    setValue('login', response.data.login);
                    setValue('password', response.data.password);
                    setValue('status', response.data.status);
                    setValue('zipCode', response.data.address.zipCode)
                    setValue('address', response.data.address.address)
                    setValue('number', response.data.address.number)
                    setValue('addressComplement', response.data.address.addressComplement)
                    setValue('city', response.data.address.city)
                    setValue('state', response.data.address.state)
                    setValue('country', response.data.address.country)
                    setValue('payment', response.data.address.payment)
                    setDisabledCpf(false)
                    setDisabledLogin(false)
                })
        }

    }, [clientId, isEditing, setValue])

    const onSubmit = (formData: FormState) => {
        const payLoad = {
            ...formData
        }

        console.log('paylooooooooooooooooooad', payLoad)

        if (isEditing) {
            makePrivateRequest({ url: `/clients/${clientId}`, data: payLoad, method: "PUT" })
                .then(() => {
                    history.push(`/`)
                })
                .catch(() => {
                    alert('Usuário não editado')
                })
        } else {
            makePrivateRequest({ url: `/clients`, data: payLoad, method: "POST" })
                .then(() => {
                    history.push('/')
                })
                .catch(() => {
                    alert('Usuário não adicionado')
                })
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form-client">
            <BaseForm title={formTitle} buttonTitle={formTitle}>
                <div className="row">
                    <div className="col-6">
                        <input
                            ref={register()}
                            className="form-control mb-3"
                            type="text"
                            name="firstName"
                            placeholder="Nome"
                        />

                        <input
                            className="form-control mb-3"
                            type="text" placeholder="CPF"
                            disabled={!disabledCpf}
                        />

                    </div>
                    <div className="col-6">
                        <input
                            ref={register()}
                            className="form-control mb-3"
                            type="text"
                            name="lastName"
                            placeholder="Sobrenome"
                        />
                        <input
                            className="form-control mb-5"
                            type="text"
                            name="login"
                            placeholder="Email"
                            disabled={!disabledLogin}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <input
                            ref={register()}
                            className="form-control mb-3"
                            name="zipCode"
                            type="text"
                            placeholder="CEP"
                        />
                        <input
                            ref={register()}
                            className="form-control mb-3"
                            name="number"
                            type="text"
                            placeholder="Número"
                        />

                    </div>

                    <div className="col-6">
                        <input
                            ref={register()}
                            className="form-control mb-3"
                            name="address"
                            type="text"
                            placeholder="Logradouro"
                        />
                        <input
                            ref={register()}
                            className="form-control mb-3"
                            name="addressComplement"
                            type="text"
                            placeholder="Complemento"
                        />

                    </div>

                </div>
                <div className="row">
                    <div className="col-4">
                        <input
                            ref={register()}
                            className="form-control mb-3"
                            name="city"
                            type="text"
                            placeholder="Cidade"
                        />

                    </div>
                    <div className="col-4">
                        <input
                            ref={register()}
                            className="form-control mb-3"
                            name="state"
                            type="text"
                            placeholder="Estado"
                        />

                    </div>
                    <div className="col-4">
                        <input
                            ref={register()}
                            className="form-control mb-5"
                            name="country"
                            type="text"
                            placeholder="País"
                        />

                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <label className="titulo-card mt-2">Endereço de faturamento</label>

                        <input
                            ref={register()}
                            className="input-copiar-endereco-faturamento"
                            name="payment"
                            type="checkbox"
                        />
                        Copiar endereço de entrega
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <input
                            ref={register()}
                            className="form-control mb-3"
                            name="zipCode"
                            type="text"
                            placeholder="CEP"
                        />
                        <input
                            ref={register()}
                            className="form-control mb-3"
                            name="number"
                            type="text"
                            placeholder="Número"
                        />

                    </div>

                    <div className="col-6">
                        <input
                            ref={register()}
                            className="form-control mb-3"
                            name="address"
                            type="text"
                            placeholder="Logradouro"
                        />
                        <input
                            ref={register()}
                            className="form-control mb-3"
                            name="addressComplement"
                            type="text"
                            placeholder="Complemento"
                        />

                    </div>

                </div>
                <div className="row">
                    <div className="col-4">
                        <input
                            ref={register()}
                            className="form-control mb-3"
                            name="city"
                            type="text"
                            placeholder="Cidade"
                        />

                    </div>
                    <div className="col-4">
                        <input
                            ref={register()}
                            className="form-control mb-3"
                            name="state"
                            type="text"
                            placeholder="Estado"
                        />

                    </div>
                    <div className="col-4">
                        <input
                            ref={register()}
                            className="form-control mb-5"
                            name="country"
                            type="text"
                            placeholder="País"
                        />

                    </div>
                </div>

                <div className="row">
                    <div className="col-8 client-login">
                        <label className="titulo-card mt-2">Login</label>
                        <input
                            className="form-control mb-2"
                            type="text"
                            placeholder="Email"
                            disabled={!disabledLogin}
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