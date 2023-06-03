import React, { useEffect, useState } from 'react';
const API = 'http://localhost:3000/';

const ingredientesDisponibles = [
    'Escamas de dragón',
    'Ojo de tritón',
    'Raíz de valeriana',
    'Ala de murciélago',
    'Sangre de unicornio',
    'Hueso de serpiente',
];

function FormEdit({ datos, funcion, actualizar }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [nombre, setNombre] = useState(datos.nombre);
    const [cantidad, setCantidad] = useState(datos.cantidadDisponible);
    const [precio, setPrecio] = useState(datos.precio);
    const [descripcion, setDescripcion] = useState(datos.descripcion);
    const [categoria, setCategoria] = useState(datos.categoria);
    const [ingredientes, setIngredientes] = useState(
        datos.ingredientes.split(', ')
    );
    const [imagen, setImagen] = useState(datos.imagenPocion);

    useEffect(() => {}, []);

    const handleIngredientChange = (e) => {
        const ingrediente = e.target.value;
        const isChecked = e.target.checked;

        if (isChecked) {
            setIngredientes([...ingredientes, ingrediente]);
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
        try {
            const response = await fetch(API + `editarPocion/${datos.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pocionData),
            });
            if (response.ok) {
                const imageData = new FormData();
                imageData.append('nombre', nombre);
                imageData.append('image', imagen);
                console.log(imagen);
                const id = response.json();

                const imageResponse = await fetch(API + 'upload', {
                    method: 'POST',
                    body: imageData,
                });
                if (imageResponse.ok) {
                    console.log('ok');
                }
                setModalOpen(false);
                funcion();
                actualizar();

                // Actualizar la lista de pociones o realizar cualquier otra acción necesaria
            } else {
                // Manejar el caso de error en la creación de la poción
            }
        } catch (error) {
            // Manejar el caso de error en la solicitud
        }
    };

    const resetForm = () => {
        setNombre(datos.nombre);
        setCantidad(datos.cantidadDisponible);
        setPrecio(datos.precio);
        setDescripcion(datos.descripcion);
        setCategoria(datos.categoria);
        setIngredientes(datos.ingredientes.split(', '));
        setImagen(datos.imagenPocion);
    };

    return (
        <div>
            <button
                className="bg-[#278318] text-xs p-3 m-2 text-black rounded-xl"
                onClick={() => setModalOpen(true)}
            >
                Editar
            </button>
            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
                <div className="w-3/5 bg-white rounded p-8 text-black font-sans">
                  <h2 className="text-xl mb-4">Editar Pocion</h2>
                  <form
                    className="flex flex-wrap gap-3 items-end justify-evenly"
                    onSubmit={handleSubmit}
                  >
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
                      <label className="block mb-2">Descripción</label>
                      <textarea
                      rows={'5'}
                        value={descripcion}
                        onChange={(e) => {
                          console.log(e.target.value);
                          setDescripcion(e.target.value);
                        }}
                        className="border border-gray-300 px-4 py-2 rounded"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2">Ingredientes</label>
                      {ingredientesDisponibles.map((ingrediente, index) => (
                        <div className="flex items-center  gap-2" key={index}>
                          <input
                            type="checkbox"
                            id={ingrediente}
                            value={ingrediente}
                            checked={ingredientes.includes(ingrediente)}
                            onChange={handleIngredientChange}
                          />
                          <label className="" htmlFor={ingrediente}>{ingrediente}</label>
                        </div>
                      ))}
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2">Imagen</label>
                      <input
                      className="p-3 border-2 border-black border-opacity-10 rounded-lg"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImagen(e.target.files[0])}
                      />
                    </div>
                    <div className="flex justify-center">
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mr-4"
                        type="submit"
                      >
                        Enviar
                      </button>
                      <button
                        className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
                        onClick={() => {
                          setModalOpen(false);
                          resetForm();
                        }}
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
}

export default FormEdit;
