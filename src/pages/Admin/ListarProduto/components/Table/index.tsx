import react from 'react';
import './styles.scss';
import DataTable from 'react-data-table-component';

export const listagemProduto = [
    {titulo: 'Aaaaaaa', Editora: 'bbbbbbb', Autor: 'ccccccc', categoria: 'ddddddd', QtdEtq: 'eeeeeee',
            Status: 'fffffff', Preço: 'ggggggg', 
            Editar: 'hhhhhhh', InativarReativar: 'iiiiiii', Visualizar:'jjjjjjj'},
            {titulo: 'Aaaaaaa', Editora: 'bbbbbbb', Autor: 'ccccccc', categoria: 'ddddddd', QtdEtq: 'eeeeeee',
            Status: 'fffffff', Preço: 'ggggggg', 
            Editar: 'hhhhhhh', InativarReativar: 'iiiiiii', Visualizar:'jjjjjjj'},
            {titulo: 'Aaaaaaa', Editora: 'bbbbbbb', Autor: 'ccccccc', categoria: 'ddddddd', QtdEtq: 'eeeeeee',
            Status: 'fffffff', Preço: 'ggggggg', 
            Editar: 'hhhhhhh', InativarReativar: 'iiiiiii', Visualizar:'jjjjjjj'},
            {titulo: 'Aaaaaaa', Editora: 'bbbbbbb', Autor: 'ccccccc', categoria: 'ddddddd', QtdEtq: 'eeeeeee',
            Status: 'fffffff', Preço: 'ggggggg', 
            Editar: 'hhhhhhh', InativarReativar: 'iiiiiii', Visualizar:'jjjjjjj'},
            {titulo: 'Aaaaaaa', Editora: 'bbbbbbb', Autor: 'ccccccc', categoria: 'ddddddd', QtdEtq: 'eeeeeee',
            Status: 'fffffff', Preço: 'ggggggg', 
            Editar: 'hhhhhhh', InativarReativar: 'iiiiiii', Visualizar:'jjjjjjj'},
            {titulo: 'Aaaaaaa', Editora: 'bbbbbbb', Autor: 'ccccccc', categoria: 'ddddddd', QtdEtq: 'eeeeeee',
            Status: 'fffffff', Preço: 'ggggggg', 
            Editar: 'hhhhhhh', InativarReativar: 'iiiiiii', Visualizar:'jjjjjjj'},
            {titulo: 'Aaaaaaa', Editora: 'bbbbbbb', Autor: 'ccccccc', categoria: 'ddddddd', QtdEtq: 'eeeeeee',
            Status: 'fffffff', Preço: 'ggggggg', 
            Editar: 'hhhhhhh', InativarReativar: 'iiiiiii', Visualizar:'jjjjjjj'},
            {titulo: 'Aaaaaaa', Editora: 'bbbbbbb', Autor: 'ccccccc', categoria: 'ddddddd', QtdEtq: 'eeeeeee',
            Status: 'fffffff', Preço: 'ggggggg', 
            Editar: 'hhhhhhh', InativarReativar: 'iiiiiii', Visualizar:'jjjjjjj'},
            {titulo: 'Aaaaaaa', Editora: 'bbbbbbb', Autor: 'ccccccc', categoria: 'ddddddd', QtdEtq: 'eeeeeee',
            Status: 'fffffff', Preço: 'ggggggg', 
            Editar: 'hhhhhhh', InativarReativar: 'iiiiiii', Visualizar:'jjjjjjj'},
            {titulo: 'Aaaaaaa', Editora: 'bbbbbbb', Autor: 'ccccccc', categoria: 'ddddddd', QtdEtq: 'eeeeeee',
            Status: 'fffffff', Preço: 'ggggggg', 
            Editar: 'hhhhhhh', InativarReativar: 'iiiiiii', Visualizar:'jjjjjjj'},
            {titulo: 'Aaaaaaa', Editora: 'bbbbbbb', Autor: 'ccccccc', categoria: 'ddddddd', QtdEtq: 'eeeeeee',
            Status: 'fffffff', Preço: 'ggggggg', 
            Editar: 'hhhhhhh', InativarReativar: 'iiiiiii', Visualizar:'jjjjjjj'},
            {titulo: 'Aaaaaaa', Editora: 'bbbbbbb', Autor: 'ccccccc', categoria: 'ddddddd', QtdEtq: 'eeeeeee',
            Status: 'fffffff', Preço: 'ggggggg', 
            Editar: 'hhhhhhh', InativarReativar: 'iiiiiii', Visualizar:'jjjjjjj'},
            {titulo: 'Aaaaaaa', Editora: 'bbbbbbb', Autor: 'ccccccc', categoria: 'ddddddd', QtdEtq: 'eeeeeee',
            Status: 'fffffff', Preço: 'ggggggg', 
            Editar: 'hhhhhhh', InativarReativar: 'iiiiiii', Visualizar:'jjjjjjj'},
            {titulo: 'Aaaaaaa', Editora: 'bbbbbbb', Autor: 'ccccccc', categoria: 'ddddddd', QtdEtq: 'eeeeeee',
            Status: 'fffffff', Preço: 'ggggggg', 
            Editar: 'hhhhhhh', InativarReativar: 'iiiiiii', Visualizar:'jjjjjjj'},
            {titulo: 'Aaaaaaa', Editora: 'bbbbbbb', Autor: 'ccccccc', categoria: 'ddddddd', QtdEtq: 'eeeeeee',
            Status: 'fffffff', Preço: 'ggggggg', 
            Editar: 'hhhhhhh', InativarReativar: 'iiiiiii', Visualizar:'jjjjjjj'},
            {titulo: 'Aaaaaaa', Editora: 'bbbbbbb', Autor: 'ccccccc', categoria: 'ddddddd', QtdEtq: 'eeeeeee',
            Status: 'fffffff', Preço: 'ggggggg', 
            Editar: 'hhhhhhh', InativarReativar: 'iiiiiii', Visualizar:'jjjjjjj'},
            {titulo: 'Aaaaaaa', Editora: 'bbbbbbb', Autor: 'ccccccc', categoria: 'ddddddd', QtdEtq: 'eeeeeee',
            Status: 'fffffff', Preço: 'ggggggg', 
            Editar: 'hhhhhhh', InativarReativar: 'iiiiiii', Visualizar:'jjjjjjj'},
            {titulo: 'Aaaaaaa', Editora: 'bbbbbbb', Autor: 'ccccccc', categoria: 'ddddddd', QtdEtq: 'eeeeeee',
            Status: 'fffffff', Preço: 'ggggggg', 
            Editar: 'hhhhhhh', InativarReativar: 'iiiiiii', Visualizar:'jjjjjjj'},

]

export const colunas = [
    {
        name: "titulo",
        selector: "titulo",
        sortable:true
    },
    {
        name: "Editora",
        selector: "Editora",
        sortable:true
    },
    {
        name: "Autor",
        selector: "Autor",
        sortable:true
    },
    {
        name: "categoria",
        selector: "categoria",
        sortable:true
    },
    {
        name: "QtdEtq",
        selector: "QtdEtq",
        sortable:true
    },
    {
        name: "Status",
        selector: "Status",
        sortable:true
    },
    {
        name: "Preço",
        selector: "Preço",
        sortable:true
    },
    {
        name: "Editar",
        selector: "Editar",
        sortable:true
    },
    {
        name: "InativarReativar",
        selector: "InativarReativar",
        sortable:true
    },
    {
        name: "Visualizar",
        selector: "Visualizar",
        sortable:true
    },
]

export const paginationOptions = {
    rowsPerPageText: "Livros por Página",
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos'
}