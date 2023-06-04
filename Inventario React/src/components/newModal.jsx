import { data } from 'autoprefixer';
import React, { useState } from 'react';
const API = 'http://localhost:3000/';
import toast, { Toaster } from 'react-hot-toast';

const ingredientesDisponibles = [
    'Escamas de dragón',
    'Ojo de tritón',
    'Raíz de valeriana',
    'Ala de murciélago',
    'Sangre de unicornio',
    'Hueso de serpiente',
];

const CrearPocion = ({ funcion, actualizar, ingredientesValidacion }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [precio, setPrecio] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [categoria, setCategoria] = useState('');
    const [ingredientes, setIngredientes] = useState([]);
    const [imagen, setImagen] = useState(null);

    const handleIngredientChange = (e) => {
        const ingrediente = e.target.value;
        const isChecked = e.target.checked;

        if (isChecked) {
            setIngredientes((prevIngredientes) => [
                ...prevIngredientes,
                ingrediente,
            ]);
        } else {
            setIngredientes((prevIngredientes) =>
                prevIngredientes.filter((ing) => ing !== ingrediente)
            );
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            !nombre ||
            !cantidad ||
            !precio ||
            !descripcion ||
            !categoria ||
            !ingredientes
        ) {
            toast.error(
                'Datos incompletos, rellena todos los campos, la imagen es opcional'
            );
            return;
        }

        // Verificar si se han seleccionado ingredientes
        if (ingredientes.length === 0) {
            toast.error('Debes seleccionar al menos un ingrediente');
            return;
        }

        let validacionCantidad = ingredientes.map((item) => {
            const ingredienteValido = ingredientesValidacion.find(
                (item2) => item === item2.nombre
            );

            if (ingredienteValido) {
                if (cantidad > ingredienteValido.cantidadDisponible) {
                    toast.error(
                        `La cantidad seleccionada es mayor a la disponible en el ingrediente: ${ingredienteValido.nombre}`
                    );
                    return false;
                }
            }
            return true;
        });

        if (validacionCantidad.includes(false)) {
            return;
        }

        const pocionData = {
            nombre,
            cantidadDisponible: cantidad,
            precio,
            descripcion,
            categoria,
            ingredientesUtilizados: ingredientes,
        };

        try {
            const response = await fetch(API + 'nuevaPocion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pocionData),
            });

            if (response.ok) {
                const imageData = new FormData();
                imageData.append('nombre', nombre);
                imageData.append('image', imagen);

                if (imagen) {
                    const imageResponse = await fetch(API + 'upload', {
                        method: 'POST',
                        body: imageData,
                    });
                    if (imageResponse.ok) {
                        funcion();
                        actualizar();
                        setModalOpen(false);
                        resetForm();
                        toast.success('Pocion creada con exito');

                    }
                } else {
                    funcion();
                    actualizar();
                    setModalOpen(false);
                    resetForm();
                    toast.success('Pocion creada con exito');

                }

                // Actualizar la lista de pociones o realizar cualquier otra acción necesaria
            } else {
                toast.error(
                    'Ha ocurrido un error al momento de crear la pocion'
                );
                // Manejar el caso de error en la creación de la poción
            }
        } catch (error) {
            toast.error('Ha ocurrido un error de servidor');
            // Manejar el caso de error en la solicitud
        }
    };

    const resetForm = () => {
        setNombre('');
        setCantidad('');
        setPrecio('');
        setDescripcion('');
        setCategoria('');
        setIngredientes([]);
        setImagen(null);
    };

    return (
        <div>
            <button
                className="bg-[#278318] hover:bg-green-600 text-white px-4 py-2 rounded font-Rubik"
                onClick={() => setModalOpen(true)}
            >
                Crear Poción
            </button>
            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
                    <div className="w-full h-screen p-3 pt-10 sm:w-3/4 sm:p-8 sm:h-auto bg-white rounded xl:p-8">
                        <h2 className="text-xl mb-4">Crear Poción</h2>
                        <form
                            className="flex flex-wrap gap-1 items-end justify-evenly"
                            onSubmit={handleSubmit}
                        >
                            <div className="mb-4">
                                <label className="block mb-2">Nombre</label>
                                <input
                                    type="text"
                                    value={nombre}
                                    onChange={(e) => {
                                        setNombre(e.target.value);
                                    }}
                                    className="border border-gray-300 px-4 py-2 rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">Cantidad</label>
                                <input
                                    type="number"
                                    value={cantidad}
                                    min={1}
                                    onChange={(e) => {
                                        setCantidad(e.target.value);
                                    }}
                                    className="border border-gray-300 px-4 py-2 rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">Precio</label>
                                <input
                                    type="number"
                                    value={precio}
                                    min={1}
                                    onChange={(e) => {
                                        setPrecio(e.target.value);
                                    }}
                                    className="border border-gray-300 px-4 py-2 rounded"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2">Categoría</label>
                                <input
                                    type="text"
                                    value={categoria}
                                    onChange={(e) => {
                                        setCategoria(e.target.value);
                                    }}
                                    className="border border-gray-300 px-4 py-2 rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">
                                    Descripción
                                </label>
                                <textarea
                                    value={descripcion}
                                    rows={'5'}
                                    onChange={(e) => {
                                        setDescripcion(e.target.value);
                                    }}
                                    className="border border-gray-300 px-4 py-2 rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">
                                    Ingredientes
                                </label>
                                {ingredientesDisponibles.map(
                                    (ingrediente, index) => (
                                        <div
                                            className="flex items-center gap-3"
                                            key={index}
                                        >
                                            <input
                                                type="checkbox"
                                                id={ingrediente}
                                                value={ingrediente}
                                                checked={ingredientes.includes(
                                                    ingrediente
                                                )}
                                                onChange={
                                                    handleIngredientChange
                                                }
                                            />
                                            <label htmlFor={ingrediente}>
                                                {ingrediente}
                                            </label>
                                        </div>
                                    )
                                )}
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">Imagen</label>
                                <input
                                    className="border-2 border-black p-3 border-opacity-10 rounded-lg"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setImagen(e.target.files[0])
                                    }
                                />
                            </div>
                            <div className="">
                                <button
                                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mr-4"
                                    type="submit"
                                >
                                    Crear
                                </button>
                                <button
                                    className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
                                    onClick={() => setModalOpen(false)}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CrearPocion;
