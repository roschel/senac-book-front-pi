import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import './styles.scss'
import { FiUpload } from 'react-icons/fi'

interface Props {
    onFileUploaded: (file: File) => void;
}

const Upload: React.FC<Props> = ({ onFileUploaded }) => {
    const [selectedFileUrl, setSelectedFileUrl] = useState('');
        
    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles)
        const file = acceptedFiles[0];
        const fileUrl = URL.createObjectURL(file);
        setSelectedFileUrl(fileUrl);
        onFileUploaded(file);
    }, [onFileUploaded])

    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' })

    return (
        <div className="dropzone" {...getRootProps()}>
            <input {...getInputProps()} accept='image/*' />
            <p>
                <FiUpload />
                Imagens do Produto
            </p>
            <br />
            <img src={selectedFileUrl} alt="Imagem do produto"/>
        </div>
    )
}

export default Upload;