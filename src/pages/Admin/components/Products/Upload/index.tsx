import React, { MouseEventHandler, useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import './styles.scss'
import { FiUpload } from 'react-icons/fi'
import makeRequest from '../../../../../services/api'
import { Image } from '../../../../../core/components/types/Product'
import { ReactComponent as UploadPlaceHolder } from '../../../../../core/assets/images/upload-placeholder.svg'
import { DropContainer, UploadMessage } from "./styles";

type Props = {
  onUploadSuccess: (imgUrl: Image[]) => void;
  // productImageUrl: Image[];
}

type ImageProps = {
  images: Image
}

const ImageUpload = ({ onUploadSuccess }: Props) => {

  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedImage, setUploadedImage] = useState<ImageProps[]>();
  const retorno: ImageProps[] = []
  // const imgUrl: string[] = []
  // const retornandoUrl: ImageProps[] = []
  // const [urls, setUrls] = useState([''])


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
        console.log(response)
        retorno.push(response.data) // [{id: 1, imgUrl: http, principal: true}, {id: 2, imgUrl: http, principal: true}]
        console.log('retorno no request', retorno)
        // setUploadedImage(response.data)
        // setUrlImage(response.data.uri);
        // console.log('response', response)
        // retornandoUrl.push(response.data)
        // onUploadSuccess(response.data);
        // imgUrl.push(response.data.imgUrl)
      })
      .catch(error => {
        alert('ERRROOOOOOOOOOO')
      })
      .finally(() => setUploadProgress(0));
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event.target.files;

    if (selectedImage) {
      Array.from(selectedImage).forEach(image => {
        console.log(1)
        uploadImage(image)
        console.log(2)
    });
    }
    // setUrlImage(retornandoUrl)
    // setUrls(imgUrl)
    // console.log("imgUrl3432", imgUrl)
    console.log('retonro pós request', retorno)
    setUploadedImage(retorno)
    // onUploadSuccess
  }


  return (
    <div className="row">
      <div className="col-6">
        <div className="upload-button-container">
          <input type="file" accept="image/png, image/jpg" id="upload" onChange={handleChange} multiple hidden />
          <label htmlFor="upload" className="">ADICIONAR IMAGEM</label>
        </div>
        <div className="upload-placeholder">
          {
            uploadProgress > 0 && (
              <>
                <UploadPlaceHolder />
                <div className="upload-progress-container">
                  <div className="upload-progress" style={{ width: `${uploadProgress}%` }}></div>
                </div>
              </>
            )
          }

          {
            uploadedImage && uploadedImage?.map(image => (
              <img src={image.images.imgUrl} alt={image.images.imgUrl}/>
            ))
          }

















          {/* {uploadProgress > 0 && (
            <>
              <UploadPlaceHolder />
              <div className="upload-progress-container">
                <div className="upload-progress" style={{ width: `${uploadProgress}%` }}></div>
              </div>
            </>
          )} */}

          {/* {
            (uploadedImage && uploadProgress === 0) && (
              <img
                src={uploadedImage}
                alt={uploadedImage}
                className="uploaded-image"
              />
            )
          } */}








          {/* {
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
        } */}

        </div>
      </div>
      <div className="col-6">
        <small className="upload-text-helper text-primary">
          A imagem deve ser  JPG ou PNG e não deve ultrapassar <strong>5 MB</strong>.
        </small>
      </div>
    </div>
  );
}

export default ImageUpload;