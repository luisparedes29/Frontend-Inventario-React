import { data } from 'autoprefixer';
import React,{ useEffect, useState } from 'react';
import TablaPociones from './tablaPociones';

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
            <TablaPociones actualizarIngredientes={showData}/>
            <div className='flex justify-center'>
            <table>
                <thead>
                    <tr>
                        <th className='p-5 text-center border-b border-[#278318]'>Nombre</th>
                        <th className='p-5 text-center border-l border-b border-[#278318]'>Cantidad</th>
                        <th className='p-5 text-center border-b border-r border-l border-[#278318]'>Descripcion</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ingredientes.map((data)=>(
                            <tr key={data.id}>
                                <td className='border-r border-[#278318] text-center p-4'>{data.nombre}</td>
                                <td className='border-r border-[#278318] text-center p-4'>{data.cantidadDisponible}</td>
                                <td className='border-r border-[#278318] text-center p-4'>{data.descripcion}</td>
                            </tr>
                        ) )
                    }
                </tbody>
            </table>
            </div>
        </div>
    );
}

export default TablaIngredientes;