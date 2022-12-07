import { useState, useEffect} from 'react'
import { promediarPorcentajeNota, copiarArray, cambiarPosiciones, porcentajeAutor} from "./helpers"
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
        // const [porcentajeAutor, setPorcentajeAutor] = useState([])

 
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
                            porcentaje: obj.stats.recirc / obj.stats.article * 100,
                            porcentajeArray: [],
                            porcentajePromedioNota: 0,
                            posicionNueva: 0,
                            posicionAnterior: 0,
                            titulo: obj.title,
                            path: obj.path,
                            contador: 1
                            }
                        return objeto 

                    })

                    let promedio = promediarPorcentajeNota(arrayTotal)
                
                    localStorage.setItem("temporal", JSON.stringify(promedio))
                    
                } catch (error) {
                    console.log(error)
                }
                
            } 
        
            const bucle = () =>{

                let counter = 0;
                const i = setInterval(()=>{

                    consultarApi();

                    counter++;
                
                    if(counter === 3) {
                    clearInterval(i)
                    setActivar(false)
                    setCargando(false)
                    }
                     
                } , 3000);
                  
            }    

            if(activar){
                bucle()

            } else{

                const orden = (JSON.parse(localStorage.getItem('temporal')).sort((a, b) =>{
                    return b.porcentajePromedioNota - a.porcentajePromedioNota
                }));  

                const ordenCopy = JSON.parse(JSON.stringify(orden))

                setOrdenar(ordenCopy.filter(element => element.concurrentes > 2 && element.titulo !== "Diario UNO | Periodismo en serio y de verdad" ))
                
            }
             
        },[activar])


        useEffect(() =>{

            porcentajeAutor(ordenar)
            
            setNotas(ordenar)

            if (ordenar.length !== 0){
                const promediarPorcentajeGeneral = () => {  
                        
                        const promediar = (ordenar.reduce((a, b) => a + b.porcentajePromedioNota, 0) / ordenar.length).toFixed(0)
                        return promediar
                }
                setPorcentajeTotal(promediarPorcentajeGeneral)
            }
            
        },[ordenar])


        useEffect(() =>{

            notas.length > 1 && notas.forEach((element, indice) =>{
                const ranking = indice
                element.rankingRecirculacion = ranking
                const nueva = indice * 100
                element.posicionNueva = nueva
                const anterior = indice * 100
                element.posicionAnterior = anterior
                /* element.posicionNueva = indice * 100
                element.posicionAnterior = indice * 100 */
                setCargando(false)
            })
            
            const notasCopy = JSON.parse(JSON.stringify(notas))
    
            if(notasRender.length == 0){
            setNotasRender(notasCopy) 
            
            } else  {
                
                const actualizarPosiciones = cambiarPosiciones(notasRender, notasCopy)
                
                setNotasRender(actualizarPosiciones)   
            } 

        },[notas])

        return (  
            
        <>
            {cargando && localStorage.removeItem("temporal")}
            {cargando ? <Spinner style={{height: 'auto',}}/> : 

                <div className="bg-gray-700 sm:h-screen pb-4 box-border flex flex-col sm:justify-between ">
                    {cargando && <Spinner/>}
                    <div className="w-full sm:h-[27%] ">
                        <PorcentajePromedio 
                            porcentajeTotal={porcentajeTotal}
                        />  
                    </div>
                    
                    <ListadoNotas
                            notasRender={notasRender}
                            // ordenar={ordenar}
                            setActivar={setActivar}
                            alturaDiv={alturaDiv}
                            setAlturaDiv={setAlturaDiv}
                            // setCargando={setCargando}
                            // notasRenderConcurrentes={notasRenderConcurrentes}
                            // setNotasRenderConcurrentes={setNotasRenderConcurrentes}
                    />      
                    
                </div> 
            }
        </>
        )                    
    }

export default App
