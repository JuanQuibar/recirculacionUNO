import React, { useEffect} from "react";
import Nota from "./Nota";
import NotaPeor from "./NotaPeor";

const ListadoNotas = ({notasRender, setCargando, alturaDiv, setAlturaDiv, setActivar}) => {
  
  useEffect(() => {

    setTimeout(() => {
      setActivar(true)
    }, 200);

    notasRender.length > 1 && setCargando(false)

  },[notasRender])  

  const alturaNumber = (alturaDiv * 20)
  const alturaString = (alturaNumber + "px")
  const final = notasRender.length;
  const inicio = notasRender.length -11
  const resta = notasRender.length
  
  return (

    <div className="altura flex flex-col sm:flex-row overflow-hidden">

      <style jsx>
        {`
        .altura{
          height: ${alturaString};
        }
        @media (min-width: 640px){
          .altura{
            position: relative;
            height: 70%; 
          }
        }
      `}</style> 
      
      <div className="sm:w-[50%] h-full border-r-2 border-gray-500">
        {notasRender.map((nota, i) => (
          i>-1 && i<10 && <Nota
              key={nota.path}
              nota={nota}
              i={i}
              setAlturaDiv={setAlturaDiv}    
          /> 
          ))}
      </div>

      <div className="sm:w-[50%] h-full ">
        {notasRender.map((nota, i) => (
          i>inicio && i<final && <NotaPeor
              key={nota.path}
              nota={nota}
              resta= {resta}
              i={i}
              setAlturaDiv={setAlturaDiv}    
          /> 
          ))}
      </div>

    </div>
      
  )

}

export default ListadoNotas