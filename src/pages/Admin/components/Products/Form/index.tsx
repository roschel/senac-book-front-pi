import { makePrivateRequest } from '../../../../../services/api'
import React, { useEffect, useState } from 'react'
import BaseForm from '../../BaseForm'
import './styles.scss'
import { useForm, Controller } from 'react-hook-form'
import { useParams } from 'react-router'
import Select from 'react-select';
import { Category, Image } from '../../../../../core/components/types/Product'
import { isAllowedRole } from '../../../../../core/components/utils/auth'

import Upload from '../Upload'

type FormState = {
	title: string;
	description: string;
	category: number;
	quantity: string;
	status: string;
	rating: string;
	price: string;
	author: string;
	publisher: string;
	pages: string;
	size: string;
	year: string;
	edition: string;
	categories: Category[];
}

type ParamsType = {
	productId: string
}

const Form = () => {
	const { register, handleSubmit, setValue, control } = useForm<FormState>();
	const { productId } = useParams<ParamsType>();
	const [categories, setCategories] = useState<Category[]>([]);
	const isEditing = productId !== 'create'
	const formTitle = isEditing ? 'EDITAR PRODUTO' : 'CADASTRAR PRODUTO';
	const [disabled, setDisabled] = useState(true);
	const [urlImage, setUrlImage] = useState<Image[]>();
	const roleEstoque = !isAllowedRole(['ROLE_ADMIN']) && isEditing

	// const dataImg = new FormData();
	// if (selectedFile) {
	// 	dataImg.append('image', selectedFile);
	// }

	useEffect(() => {
		if (isEditing) {
			makePrivateRequest({ url: `/products/${productId}`, method: 'GET' })
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
		makePrivateRequest({ url: '/categories', method: 'GET' })
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

		console.log('payLoad', payLoad)
		console.log(setUrlImage)

		if (isEditing) {
			makePrivateRequest({ url: `/products/${productId}`, data: payLoad, method: 'PUT' })
				.then(() => {
					alert('Produto editado com sucesso')
				})
				.catch(() => {
					alert('Produto n??o editado')
				})
		} else {
			makePrivateRequest({ url: `/products`, data: payLoad, method: 'POST' })
				.then((response) => {
					console.log(response)
					alert('Produto adicionado com sucesso')
				})
				.catch(() => {
					alert('Produto n??o adicionado')
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
							name="title"
							placeholder="Nome do livro"
							disabled={!disabled}
							readOnly={roleEstoque}
						/>

						<Controller
							as={Select}
							defaultValue=""
							name="categories"
							rules={{ required: true }}
							control={control}
							options={categories}
							getOptionLabel={(option: Category) => option.name}
							getOptionValue={(option: Category) => String(option.id)}
							classNamePrefix="category-select"
							placeholder="Categoria"
							isMulti
							isDisabled={!disabled || roleEstoque}
						/>

						<input
							ref={register()}
							type="number"
							className="form-control mb-5 mt-5"
							name="quantity"
							placeholder="Quantidade"
							min="0"
							disabled={!disabled}
						/>

						<input
							ref={register()}
							type="number"
							className="form-control mb-5"
							name="price"
							placeholder="Pre??o"
							min="0"
							step=".01"
							disabled={!disabled}
							readOnly={roleEstoque}
						/>

						<input
							ref={register()}
							type="number"
							className="form-control mb-5"
							name="rating"
							placeholder="Classifica????o"
							min="0"
							step=".01"
							disabled={!disabled}
							readOnly={roleEstoque}
						/>

						<input
							ref={register()}
							type="text"
							className="form-control mb-5"
							name="author"
							placeholder="Autor"
							disabled={!disabled}
							readOnly={roleEstoque}
						/>

						<input
							ref={register()}
							type="text"
							className="form-control mb-5"
							name="publisher"
							placeholder="Editora"
							disabled={!disabled}
							readOnly={roleEstoque}
						/>
						<input
							ref={register()}
							type="text"
							className="form-control mb-5"
							name="edition"
							placeholder="Edi????o"
							disabled={!disabled}
							readOnly={roleEstoque}
						/>

						<input
							ref={register()}
							type="number"
							className="form-control mb-5"
							name="year"
							placeholder="Ano"
							min="0"
							disabled={!disabled}
							readOnly={roleEstoque}
						/>

						<input
							ref={register()}
							type="number"
							className="form-control mb-5"
							name="pages"
							placeholder="P??ginas"
							min="0"
							disabled={!disabled}
							readOnly={roleEstoque}
						/>

						<input
							ref={register()}
							type="text"
							className="form-control mb-5"
							name="size"
							placeholder="Tamanho (20 x 20 x 20 cm)"
							disabled={!disabled}
							readOnly={roleEstoque}
						/>

						<input
							ref={register()}
							type="checkbox"
							className="form-check-input"
							name="status"
							disabled={!disabled}
							readOnly={roleEstoque}
						/>
						<label className="form-check-label">Status</label>
					</div>

					<div className="col-6">
						<textarea
							className="form-control mb-5"
							ref={register()}
							name="description"
							cols={30}
							rows={10}
							placeholder="Descri????o"
							disabled={!disabled}
							readOnly={roleEstoque}
						></textarea>

						{!roleEstoque &&
							<div>
								<Upload
									onUploadSuccess={onUploadSuccess}
									productImageUrl={urlImage}
								/>
							</div>
						}


						{/* <input
							type="file"
							ref={register()}
							className="form-control mb-3"
							name="imageUrl"
							placeholder="Imagem"
						/>

						<input
							type="checkbox"
							ref={register()}
							name="principal"
							value="Principal"
							className="form-check-input" id="imageUrl"
						/>
						<label className="form-check-label" htmlFor="imageUrl">Principal</label> */}

					</div>
				</div>
			</BaseForm>
		</form>

	)
}

export default Form;