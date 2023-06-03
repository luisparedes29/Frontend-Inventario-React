import React, { useState } from 'react';
const API = 'http://localhost:3000/';

const ingredientesDisponibles = [
    'Escamas de dragón',
    'Ojo de tritón',
    'Raíz de valeriana',
    'Ala de murciélago',
    'Sangre de unicornio',
    'Hueso de serpiente',
];

const CrearPocion = ({ funcion }) => {
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

        const pocionData = {
            nombre,
            cantidadDisponible: cantidad,
            precio,
            descripcion,
            categoria,
            ingredientesUtilizados: ingredientes,
        };
        console.log(JSON.stringify(pocionData));

        console.log(nombre);
        console.log(cantidad);
        console.log(precio);
        console.log(descripcion);
        console.log(categoria);
        console.log(ingredientes);

        try {
            const response = await fetch(API + 'nuevaPocion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pocionData),
            });

            // fetch(API+'nuevaPocion',{
            //     method: 'POST',
            //     body:JSON.stringify(pocionData),
            //     headers:{
            //         "Content-Type": "application/json",
            //     },
            // }).then((response)=>response.json())
            // .then((data)=>{
            //     console.log(data)
            // })

            if (response.ok) {
                funcion();

                const imageData = new FormData();
                imageData.append('nombre', nombre);
                imageData.append('image', imagen);
                console.log(imagen);
                const id = response.json();
                console.log(id);

                const imageResponse = await fetch(API + 'upload', {
                    method: 'POST',
                    body: imageData,
                });
                if (imageResponse.ok) {
                    setModalOpen(false);
                    resetForm();
                }

                // Actualizar la lista de pociones o realizar cualquier otra acción necesaria
            } else {
                // Manejar el caso de error en la creación de la poción
            }
        } catch (error) {
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
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                onClick={() => setModalOpen(true)}
            >
                Crear Poción
            </button>
            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
                    <div className="bg-white rounded p-8">
                        <h2 className="text-xl mb-4">Crear Poción</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block mb-2">Nombre</label>
                                <input
                                    type="text"
                                    value={nombre}
                                    onChange={(e) => {
                                        console.log(e.target.value);
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
                                    onChange={(e) => {
                                        console.log(e.target.value);
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
                                    onChange={(e) => {
                                        console.log(e.target.value);
                                        setPrecio(e.target.value);
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
                                    onChange={(e) => {
                                        console.log(e.target.value);
                                        setDescripcion(e.target.value);
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
                                        console.log(e.target.value);
                                        setCategoria(e.target.value);
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
                                        <div key={index}>
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
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setImagen(e.target.files[0])
                                    }
                                />
                            </div>
                            <div className="flex justify-center">
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
