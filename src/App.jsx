import { useState, useEffect } from 'react'
import ListadoNotas from './components/ListadoNotas';
import { calcularPorcentaje } from "./helpers"


function App() {

  const [notas, setNotas] = useState([]);

  useEffect(() =>{

    const consultarApi = async ()=>{

      const limit = "50"

        const url = `${import.meta.env.VITE_API_URL}${limit}`
        console.log(url)

      
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
        
        const arrayTotal = await resultado.pages
        console.log(arrayTotal)
      
        const arrayMapeado = await arrayTotal.map(array =>{
        
        const objeto = {
        autor: array.authors[0],
        titulo: array.title,
        recirculacion: array.stats.recirc,
        concurrentes: array.stats.article,
        path: array.path
        }
        return objeto
       
        })
       
        arrayMapeado.forEach(element => {
          const porcentaje= calcularPorcentaje(element.recirculacion, element.concurrentes)

          element.titulo === "Noticias sobre: Deportes, Política, Sociedad y más | Diario UNO" ? element.porcentaje=-1 : element.porcentaje=porcentaje
        
        });

        arrayMapeado.sort((a, b) =>{
          return b.porcentaje - a.porcentaje
        })
        
        const arrayOrdenado = arrayMapeado.slice(0, 10)
                       
      setNotas(arrayOrdenado)
    }
    consultarApi();

 /*    setInterval(() => {
      consultarApi()
    }, 5000); */
    

  },[])


  return (
    <div >
      <ListadoNotas
        notas = {notas}
       />
    </div>
  )
    
}

export default App
