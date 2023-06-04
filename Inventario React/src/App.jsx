import { useState } from 'react'
import {prueba} from './services/peticiones'
import Header from './components/header'
import TablaIngredientes from './components/search'
import toast, { Toaster } from 'react-hot-toast';



function App() {


  return (
    <div>
    <Toaster/>
    <Header/>
    <TablaIngredientes/>
    </div>

  )
}

export default App
