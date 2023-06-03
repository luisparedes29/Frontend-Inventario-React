import { data } from 'autoprefixer';
import React,{ useEffect, useState } from 'react';

const TablaIngredientes=()=> {
    const [search, setSearch] = useState('');
    const [option, setOption] = useState('nombre');
    const [ingredientes, setIngredientes] = useState([]);

    //traemos los datos del Backend
const API= "http://localhost:3000/"

    const showData= async ()=>{
        const response = await fetch(API+'ingredientes')
        const data = await response.json()
        console.log(data)
        setIngredientes(data)
    }
    



 

    //metodo de filtrado
    useEffect(()=>{
        showData()
    },[])


    //renderizamos la vista
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Cantidad</th>
                        <th>Descripcion</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ingredientes.map((data)=>(
                            <tr key={data.id}>
                                <td>{data.nombre}</td>
                                <td>{data.cantidadDisponible}</td>
                                <td>{data.descripcion}</td>
                            </tr>
                        ) )
                    }
                </tbody>
            </table>
        </div>
    );
}

export default TablaIngredientes;