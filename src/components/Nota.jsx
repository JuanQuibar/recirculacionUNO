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

      <div className=" flex items-end justify-between mx-2 mb-0 bg-gray-600 px-2  rounded-md box-border h-full border-gray-700 border-solid border-4">
          
        <div className="flex justify-start sm:truncate mr-3"> 

          <p className="text-gray-400 my-auto mr-2 text-3xl font-normal">{i + 1} </p>

          <div className=" text-clip text-white flex flex-col justify-start h-auto">
              
              <div className="uppercase text-[10px] m-0 ">
                {arreglarCaracteres(autor)}
              </div>

              <div className="font-bold text-base m-0 line-clamp-2"> 
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
              height:10%;
              padding: 0;
              animation-name: trasladar${i};
              animation-duration: 2s;
              animation-delay: 0;
              animation-timing-function:ease-in-out;
              position: absolute;
              box-sizing: border-box;
              margin: 0;
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