import React, { MouseEventHandler, useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import './styles.scss'
import { FiUpload } from 'react-icons/fi'
import makeRequest from '../../../../../services/api'

interface Props {
  onFileUploaded: (file: File) => void;
}

type AwsProps = {
  uri: string;
  principal: string
}

const Upload: React.FC<Props> = ({ onFileUploaded }) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState<AwsProps[]>();
  const [arrayDeImagens, setArrayDeimagens] = useState<AwsProps[]>();


  const uploadImage = (file: File) => {
    const payload = new FormData();
    payload.append('file', file);
    payload.append('principal', "true")

    console.log("PAYLOOOOOOOOOOOOAD", payload)

    makeRequest.post('/images/image', payload)
      .then(response => {
        console.log(response.data)
        setSelectedFileUrl(response.data)
      })
      .catch(() => { alert('deu ruim') })
  }

  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles)
    const file = acceptedFiles;

    if (file) {
      console.log('entrei no if')
      file.map((arquivo: File) => (
        uploadImage(arquivo)
      ))
    }
    else {
      console.log('nem entrei no if')
    }


    // onFileUploaded(file);
  }, [onFileUploaded])

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' })

  return (
    <>
      <div className="dropzone" {...getRootProps()}>
        <input {...getInputProps()} name="file" accept='image/*' />
        <p>
          <FiUpload />
                Imagens do Produto
            </p>
        <br />

      </div>
      {selectedFileUrl && selectedFileUrl.map(foto =>(
        <div className="row">
          <div className="col-9">
            <img src={foto.uri} alt="Imagem do produto" />
          </div>
          <div className="col-3">
            <input type="radio" name="prinicpal" id="principal" value={foto.principal}/>
            <label htmlFor="principal" className="ml-2">Capa</label>
          </div>
        </div>
      ))}
    </>
  )
}

export default Upload;