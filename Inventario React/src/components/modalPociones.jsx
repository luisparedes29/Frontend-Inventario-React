import React, { useState } from 'react';
import {FaTimes} from 'react-icons/fa'


const ModalInfo = ({ visible, info, setVisible }) => {
    return (
        <div>
            {visible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
                    <div className="bg-[#60b352] rounded-lg p-4 m-4 w-full md:w-1/2 lg:w-1/2 xl:w-1/2 flex flex-col">
                    <FaTimes className='text-black text-xl hover:cursor-pointer' onClick={()=>setVisible(false)} />
                        <h3 className="text-black text-center m-2">{info.nombre}</h3>
                        <div className='flex flex-col items-center gap-4 justify-around m-5'>
                            <img
                                className="rounded-md w-[150px]"
                                src={info.imagenPocion}
                            ></img>
                            <div className='text-white bg-[#05660d] rounded p-5'>
                                <p className='p-1'>Precio: ${info.precio}</p>
                                <p className='p-1'>Cantidad de pociones: {info.cantidadDisponible}</p>
                                <p className='p-1'>Categoria: {info.categoria}</p>
                                <p className='p-1'>Ingredientes utilizados: {info.ingredientes}</p>
                                <p className='p-1'>Descripcion: {info.descripcion}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ModalInfo;
