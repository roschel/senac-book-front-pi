import React, { useEffect, useState } from 'react'
import './styles.scss'
import { makePrivateRequest } from '../../../../../services/api'
import { Image } from '../../../../../core/components/types/Product'

type Props = {
  onUploadSuccess: (imgUrl: Image[]) => void;
  productImageUrl: Image[] | undefined;
}

const ImageUpload = ({ onUploadSuccess, productImageUrl }: Props) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageObject, setImageObject] = useState<Image[]>();
  const [update, setUpdate] = useState(false)
  const objectImage: Image[] = []

  useEffect(() => {
    console.log('renderizou')
    console.log('productImageUrlrenderizado', productImageUrl)
    if (productImageUrl) {
      setImageObject(productImageUrl)
    }
    setUpdate(false)
  }, [productImageUrl, update])

  const onUploadProgress = (progressEvent: ProgressEvent) => {
    const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);

    setUploadProgress(progress);
  }

  const uploadImage = (selectedImage: File) => {
    console.log("SERÁ?")
    const payload = new FormData();
    payload.append('file', selectedImage);

    makePrivateRequest({
      url: '/images/image',
      method: 'POST',
      data: payload,
      onUploadProgress
    })
      .then(response => {
        // setUrlImage(response.data.uri);
        console.log('response', response)
        objectImage.push(response.data)
        // onUploadSuccess(response.data);
      })
      .catch(error => {
        alert('ERRROOOOOOOOOOO')
      })
      .finally(() => setUploadProgress(0));
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event.target.files;
    console.log('o que tem aqui?', selectedImage)

    if (productImageUrl) {
      productImageUrl.map(obj => (
        objectImage.push(obj)
      ))
    }
    console.log('objectImage pré requisição', objectImage)
    if (selectedImage) {
      Array.from(selectedImage).forEach(image => {
        uploadImage(image)
      });
    }
    console.log('objectImage pós requisição', objectImage)
    setImageObject(objectImage)
    onUploadSuccess(objectImage)
  }

  const handleSelectPrincipal = (image: Image) => {
    imageObject?.forEach(object => {
      object["principal"] = false
      if (object.id === image.id) {
        object["principal"] = true
      }
    })

    console.log("alterei o principal?", imageObject)
    productImageUrl = imageObject
    setUpdate(true)
  }

  const handleDeleteImage = (id: number) => {
    if (imageObject) {
      for (var i = 0; i < imageObject.length; i++) {

        if (imageObject[i].id === id) {

          if (imageObject[i].principal) {
            return (alert('antes de deletar a capa do produto, selecione outra foto para ser capa.'))
          }


          makePrivateRequest({
            url: `/images/image/${id}`,
            method: 'DELETE',
          })
          imageObject[i]["status"] = false
        }
      }
      productImageUrl = imageObject
      console.log('productImageUrl', productImageUrl)
      setUpdate(true)
    }
  }


  return (
    <>
      <div className="row">
        <div className="col-6">
          <div className="upload-button-container">
            <input type="file" accept="image/png, image/jpg" id="upload" onChange={handleChange} multiple hidden />
            <label htmlFor="upload" className="">ADICIONAR IMAGEM</label>
          </div>
        </div>
        <div className="col-6 upload-placeholder">
          <small className="upload-text-helper text-primary">
            A imagem deve ser  JPG ou PNG e não deve ultrapassar <strong>5 MB</strong>.
        </small>
        </div>

      </div>
      <div className="upload-placeholder">
        {
          (imageObject && uploadProgress === 0) && (
            imageObject.map(image => (
              <>
                {image.status && (
                  <div className="row mb-2">
                    <div className="col-6 d-flex justify-content-center">
                      <img
                        src={image.imgUrl}
                        alt={image.imgUrl}
                        className="uploaded-image"
                      />
                    </div>
                    <div className="col-6 d-flex align-items-center justify-content-between">
                      <div className="align-items-center">
                        <input type="radio" id="principal" name="principal" onChange={() => handleSelectPrincipal(image)} checked={image.principal} />
                        <label htmlFor="principal">Capa</label>
                      </div>

                      <div className="align-items-center">
                        <span
                          className="btn btn-danger ml-3"
                          onClick={() => handleDeleteImage(image.id)}>
                          Excluir
                        </span>
                      </div>

                    </div>
                  </div>

                )}
              </>

            ))
          )
        }

      </div>
    </>

  );
}

export default ImageUpload;