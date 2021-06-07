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
import { Flip, toast, ToastContainer } from 'react-toastify'

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

  const notifySuccess = (message: string) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      closeButton: false,
    })
  };

  const notifyError = (message: string) => {
    toast.error(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      closeButton: false,
    })
  };

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
        notifyError("Ocorreu um problema ao carregar as categories")
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
          notifySuccess('Produto editado com sucesso')
        })
        .catch(() => {
          notifyError('Produto não editado')
        })
    } else {
      makePrivateRequest({ url: `/products`, data: payLoad, method: 'POST' })
        .then((response) => {
          console.log(response)
          notifySuccess('Produto adicionado com sucesso')
        })
        .catch(() => {
          notifyError('Produto não adicionado')
        })
    }
  }

  const onUploadSuccess = (imgUrl: Image[]) => {
    console.log('imgUrl', imgUrl)
    setUrlImage(imgUrl);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <BaseForm title={formTitle} buttonTitle={formTitle}>
          <div className="row form-container">
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
                placeholder="Preço"
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
                placeholder="Classificação"
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
                placeholder="Edição"
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
                placeholder="Páginas"
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
                placeholder="Descrição"
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
            </div>
          </div>
        </BaseForm>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Flip}
        style={{ width: "auto", color: "var(--white-equals)" }}
      />
    </>
  )
}

export default Form;