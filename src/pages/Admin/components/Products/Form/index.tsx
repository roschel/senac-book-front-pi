import makeRequest from '../../../../../services/api'
import React, { useEffect, useState } from 'react'
import BaseForm from '../../BaseForm'
import './styles.scss'
import { useForm, Controller } from 'react-hook-form'
import { useHistory, useParams } from 'react-router'
import Select from 'react-select';
import { Category } from '../../../../../core/components/types/Product'

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

type FormEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>

const Form = () => {
	const { register, handleSubmit, setValue, control } = useForm<FormState>();
	const history = useHistory();
	const { productId } = useParams<ParamsType>();
	const [categories, setCategories] = useState<Category[]>([]);
	const isEditing = productId !== 'create'
	const formTitle = isEditing ? 'EDITAR PRODUTO' : 'CADASTRAR PRODUTO';

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
				})
		}

	}, [productId, isEditing, setValue])

	useEffect(() => {
		makeRequest({ url: '/categories' })
			.then(response => setCategories(response.data.content))
			.catch(() => {
				alert("Ocorreu um problema ao carregar as categories")
			})
	}, []);

	// const [formData, setFormData] = useState<FormState>({
	// 	title: '',
	// 	description: '',
	// 	quantity: '',
	// 	status: 'false',
	// 	rating: '',
	// 	price: '',
	// 	author: '',
	// 	publisher: '',
	// 	pages: '',
	// 	size: '',
	// 	year: '',
	// 	edition: ''
	// });

	// const handleOnChange = (event: FormEvent) => {
	// 	const name = event.target.name;
	// 	const value = event.target.value;
	// 	setFormData(data => ({ ...data, [name]: value }));
	// };

	const onSubmit = (formData: FormState) => {

		const payLoad = {
			...formData,
			categories: [{ id: formData.category }]
		}

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
				.then(() => {
					alert('Produto adicionado com sucesso')
				})
				.catch(() => {
					alert('Produto não adicionado')
				})
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<BaseForm title={formTitle}>
				<div className="row">
					<div className="col-6">
						<input
							// value={formData.title}
							ref={register()}
							type="text"
							className="form-control mb-5"
							// onChange={handleOnChange}
							name="title"
							placeholder="Nome do livro"
						/>

						{/* <select
							className="form-control mb-5"
							onChange={handleOnChange}
							name="category"
							placeholder="Categorias"
							value={formData.category}
						>
							<option value="1">Categorias</option>
							<option value="2">Livros</option>
							<option value="3">Computadores</option>
							<option value="4">Eletrônicos</option>
						</select> */}

						<Controller
							as={Select}
							defaultValue=""
							name="categories"
							rules={{ required: true }}
							control={control}
							options={categories}
							getOptionLabel={(option: Category) => option.name}
							getOptionValue={(option: Category) => option.id.toString()}
							classNamePrefix="category-select"
							placeholder="Categoria"
							isMulti
						/>

						<input
							// value={formData.quantity}
							ref={register()}
							type="number"
							className="form-control mb-5 mt-5"
							// onChange={handleOnChange}
							name="quantity"
							placeholder="Quantidade"
							min="0"
						/>

						<input
							// value={formData.price}
							ref={register()}
							type="number"
							className="form-control mb-5"
							// onChange={handleOnChange}
							name="price"
							placeholder="Preço"
							min="0"
						/>

						<input
							// value={formData.rating}
							ref={register()}
							type="number"
							className="form-control mb-5"
							// onChange={handleOnChange}
							name="rating"
							placeholder="Classificação"
							min="0"
						/>

						<input
							// value={formData.author}
							ref={register()}
							type="text"
							className="form-control mb-5"
							// onChange={handleOnChange}
							name="author"
							placeholder="Autor"
						/>

						<input
							// value={formData.publisher}
							ref={register()}
							type="text"
							className="form-control mb-5"
							// onChange={handleOnChange}
							name="publisher"
							placeholder="Editora"
						/>
						<input
							// value={formData.edition}
							ref={register()}
							type="text"
							className="form-control mb-5"
							// onChange={handleOnChange}
							name="edition"
							placeholder="Edição"
						/>

						<input
							// value={formData.year}
							ref={register()}
							type="number"
							className="form-control mb-5"
							// onChange={handleOnChange}
							name="year"
							placeholder="Ano"
							min="0"
						/>

						<input
							// value={formData.pages}
							ref={register()}
							type="number"
							className="form-control mb-5"
							// onChange={handleOnChange}
							name="pages"
							placeholder="Páginas"
							min="0"
						/>

						<input
							// value={formData.size}
							ref={register()}
							type="text"
							className="form-control mb-5"
							// onChange={handleOnChange}
							name="size"
							placeholder="Tamanho (20 x 20 x 20 cm)"
						/>

						<input
							// value={formData.status}
							ref={register()}
							type="checkbox"
							className="form-check-input"
							// onChange={handleOnChange}
							name="status"
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
							// onChange={handleOnChange}
							// value={formData.description}
							placeholder="Descrição"
						></textarea>

						{/* <input
							type="text"
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