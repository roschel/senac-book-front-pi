import react from 'react';
import './styles.scss';

// type DataTable = {
//     titulo: string;
//     Editora: string;
//     Autor: string;
//     categoria: string;
//     QtdEtq: string;
//     Status: string;
//     Preço: string;
//     Editar: string;
//     InativarReativar: string;
//     Visualizar: string;
// }

// type Props = {
//     data: DataTable[]
// }

// const Table = ({ data }: Props) => {

//     const keys = Object.keys(data[0]);
//     const Row = ({ anchor }: AlignSetting) => {

//         const keys = Object.keys(anchor);
//         return (
//             <tr key={anchor.arguments}>
//                 {
//                     keys.map(key => <td key={key}></td>)
//                 }

//             </tr>
//         )
//     }
//     return (
//         <table className="table">
//             <thead>
//                 <tr>
//                     {
//                         keys.map(key => <th key={key}>{key}</th>)
//                     }
//                 </tr>
//             </thead>
//             <tbody>
//                 {
//                     data.map(record => <Row record={record} />)
//                 }

//             </tbody>
//         </table>

//     )
// }

const Table = () => {
    return (
        <table className="table">
            <thead>
                <tr>
                    Título
                </tr>
            </thead>
            <tbody>
                <td>
                    Linhas
                </td>
            </tbody>
        </table>

    )
}

export default Table
