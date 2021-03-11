import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import './styles.scss'
import { FiUpload } from 'react-icons/fi'
import makeRequest from '../../../../../services/api'

interface Props {
    onFileUploaded: (file: File) => void;
}

const Upload: React.FC<Props> = ({ onFileUploaded }) => {
    const [selectedFileUrl, setSelectedFileUrl] = useState('');
    

    const uploadImage = (file: File) => {
        const payload = new FormData();
        payload.append('file', file.name);

        console.log("PAYLOOOOOOOOOOOOAD",payload)

        makeRequest.post('/images/image', { data: file })
            .then(response => {
                console.log(response)
            })
            .catch(() => { alert('deu ruim') })
    }

    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles)
        const file = acceptedFiles[0];
        console.log("Vendo o que tem no file", file)
        const fileUrl = URL.createObjectURL(file);
        setSelectedFileUrl(fileUrl);
        console.log(fileUrl, typeof(fileUrl))

        if (file) {
            uploadImage(file)
        }
        console.log('nem entrei no if')


        // onFileUploaded(file);
    }, [onFileUploaded])

    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' })
    
    return (
        <div className="dropzone" {...getRootProps()}>
            <input {...getInputProps()} name="file" accept='image/*' />
            <p>
                <FiUpload />
                Imagens do Produto
            </p>
            <br />
            <img src={selectedFileUrl} alt="Imagem do produto" />


        </div>
    )
}

export default Upload;