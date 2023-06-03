const API= "http://localhost:3000/"

const prueba= async  ()=>{
try {
        const response= await fetch(API+"ingredientes")
        const data= await response.json()
        return data
} catch (error) {
    console.error(error)
}
}

export{prueba}