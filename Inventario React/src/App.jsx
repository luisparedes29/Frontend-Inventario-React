import { useState } from 'react'
import {prueba} from './services/peticiones'
import Header from './components/header'
import TablaPociones from './components/tablaPociones'
import TablaIngredientes from './components/search'

const datos = async ()=>{
  const data= await prueba()
  console.log(data)
}

function App() {
datos()

  return (
    <div>
    <Header/>
    <TablaPociones/>
    <TablaIngredientes/>
    </div>

  )
}

export default App
