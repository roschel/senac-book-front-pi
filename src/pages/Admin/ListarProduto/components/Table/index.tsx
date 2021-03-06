import react from 'react';
import './styles.scss';

type DataTable = {
    titulo: string;
    Editora: string;
    Autor: string;
    categoria: string;
    QtdEtq: string;
    Status: string;
    Preço: string;
    Editar: string;
    InativarReativar: string;
    Visualizar: string;
}

type Props = {
    data: DataTable[]
}

const Table = ({ data }:Props) => {

//     const keys = Object.keys(data[0]);
//     const Row = ({ record }) => {

//         const keys = Object.keys(record);
//         return (
//             <tr key={record.titulo}>
//                 {
//                     keys.map(key => <td key={key}>{record[key]}</td>)
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

export default Table
