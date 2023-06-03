import { useState } from 'react'
import {prueba} from './services/peticiones'
import Header from './components/header'
import TablaIngredientes from './components/search'



function App() {


  return (
    <div>
    <Header/>
    <TablaIngredientes/>
    </div>

  )
}

export default App
