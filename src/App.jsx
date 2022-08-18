import { useState, useEffect } from 'react'
import { comparacion } from "./helpers"
import ListadoNotas from './components/ListadoNotas'


    function App() {

        const initialTemporal = []
        const [activar, setActivar] = useState(true)
        const [temporal, setTemporal] = useState(initialTemporal)
        const [ordenar, setOrdenar] = useState([])
        const [notas, setNotas] = useState([ ])
        
        // const resetState = () => setTemporal(initialState);
        
        useEffect(()=> {
            
            const consultarApi = async () => {

                const limit = "70"

                const url = `${import.meta.env.VITE_API_URL}${limit}`
                
                const respuesta = await fetch(url)
                const resultado = await respuesta.json()
                
                const arrayTotal = await resultado.pages

                const arrayMapeado = await (arrayTotal.map((array) =>{
                    const objeto = {
                        autor: array.authors[0],
                        recirculacion: array.stats.recirc,
                        concurrentes: array.stats.article,
                        porcentaje: 0,
                        titulo: array.title,
                        path: array.path,
                        contador: 1
                        }
                    return objeto
                }))

                let comparar =  comparacion(arrayMapeado)
                // setTemporal(comparar)
                localStorage.setItem("temporal", JSON.stringify(comparar))
                
            } 

            const bucle = () =>{

                let counter = 0;
                const i = setInterval(()=>{

                    consultarApi();

                    counter++;
                
                    if(counter === 120) {
                    clearInterval(i)
                    setActivar(false)
                    }
                     
                } , 500);
  
            }
                
        activar ? bucle() : setOrdenar(JSON.parse(localStorage.getItem('temporal')).sort((a, b) =>{
            return b.porcentaje - a.porcentaje
        })) 
             
        },[activar])

        useEffect(() =>{
            localStorage.removeItem("temporal")
            setNotas(ordenar.slice(0, 10)) 
        },[ordenar])

        useEffect(() =>{
            setTemporal(initialTemporal)
        },[notas])
        
        return ( 
            
            <div>
                <ListadoNotas
                notas={notas}
                setActivar={setActivar}
                /> 
       
            </div>
        )
    
    }

export default App
