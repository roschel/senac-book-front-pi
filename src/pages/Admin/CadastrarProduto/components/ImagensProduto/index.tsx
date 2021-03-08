import './style.scss'

// import { AiFillPicture } from 'react-icons/ai'

export function ImagensProduto() {
    return (
        <article className="container">
            <input className="buscar" accept="image/*" type="file" placeholder="Pesquise o local da imagem" />
            <section className="config">
                <label className="capa"><input type="checkbox" name="img-capa" id="" />Capa</label>
                <button className="upload">Upload</button>
                <input className="checkImg1" type="checkbox" name="img-capa" id="" />
                <input className="checkImg2" type="checkbox" name="img-capa" id="" />
                <div className="img1"></div>
                <div className="img2"></div>
            </section>
            <button className="excluir">Excluir Selecionado</button>
        </article>
    );
}