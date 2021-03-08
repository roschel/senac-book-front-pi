import makeRequest from '../../../../../services/api'
import React, { useState } from 'react'
import BaseForm from '../../BaseForm'
import './styles.scss'

type FormState = {
	title: string;
	description: string;
	quantity: number;
	status: string;
	rating: number;
	price: number;
	author: string;
	publisher: string;
	pages: number;
	size: string;
	year: number;
	edition: string;
}

type FormEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>

const Form = () => {
	const [formData, setFormData] = useState<FormState>({
		title: '',
		description: '',
		quantity: 0,
		status: 'false',
		rating: 0,
		price: 0,
		author: '',
		publisher: '',
		pages: 0,
		size: '',
		year: 0,
		edition: ''
	});

	const handleOnChange = (event: FormEvent) => {
		const name = event.target.name;
		const value = event.target.value;
		setFormData(data => ({ ...data, [name]: value }));
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const payload = {
			...formData,
			imgUrl: 'https://rihappy.vteximg.com.br/arquivos/ids/790305-768-768/Console---Playstation-5---Sony-0.jpg?v=637366614035030000',
			// categories: [{ id: formData.category }]
		}
		makeRequest({ url: '/products', method: "POST", data: payload })
			.then(() => {
				setFormData({
					title: '',
					description: '',
					quantity: 0,
					status: 'false',
					rating: 0,
					price: 0,
					author: '',
					publisher: '',
					pages: 0,
					size: '',
					year: 0,
					edition: ''
				});
			})
	};

	return (
		<form onSubmit={handleSubmit}>
			<BaseForm title="cadastrar um produto">
				<div className="row">
					<div className="col-6">
						<input
							value={formData.title}
							type="text"
							className="form-control mb-5"
							onChange={handleOnChange}
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

						<input
							value={formData.quantity}
							type="number"
							className="form-control mb-5"
							onChange={handleOnChange}
							name="quantity"
							placeholder="Quantidade"
							min="0"
						/>

						<input
							value={formData.price}
							type="number"
							className="form-control mb-5"
							onChange={handleOnChange}
							name="price"
							placeholder="Preço"
							min="0"
						/>

						<input
							value={formData.rating}
							type="number"
							className="form-control mb-5"
							onChange={handleOnChange}
							name="rating"
							placeholder="Classificação"
							min="0"
						/>

						<input
							value={formData.author}
							type="text"
							className="form-control mb-5"
							onChange={handleOnChange}
							name="author"
							placeholder="Autor"
						/>

						<input
							value={formData.publisher}
							type="text"
							className="form-control mb-5"
							onChange={handleOnChange}
							name="publisher"
							placeholder="Editora"
						/>
						<input
							value={formData.edition}
							type="text"
							className="form-control mb-5"
							onChange={handleOnChange}
							name="edition"
							placeholder="Edição"
						/>

						<input
							value={formData.year}
							type="number"
							className="form-control mb-5"
							onChange={handleOnChange}
							name="year"
							placeholder="Ano"
							min="0"
						/>

						<input
							value={formData.pages}
							type="number"
							className="form-control mb-5"
							onChange={handleOnChange}
							name="pages"
							placeholder="Páginas"
							min="0"
						/>

						<input
							value={formData.size}
							type="text"
							className="form-control mb-5"
							onChange={handleOnChange}
							name="size"
							placeholder="Tamanho (20 x 20 x 20 cm)"
						/>

						<input
							value={formData.status}
							type="checkbox"
							className="form-check-input"
							onChange={handleOnChange}
							name="status"
						/>
						<label className="form-check-label">Status</label>
					</div>

					<div className="col-6">
						<textarea
							className="form-control mb-5"
							name="description"
							cols={30}
							rows={10}
							onChange={handleOnChange}
							value={formData.description}
							placeholder="Descrição"
						></textarea>

						<input
							type="text"
							className="form-control mb-3"
							name="imageUrl"
							placeholder="Imagem"
						/>

						<input
							type="checkbox"
							name="principal"
							value="Principal"
							className="form-check-input" id="imageUrl"
						/>
						<label className="form-check-label" htmlFor="imageUrl">Principal</label>

					</div>
				</div>
			</BaseForm>
		</form>

	)
}

export default Form;