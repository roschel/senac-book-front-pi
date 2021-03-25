import makeRequest from '../../../../../services/api'
import React, { useEffect, useState } from 'react'
import BaseForm from '../../BaseForm'
import './styles.scss'
import { useForm, Controller } from 'react-hook-form'
import { useParams } from 'react-router'
import Select from 'react-select';
import { Category, Image } from '../../../../../core/components/types/Product'

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
			images: imgObjects
		}

		console.log('payLoad',payLoad)
		debugger
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
			<BaseForm title={formTitle}>
				<div className="row">
					<div className="col-6">
						<input
							ref={register()}
							type="text"
							className="form-control mb-5"
							name="title"
							placeholder="Nome do livro"
							disabled={!disabled}
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
							isDisabled={!disabled}
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
							placeholder="Preço"
							min="0"
							step=".01"
							disabled={!disabled}
						/>

						<input
							ref={register()}
							type="number"
							className="form-control mb-5"
							name="rating"
							placeholder="Classificação"
							min="0"
							step=".01"
							disabled={!disabled}
						/>

						<input
							ref={register()}
							type="text"
							className="form-control mb-5"
							name="author"
							placeholder="Autor"
							disabled={!disabled}
						/>

						<input
							ref={register()}
							type="text"
							className="form-control mb-5"
							name="publisher"
							placeholder="Editora"
							disabled={!disabled}
						/>
						<input
							ref={register()}
							type="text"
							className="form-control mb-5"
							name="edition"
							placeholder="Edição"
							disabled={!disabled}
						/>

						<input
							ref={register()}
							type="number"
							className="form-control mb-5"
							name="year"
							placeholder="Ano"
							min="0"
							disabled={!disabled}
						/>

						<input
							ref={register()}
							type="number"
							className="form-control mb-5"
							name="pages"
							placeholder="Páginas"
							min="0"
							disabled={!disabled}
						/>

						<input
							ref={register()}
							type="text"
							className="form-control mb-5"
							name="size"
							placeholder="Tamanho (20 x 20 x 20 cm)"
							disabled={!disabled}
						/>

						<input
							ref={register()}
							type="checkbox"
							className="form-check-input"
							name="status"
							disabled={!disabled}
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
							placeholder="Descrição"
							disabled={!disabled}
						></textarea>

						<div>
							<Upload
								 onUploadSuccess={onUploadSuccess} 
								 productImageUrl={urlImage}
							/>
						</div>

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