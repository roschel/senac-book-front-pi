import React, { MouseEventHandler, useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import './styles.scss'
import { FiUpload } from 'react-icons/fi'
import makeRequest from '../../../../../services/api'
import { Image } from '../../../../../core/components/types/Product'

type Props = {
  onUploadSuccess: (imgUrl: Image[]) => void;
  productImageUrl: Image[] | undefined;
}

type ImageProps = {
  images: Image
}

const ImageUpload = ({ onUploadSuccess, productImageUrl }: Props) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [urlImage, setUrlImage] = useState<Image[]>();
  const imgUrl: string[] = []
  const retornandoUrl: Image[] = []
  const [urls, setUrls] = useState([''])


  const onUploadProgress = (progressEvent: ProgressEvent) => {
    const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);

    setUploadProgress(progress);
  }

  const uploadImage = (selectedImage: File) => {
    const payload = new FormData();
    payload.append('file', selectedImage);

    makeRequest({
      url: '/images/image',
      method: 'POST',
      data: payload,
      onUploadProgress
    })
      .then(response => {
        // setUrlImage(response.data.uri);
        console.log('response', response)
        retornandoUrl.push(response.data)
        // onUploadSuccess(response.data);
        imgUrl.push(response.data.imgUrl)
      })
      .catch(error => {
        alert('ERRROOOOOOOOOOO')
      })
      .finally(() => setUploadProgress(0));
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event.target.files;
    console.log('o que tem aqui?', selectedImage)

    if (selectedImage) {
      Array.from(selectedImage).forEach(image => {
        uploadImage(image)
      });
    }
    setUrlImage(retornandoUrl)
    setUrls(imgUrl)
    onUploadSuccess(retornandoUrl)
    console.log("imgUrl3432", imgUrl)
  }


  return (
    <div className="row">
      <div className="col-6">
        <div className="upload-button-container">
          <input type="file" accept="image/png, image/jpg" id="upload" onChange={handleChange} multiple />
          <label htmlFor="upload" className="">ADICIONAR IMAGEM</label>
        </div>
        <div className="upload-placeholder">
          {
            (urls && uploadProgress === 0) && (
              urls.map(image => (
                <div>
                  <img
                    src={image}
                    alt={image}
                    className="uploaded-image"
                  />
                </div>

              ))
            )
          }

        </div>

      </div>
      <div className="col-6 upload-placeholder">
        <small className="upload-text-helper text-primary">
          A imagem deve ser  JPG ou PNG e não deve ultrapassar <strong>5 MB</strong>.
              </small>
      </div>

    </div>
  );
}

export default ImageUpload;