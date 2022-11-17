import {useEffect, useRef} from 'react';
import { arreglarCaracteres} from "../helpers"

const NotaPeor = ({nota, i,setAlturaDiv, resta}) => {

    /* nota.posicionAnterior= nota.posicionAnterior-3000
    nota.posicionNueva= nota.posicionNueva-3000 */
    


    const ref = useRef(null)
    const {autor, titulo, porcentajePromedioNota, posicionNueva, posicionAnterior} = nota
    const restar = (resta - 1) * 100 - 900
    
    useEffect(() => {
  
      setAlturaDiv(ref.current.clientHeight)

    },[])

    const {concurrentes} = nota

  return (

    <div className={`traslado${i}`} ref={ref}>

      <div className="flex items-end justify-between mx-2 px-2 pb-2 mb-3 sm:mx-4 sm:px-4 sm:mb-0 sm:pb-1 sm:pt-1 bg-gray-600 rounded-md box-border h-full  border-gray-700 border-solid border-1">
          
        <div className="flex justify-start sm:truncate mr-3"> 

          <p className="text-gray-400 mr-2 sm:mr-4 text-3xl sm:text-4xl font-normal h-auto self-end sm:self-center mb-0">
            {i < 9 ? `0${i + 1}`: `${i + 1}`}
          </p>

          <div className="  text-white flex flex-col justify-center pt-1 sm:pt-0 sm:mt-1 sm:mb-0 h-auto sm:self-center">
              
              <div className="uppercase text-[10px] md:text-[12px]  m-0 sm:leading-none h-auto">
              {`${arreglarCaracteres(autor)}  |  ${concurrentes}`}
              </div>

              <div className="font-semibold text-base md:text-lg m-0 line-clamp-2 leading-tight h-auto"> 
              {arreglarCaracteres(titulo)}  
              </div> 

          </div> 

        </div>

        <div className="text-2xl sm:text-3xl font-bold flex">

          {porcentajePromedioNota >= 40 ? 
            <p className="h-auto self-end sm:self-center text-green-500 ">{`${Math.trunc(porcentajePromedioNota)}%`}</p>
          : porcentajePromedioNota >= 15 ? 
            <p className=" h-auto self-end sm:self-center text-blue-400"> {`${Math.trunc(porcentajePromedioNota)}%`} </p> 
          : porcentajePromedioNota < 15 ? 
            <p className=" h-auto self-end sm:self-center text-red-500">
            {`${Math.trunc(porcentajePromedioNota)}%`} </p> 
            : ""
          }

        </div>

        
      </div>

        <style jsx>
          {`
            .traslado${i} { 
              width: 100%;
              height:auto;
              padding: 0;
              animation-name: trasladarP${i};
              animation-duration: 2s;
              animation-delay: 0;
              animation-timing-function:ease-in-out;
              position: absolute;
              box-sizing: border-box;
              animation-fill-mode: forwards;
            }
            @keyframes trasladarP${i} {
              from{
                transform: translateY(${posicionAnterior - restar}%); 
              }
              
              to{
                transform: translateY(${posicionNueva - restar}%); 
              }
            }
            @media (min-width: 640px){
              .traslado${i}{
                height: 10%; 
                width: 50%;
                padding-bottom: 7px;
              }
            }

        `}</style>

    </div>
  )
}

export default NotaPeor