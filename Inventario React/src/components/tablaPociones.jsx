import React, { useState, useEffect } from 'react';
const API = 'http://localhost:3000/';
import CrearPocion from './newModal';
import FormEdit from './FormEdit';
import ModalInfo from './modalPociones';
import { data } from 'autoprefixer';

const TablaPociones = ({actualizarIngredientes,ingredientesDisponibles}) => {
    const [search, setSearch] = useState('');
    const [option, setOption] = useState('nombre');
    const [pociones, setPociones] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [deletingPotion, setDeletingPotion] = useState(null);
    const [modalInfo, setModalInfo] = useState(false)
    const [info, setInfo]= useState(null)

    useEffect(() => {
        getPociones();
    }, []);

    const getPociones = async () => {
        const response = await fetch(API + 'pociones');
        const data = await response.json();
        console.log(data);
        setPociones(data);
    };
    const handleModalInfo= (value,data)=>{
        setInfo(data)
        setModalInfo(true)
    }

    const handleDeleteClick = (potion) => {
        setDeletingPotion(potion);
        setModalOpen(true);
    };

    const handleDeletePotion = async () => {
        await fetch(API + 'eliminarPocion/' + deletingPotion.id, { method: 'DELETE' });
        getPociones();
        actualizarIngredientes();
        setModalOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };
    const searcher = (e) => {
        setSearch(e.target.value);
        console.log(e.target.value);
    };
    let results = [];
    if (!search) {
        results = pociones;
    } else {
        let datos = [];
        datos = pociones;
        console.log(datos);
        results = datos.filter((dato) => {
            if (option === 'nombre') {
                return dato.nombre.toLowerCase().includes(search.toLowerCase());
            } else if (option === 'categoria') {
                return dato.categoria
                    .toLowerCase()
                    .includes(search.toLowerCase());
            } else if (option === 'descripcion') {
                return dato.descripcion
                    .toLowerCase()
                    .includes(search.toLowerCase());
            }
            return false;
        });
    }
    return (
        <div className='mt-10'>
            <h2 className="font-Rubik text-center text-[24px] mb-7">Lista de pociones</h2>

            <div className="w-full flex flex-col sm:flex-row sm:justify-evenly justify-between items-center gap-3">
                <form className='flex' onSubmit={handleSubmit}>
                    <label>
                        <select
                            value={option}
                            onChange={(e) => setOption(e.target.value)}
                            className='font-Rubik text-sm bg-[#278318] p-2 rounded mr-3'
                        >
                            <option value="nombre">Nombre</option>
                            <option value="categoria">Categoría</option>
                            <option value="descripcion">Descripción</option>
                        </select>
                    </label>
                    <input
                        type="text"
                        onChange={searcher}
                        value={search}
                        className="bg-[#4DBA3B] rounded font-Rubik text-black text-xs px-4 py-2 placeholder:text-black "
                        placeholder='Escribe tu búsqueda aquí'
                    ></input>
                </form>
                <CrearPocion funcion={getPociones} actualizar={actualizarIngredientes} ingredientesValidacion={ingredientesDisponibles}/>
            </div>
            <div className="flex flex-wrap justify-around mt-10">
                {results.map((data) => (
                    <div
                        className="max-w-xs bg-[#4DBA3B] min-h-min p-5 font-Rubik text-white bg-opacity-70 m-7"
                        key={data.id}
                    >
                        <ModalInfo visible={modalInfo} setVisible={setModalInfo} info={info}/>
                        <div className="flex flex-col text-center items-center">
                            <h3 className='text-2xl'>{data.nombre}</h3>
                            <figure className='w-28 p- hover:cursor-pointer' onClick={()=>handleModalInfo(false,data)}>
                                <img
                                    className="rounded-md"
                                    src={data.imagenPocion}
                                ></img>
                            </figure>
                        </div>
                        <div className="flex flex-col mt-7">
                            <p className="border-t p-2">
                                Precio: {data.precio}
                            </p>
                            <p className="border-t p-2">
                                Cantidad: {data.cantidadDisponible}
                            </p>
                            <p className="border-t p-2">
                                Descripción: {data.descripcion}
                            </p>
                            <div className="flex justify-evenly mt-8">
                                <FormEdit datos={data} funcion={getPociones} actualizar={actualizarIngredientes}/>
                                <button
                                    className="bg-[#278318] text-xs p-3 m-2 text-black rounded-xl"
                                    onClick={() => handleDeleteClick(data)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
                    <div className="bg-white rounded p-8">
                        <h2 className="text-xl mb-4">¿Estás seguro de eliminar la poción?</h2>
                        <div className="flex justify-center">
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mr-4"
                                onClick={handleDeletePotion}
                            >
                                Eliminar
                            </button>
                            <button
                                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
                                onClick={() => setModalOpen(false)}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TablaPociones;