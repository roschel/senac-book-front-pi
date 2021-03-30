import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useParams } from 'react-router'
import Select from 'react-select'
import { Category, Image } from '../../../../../../core/components/types/Product'
import { Role } from '../../../../../../core/components/types/User'
import makeRequest from '../../../../../../services/api'
import BaseForm from '../../../BaseForm'
import Upload from '../../../Products/Upload'
import './styles.scss'


type FormState = {
	name: string;
	cpf: string;
	endereco: string;
	login: string;
	password: string;
	email: string;
	roles: Role[];
}

type ParamsType = {
	userId: string
}

const Form = () => {
	const { register, handleSubmit, setValue, control } = useForm<FormState>();
	const { userId: productId } = useParams<ParamsType>();
	const [categories, setCategories] = useState<Category[]>([]);
	const isEditing = productId !== 'create'
	const formTitle = isEditing ? 'EDITAR USUÁRIO' : 'CADASTRAR USUÁRIO';
	const [disabled, setDisabled] = useState(true);
	const [urlImage, setUrlImage] = useState<Image[]>();

	// const dataImg = new FormData();
	// if (selectedFile) {
	// 	dataImg.append('image', selectedFile);
	// }

	useEffect(() => {
		if (isEditing) {
			makeRequest.get(`/products/${productId}`)
				.then(response => {
					setValue('title', response.data.title);
					setValue('description', response.data.description);
					setValue('quantity', response.data.quantity);
					setValue('status', response.data.status);
					setValue('rating', response.data.rating);
					setValue('price', response.data.price);
					setValue('author', response.data.author);
					setValue('publisher', response.data.publisher);
					setValue('pages', response.data.pages);
					setValue('size', response.data.size);
					setValue('year', response.data.year);
					setValue('edition', response.data.edition);
					setValue('categories', response.data.categories);
					setDisabled(response.data.status);
					setUrlImage(response.data.images)
				})
		}

	}, [productId, isEditing, setValue])

	useEffect(() => {
		makeRequest.get('/categories')
			.then(response => setCategories(response.data.content))
			.catch(() => {
				alert("Ocorreu um problema ao carregar as categories")
			})
	}, []);

	const onSubmit = (formData: FormState) => {
		const imgObjects = urlImage;

		const payLoad = {
			...formData,
			images: imgObjects //[{id:1, imgUrl: http, principal:true}]
		}

		console.log('payLoad',payLoad)
		console.log(setUrlImage)
		debugger
		if (isEditing) {
			makeRequest.put(`/products/${productId}`, payLoad)
				.then(() => {
					alert('Produto editado com sucesso')
				})
				.catch(() => {
					alert('Produto não editado')
				})
		} else {
			makeRequest.post(`/products`, payLoad)
				.then((response) => {
					console.log(response)
					alert('Produto adicionado com sucesso')
				})
				.catch(() => {
					alert('Produto não adicionado')
				})
		}
	}

	const onUploadSuccess = (imgUrl: Image[]) => {
		console.log('imgUrl', imgUrl)
		setUrlImage(imgUrl);
}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<BaseForm title={formTitle} buttonTitle={formTitle}>
				<div className="row">
					<div className="col-6">
						<input
							ref={register()}
							type="text"
							className="form-control mb-5"
							name="user"
							placeholder="Nome do Usuário"
							disabled={!disabled}
						/>

						<input
							ref={register()}
							type="text"
							className="form-control mb-5"
							name="cpf"
							placeholder="Digite o seu CPF"
							disabled={!disabled}
						/>

						<input
							ref={register()}
							type="text"
							className="form-control mb-5"
							name="endereco"
							placeholder="Endereço"
							disabled={!disabled}
						/>
						<input
							ref={register()}
							type="text"
							className="form-control mb-5"
							name="login"
							placeholder="Login: exemplo@email.com"
							disabled={!disabled}
						/>

						<input
							ref={register()}
							type="text"
							className="form-control mb-5"
							name="password"
							placeholder="Senha"
							disabled={!disabled}
						/>
					</div>
				</div>
			</BaseForm>
		</form>

	)
}

export default Form;