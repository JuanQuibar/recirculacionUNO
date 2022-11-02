import {useEffect, useRef} from 'react';
import { arreglarCaracteres} from "../helpers"

const Nota = ({nota, i,setAlturaDiv}) => {

    const ref = useRef(null)
    const {autor, titulo, porcentaje, posicionAnterior, posicionNueva} = nota

    useEffect(() => {
  
      setAlturaDiv(ref.current.clientHeight)

    },[])

  return (

    <div className={`traslado${i}`} ref={ref}>

      <div className=" flex items-end justify-between mx-2 mb-3 pb-2 bg-gray-600 px-2 rounded-md box-border h-full border-gray-700 border-solid border-1 ">
          
        <div className="flex justify-start sm:truncate  mr-3"> 

          <p className="text-gray-400 mr-2 text-3xl font-normal h-auto self-end mb-0">
            {i<9 ? `0${i + 1}`: `${i + 1}`} </p>

          <div className="  text-white flex flex-col justify-center pt-1 sm:mt-1 sm:mb-0  ">
              
              <div className="uppercase text-[10px] m-0 sm:leading-none h-auto">
                {arreglarCaracteres(autor)}
              </div>

              <div className="font-bold text-base m-0 line-clamp-2 leading-tight sm:leading-none "> 
              {arreglarCaracteres(titulo)}  
              </div> 

          </div> 

        </div>

        {porcentaje >= 40 ? 
          <div className="text-2xl font-extrabold text-green-500">
          {`${Math.trunc(porcentaje)}%`} </div> 
        : porcentaje >= 15 ? 
          <div className="text-2xl font-extrabold text-blue-400"> {`${Math.trunc(porcentaje)}%`} </div> 
        : porcentaje < 15 ? 
          <div className="text-2xl font-extrabold text-red-500">
          {`${Math.trunc(porcentaje)}%`} </div> 
          : ""
        }
          
      </div>

        <style jsx>
          {`
            .traslado${i} { 
              width: 100%;
              height:auto;
              padding: 0;
              animation-name: trasladar${i};
              animation-duration: 2s;
              animation-delay: 0;
              animation-timing-function:ease-in-out;
              position: absolute;
              box-sizing: border-box;
              position: absolute;
              animation-fill-mode: forwards;
            }
            @keyframes trasladar${i} {
              from{
                transform: translateY(${nota.posicionAnterior}%); 
              }
              
              to{
                transform: translateY(${nota.posicionNueva}%); 
              }
            }

        `}</style>

    </div>
  )
}

export default Nota