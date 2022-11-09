import { useState, useEffect} from 'react'
import { comparacion, copiarArray, cambiarPosiciones} from "./helpers"
import ListadoNotas from './components/ListadoNotas'
import PorcentajePromedio from './components/PorcentajePromedio'
import Spinner from './components/Spinner'

    function App() {
        
        const [activar, setActivar] = useState(true)
        const [ordenar, setOrdenar] = useState([])
        const [notas, setNotas] = useState([])
        const [porcentajeTotal, setPorcentajeTotal] = useState(0)
        const [alturaDiv, setAlturaDiv] = useState("")
        const [notasRender, setNotasRender] = useState([])
        const [cargando, setCargando] = useState(true)

        useEffect(()=> {

            const consultarApi = async () => {

                try {
                    const limit = "70"

                    const url = `${import.meta.env.VITE_API_URL}${limit}`
                    
                    const respuesta = await fetch(url)

                    // respuesta.status !== 200 && verificarLocalStorage(setOrdenar) 
                    
                    const resultado = await respuesta.json()
                    
                    const arrayTotal =  await resultado.pages.map(obj =>{
                        const objeto = {
                            autor: obj.authors,
                            recirculacion: obj.stats.recirc,
                            concurrentes: obj.stats.article,
                            porcentaje: 0,
                            titulo: obj.title,
                            path: obj.path,
                            contador: 1
                            }
                        return objeto
                    })

                    let comparar =  comparacion(arrayTotal)
                
                    localStorage.setItem("temporal", JSON.stringify(comparar))
                    
                } catch (error) {
                    console.log(error)
                }
                
            } 
        
            const bucle = () =>{

                let counter = 0;
                const i = setInterval(()=>{

                    consultarApi();

                    counter++;
                
                    if(counter === 10) {
                    clearInterval(i)
                    setActivar(false)
                    }
                     
                } , 3000);
                  
            }    

            if(activar){
                bucle()

            } else{

                const orden = (JSON.parse(localStorage.getItem('temporal')).sort((a, b) =>{
                    return b.porcentaje - a.porcentaje
                }));  

                setOrdenar(orden.filter(element => element.concurrentes > 3))
                /* setOrdenar(JSON.parse(localStorage.getItem('temporal')).sort((a, b) =>{
                    return b.porcentaje - a.porcentaje
                })); */ 
            }
             
        },[activar])


        useEffect(() =>{

            localStorage.removeItem("temporal")
            setNotas(ordenar)
            // setNotas(ordenar.slice(0,30))

            if (ordenar.length !== 0){
                const promediarPorcentaje = () => {  
                        const filtrar = ordenar.filter(element =>element.concurrentes > 3)
                        const promediar = (filtrar.reduce((a, b) => a + b.porcentaje, 0) / filtrar.length).toFixed(0)
                        return promediar
                }
                setPorcentajeTotal(promediarPorcentaje)
            }
            
        },[ordenar])


        useEffect(() =>{

            notas.length > 1 && notas.forEach((element,indice) =>{
                element.posicionNueva = indice * 100
                element.posicionAnterior = indice * 100
                setCargando(false)
            })

            const notasCopy = copiarArray(notas)  
    
            if(notasRender.length == 0){
            setNotasRender(notas) 
            
            } else  {
                
                const actualizarPosiciones = cambiarPosiciones(notasRender, notasCopy)
                
                setNotasRender(actualizarPosiciones)   
            } 

        },[notas])

        return (  
        <>
            {cargando ? <Spinner 
            style={{
                height: 'auto',
            }}
            /> : 

                <div className="bg-gray-700 sm:h-screen pb-4 box-border flex flex-col sm:justify-between ">
                    {cargando && <Spinner/>}
                    <div className="w-full sm:h-[27%] ">
                        <PorcentajePromedio 
                            porcentajeTotal={porcentajeTotal}
                        />  
                    </div>
                    
                    <ListadoNotas
                            notasRender={notasRender}
                            ordenar={ordenar}
                            setActivar={setActivar}
                            alturaDiv={alturaDiv}
                            setAlturaDiv={setAlturaDiv}
                            setCargando={setCargando}
                    />   
                    
                </div> 
            }
        </>
        )                    
    }

export default App
