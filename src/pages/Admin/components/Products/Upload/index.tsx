import React, { MouseEventHandler, useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import './styles.scss'
import { FiUpload } from 'react-icons/fi'
import makeRequest from '../../../../../services/api'

type Props = {
  onUploadSuccess: (imgUrl: string) => void;
  productImageUrl: string;
}

const ImageUpload = ({ onUploadSuccess, productImageUrl }: Props) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [urlImage, setUrlImage] = useState([]);
  const imgUrl = urlImage || productImageUrl;


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
        setUrlImage(response.data.uri);
        onUploadSuccess(response.data.uri);
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
  }


  return (
    <div className="row">
      <div className="col-6">
        <div className="upload-button-container">
          <input type="file" accept="image/png, image/jpg" id="upload" onChange={handleChange} multiple/>
          <label htmlFor="upload" className="">ADICIONAR IMAGEM</label>
        </div>
        <small className="upload-text-helper text-primary">
          A imagem deve ser  JPG ou PNG e não deve ultrapassar <strong>5 MB</strong>.
              </small>
      </div>
      <div className="col-6 upload-placeholder">
        
        {
          (imgUrl && uploadProgress === 0) && (
            imgUrl.map(url => (
              <img 
                src={url}
                alt={url}
                className="upload-image"
              />
            ))
          )


          // (imgUrl && uploadProgress === 0) && (
          //   <img
          //     src={imgUrl}
          //     alt={imgUrl}
          //     className="uploaded-image" />
          // )
        }

      </div>

    </div>
  );
}

export default ImageUpload;