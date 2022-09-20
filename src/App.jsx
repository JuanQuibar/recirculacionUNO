import { useState, useEffect} from 'react'
import { comparacion, verificarLocalStorage } from "./helpers"
import ListadoNotas from './components/ListadoNotas'
import Swal from 'sweetalert2'




    function App() {
        
        const [activar, setActivar] = useState(true)
        const [ordenar, setOrdenar] = useState([])
        const [notas, setNotas] = useState([ ])
        const [cargando, setCargando] = useState(true)
        const [calculandoTraslado, setCalculandoTraslado] = useState(false)
        
        useEffect(()=> {

            const consultarApi = async () => {

                try {
                    const limit = "70"

                    const url = `${import.meta.env.VITE_API_URL}${limit}`
                    
                    const respuesta = await fetch(url)
                    respuesta.status !== 200 && verificarLocalStorage(consultarApi,setOrdenar) 
                    
                    const resultado = await respuesta.json()
                    
                    const arrayTotal =  await resultado.pages

                    const arrayMapeado = await (arrayTotal.map((obj, indice) =>{

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
                    }))

                    let comparar =  comparacion(arrayMapeado)
                
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
                
                    if(counter === 120) {
                    clearInterval(i)
                    setActivar(false)
                    }
                     
                } , 1000);
                
            }
                
            /* activar ? bucle() : setOrdenar(JSON.parse(localStorage.getItem('temporal')).sort((a, b) =>{
                return b.porcentaje - a.porcentaje
            })) */ 


            if(activar){
                bucle()
            } else{

                setOrdenar(JSON.parse(localStorage.getItem('temporal')).sort((a, b) =>{
                    return b.porcentaje - a.porcentaje
                }));

              
            }
             
        },[activar])


        /* useEffect(() =>{
            localStorage.removeItem("temporal")
             setNotas(ordenar.slice(0, 10))
             setCalculandoTraslado(true)
                
        },[ordenar]) */

        useEffect(() =>{

            if(ordenar.length > 1){
                setCargando(false)
                localStorage.removeItem("temporal")
                let timerInterval
                Swal.fire({
                icon: 'info',
                width: '500',
                iconColor: 'rgb(34, 197, 94)',
                title: 'Calculando recirculación',
                html: 'El proceso termina en <b></b> milisegundos',
                timer: 3000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()
                    const b = Swal.getHtmlContainer().querySelector('b')
                    timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft()
                    }, 100)
                },
                willClose: () => {
                    clearInterval(timerInterval)
                }
                })
                .then((result) => {
                // Read more about handling dismissals below
                if (result.dismiss === Swal.DismissReason.timer) {
                    setNotas(ordenar.slice(0, 10))
                }
                })
            }
                    
        },[ordenar]) 

        
        return ( 

            <>
                
                <ListadoNotas
                    notas={notas}
                    setNotas={setNotas}
                    setActivar={setActivar}
                    cargando={cargando}
                    setCargando={setCargando}
                /> 

            </> 

        )
    
    }

export default App
